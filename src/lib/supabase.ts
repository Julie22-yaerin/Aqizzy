import { createClient } from '@supabase/supabase-js';
import { AQProfile, SessionLog } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://olowfkgwkjtnhuwqljny.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9sb3dma2d3a2p0bmh1d3Fsam55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxNzY1NzEsImV4cCI6MjA5Nzc1MjU3MX0.Iq2TrhHdyySxRarKQEer3zKQpL4nkhRZVVwU2hcgb8g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

/**
 * Persist a session log to Supabase, with silent failover to local storage
 */
export async function logSessionEvent(log: SessionLog): Promise<void> {
  try {
    const { error } = await supabase.from('session_logs').insert([
      {
        session_id: log.session_id,
        scenario_id: log.scenario_id,
        user_id: log.user_id || null,
        role: log.role,
        message_content: log.message_content,
        extracted_core_delta: log.extracted_core_delta,
        is_crisis_resolved: log.is_crisis_resolved || false,
      },
    ]);

    if (error) {
      console.warn('[Supabase] Log insert notice:', error.message);
    }
  } catch (err) {
    console.warn('[Supabase] Offline/Error logging session event:', err);
  }
}

/**
 * Update user AQ profile in Supabase
 */
export async function syncAQProfile(profile: Partial<AQProfile>): Promise<void> {
  try {
    if (!profile.user_id) return;

    const { error } = await supabase
      .from('aq_profiles')
      .upsert({
        user_id: profile.user_id,
        control_score: profile.control_score,
        ownership_score: profile.ownership_score,
        reach_score: profile.reach_score,
        endurance_score: profile.endurance_score,
        last_scenario_completed: profile.last_scenario_completed,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'user_id' });

    if (error) {
      console.warn('[Supabase] Profile sync notice:', error.message);
    }
  } catch (err) {
    console.warn('[Supabase] Offline/Error syncing profile:', err);
  }
}
