import { Client } from 'pg';
import fs from 'fs';
import path from 'path';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:PyeTEkfQDjkLxTZrqjLfTrCBxoNcCpEm@switchback.proxy.rlwy.net:27212/railway';

const schemaSql = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    display_name TEXT NOT NULL,
    current_level TEXT NOT NULL DEFAULT 'Học sinh Cấp 2 Tập sự',
    avatar_url TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS aq_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    control_score INTEGER NOT NULL DEFAULT 50 CHECK (control_score >= 0 AND control_score <= 100),
    ownership_score INTEGER NOT NULL DEFAULT 50 CHECK (ownership_score >= 0 AND ownership_score <= 100),
    reach_score INTEGER NOT NULL DEFAULT 50 CHECK (reach_score >= 0 AND reach_score <= 100),
    endurance_score INTEGER NOT NULL DEFAULT 50 CHECK (endurance_score >= 0 AND endurance_score <= 100),
    total_aq INTEGER GENERATED ALWAYS AS (control_score + ownership_score + reach_score + endurance_score) STORED,
    last_scenario_completed TEXT DEFAULT NULL,
    completed_scenarios JSONB DEFAULT '{}'::jsonb,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_user_profile UNIQUE (user_id)
);

CREATE TABLE IF NOT EXISTS scenarios (
    id TEXT PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('chat', 'swipe', 'resource')),
    core_focus TEXT NOT NULL CHECK (core_focus IN ('C', 'O', 'R', 'E')),
    title TEXT NOT NULL,
    grade_level TEXT NOT NULL DEFAULT 'Lớp 7 - 8',
    description TEXT NOT NULL,
    thumbnail_icon TEXT DEFAULT 'target',
    content_json JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS session_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    scenario_id TEXT NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
    user_id TEXT REFERENCES users(id) ON DELETE SET NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'npc', 'system')),
    message_content TEXT NOT NULL,
    extracted_core_delta JSONB DEFAULT '{"c": 0, "o": 0, "r": 0, "e": 0}'::jsonb,
    is_crisis_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_session_logs_session_id ON session_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_session_logs_scenario_id ON session_logs(scenario_id);
CREATE INDEX IF NOT EXISTS idx_aq_profiles_user_id ON aq_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_scenarios_core_focus ON scenarios(core_focus);
`;

async function main() {
  console.log('Connecting to Railway Postgres...');
  const client = new Client({ connectionString, ssl: false });
  await client.connect();
  console.log('✅ Connected to Railway Postgres successfully!');

  console.log('Applying database schema...');
  await client.query(schemaSql);
  console.log('✅ Schema created successfully!');

  // Seed default guest user
  await client.query(`
    INSERT INTO users (id, display_name, current_level, avatar_url)
    VALUES ('student-cap2-vietnam', 'Minh Anh (Lớp 8A3)', 'Học sinh Cấp 2 Tập sự', '🎓')
    ON CONFLICT (id) DO UPDATE SET updated_at = NOW();

    INSERT INTO aq_profiles (user_id, control_score, ownership_score, reach_score, endurance_score, last_scenario_completed)
    VALUES ('student-cap2-vietnam', 50, 50, 50, 50, NULL)
    ON CONFLICT (user_id) DO NOTHING;
  `);
  console.log('✅ Default student user & profile seeded.');

  // Check scenarios count
  const { rows: scenarioRows } = await client.query('SELECT count(*) FROM scenarios');
  console.log(`Current scenarios count: ${scenarioRows[0].count}`);

  if (Number(scenarioRows[0].count) === 0) {
    console.log('Seeding scenarios from seed.sql...');
    const seedPath = path.join(__dirname, '..', 'supabase', 'seed.sql');
    if (fs.existsSync(seedPath)) {
      const seedContent = fs.readFileSync(seedPath, 'utf8');
      await client.query(seedContent);
      console.log('✅ Scenarios seeded successfully from seed.sql!');
    }
  }

  const { rows: finalCount } = await client.query('SELECT count(*) FROM scenarios');
  console.log(`Final scenarios in DB: ${finalCount[0].count}`);

  await client.end();
  console.log('✅ Railway database initialization finished cleanly.');
}

main().catch((err) => {
  console.error('❌ Database init failed:', err);
  process.exit(1);
});
