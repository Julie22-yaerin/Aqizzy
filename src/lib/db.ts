import { Pool } from 'pg';
import { COREScore, User, SessionLog, AQProfile } from '@/types';
import { CompletedScenarioRecord } from '@/store/aqStore';

let pool: Pool | null = null;

export function getDbPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    return null;
  }

  if (!pool) {
    const isSslRequired = process.env.DATABASE_SSL === 'true';
    pool = new Pool({
      connectionString,
      ssl: isSslRequired ? { rejectUnauthorized: false } : false,
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    pool.on('error', (err) => {
      console.warn('[Postgres Pool Error]:', err.message);
    });
  }

  return pool;
}

export interface UserProgressData {
  user: User;
  scores: COREScore;
  totalAQ: number;
  completedScenarios: Record<string, CompletedScenarioRecord>;
}

/**
 * Upsert user record and their AQ profile in PostgreSQL
 */
export async function saveUserProgressToDb(data: {
  userId: string;
  displayName: string;
  currentLevel?: string;
  avatarUrl?: string;
  scores: COREScore;
  lastScenarioCompleted?: string;
  completedScenarios: Record<string, CompletedScenarioRecord>;
}): Promise<boolean> {
  const db = getDbPool();
  if (!db) return false;

  const client = await db.connect();
  try {
    await client.query('BEGIN');

    await client.query(
      `
      INSERT INTO users (id, display_name, current_level, avatar_url, updated_at)
      VALUES ($1, $2, COALESCE($3, 'Học sinh Cấp 2 Tập sự'), COALESCE($4, '🎓'), NOW())
      ON CONFLICT (id) DO UPDATE SET
        display_name = EXCLUDED.display_name,
        current_level = COALESCE(EXCLUDED.current_level, users.current_level),
        avatar_url = COALESCE(EXCLUDED.avatar_url, users.avatar_url),
        updated_at = NOW();
      `,
      [data.userId, data.displayName, data.currentLevel || null, data.avatarUrl || null]
    );

    await client.query(
      `
      INSERT INTO aq_profiles (
        user_id, control_score, ownership_score, reach_score, endurance_score,
        last_scenario_completed, completed_scenarios, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
      ON CONFLICT (user_id) DO UPDATE SET
        control_score = EXCLUDED.control_score,
        ownership_score = EXCLUDED.ownership_score,
        reach_score = EXCLUDED.reach_score,
        endurance_score = EXCLUDED.endurance_score,
        last_scenario_completed = COALESCE(EXCLUDED.last_scenario_completed, aq_profiles.last_scenario_completed),
        completed_scenarios = COALESCE(EXCLUDED.completed_scenarios, aq_profiles.completed_scenarios),
        updated_at = NOW();
      `,
      [
        data.userId,
        data.scores.c,
        data.scores.o,
        data.scores.r,
        data.scores.e,
        data.lastScenarioCompleted || null,
        JSON.stringify(data.completedScenarios || {}),
      ]
    );

    await client.query('COMMIT');
    return true;
  } catch (error) {
    await client.query('ROLLBACK');
    console.warn('[Postgres] Error saving user progress:', error);
    return false;
  } finally {
    client.release();
  }
}

/**
 * Retrieve user progress from PostgreSQL
 */
export async function getUserProgressFromDb(userId: string): Promise<UserProgressData | null> {
  const db = getDbPool();
  if (!db || !userId) return null;

  try {
    const res = await db.query(
      `
      SELECT 
        u.id, u.display_name, u.current_level, u.avatar_url,
        p.control_score, p.ownership_score, p.reach_score, p.endurance_score, p.total_aq,
        p.last_scenario_completed, p.completed_scenarios
      FROM users u
      LEFT JOIN aq_profiles p ON u.id = p.user_id
      WHERE u.id = $1
      LIMIT 1;
      `,
      [userId]
    );

    if (res.rows.length === 0) {
      return null;
    }

    const row = res.rows[0];
    const scores: COREScore = {
      c: row.control_score ?? 50,
      o: row.ownership_score ?? 50,
      r: row.reach_score ?? 50,
      e: row.endurance_score ?? 50,
    };
    const totalAQ = row.total_aq ?? (scores.c + scores.o + scores.r + scores.e);

    let completedScenarios: Record<string, CompletedScenarioRecord> = {};
    if (row.completed_scenarios) {
      completedScenarios = typeof row.completed_scenarios === 'string'
        ? JSON.parse(row.completed_scenarios)
        : row.completed_scenarios;
    }

    return {
      user: {
        id: row.id,
        display_name: row.display_name,
        current_level: row.current_level,
        avatar_url: row.avatar_url,
      },
      scores,
      totalAQ,
      completedScenarios,
    };
  } catch (error) {
    console.warn('[Postgres] Error loading user progress:', error);
    return null;
  }
}

/**
 * Log session dialogue event to PostgreSQL
 */
export async function logSessionEventToDb(log: SessionLog): Promise<void> {
  const db = getDbPool();
  if (!db) return;

  try {
    // If user_id is provided, ensure a stub user exists to satisfy foreign key
    if (log.user_id) {
      await db.query(
        `
        INSERT INTO users (id, display_name, current_level, avatar_url)
        VALUES ($1, 'Học sinh', 'Học sinh Cấp 2 Tập sự', '🎓')
        ON CONFLICT (id) DO NOTHING;
        `,
        [log.user_id]
      );
    }

    await db.query(
      `
      INSERT INTO session_logs (
        session_id, scenario_id, user_id, role, message_content,
        extracted_core_delta, is_crisis_resolved, created_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, NOW());
      `,
      [
        log.session_id,
        log.scenario_id,
        log.user_id || null,
        log.role,
        log.message_content,
        JSON.stringify(log.extracted_core_delta || { c: 0, o: 0, r: 0, e: 0 }),
        Boolean(log.is_crisis_resolved),
      ]
    );
  } catch (err) {
    console.warn('[Postgres] Error logging session event:', err);
  }
}
