-- =========================================================
-- AQIZZY - SUPABASE DATABASE SCHEMA
-- Platform for Training Student Adversity Quotient (AQ)
-- Using the CORE Framework (Control, Ownership, Reach, Endurance)
-- Vietnamese Middle School Context (Grades 6 - 9 / Cấp 2)
-- =========================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    display_name TEXT NOT NULL,
    current_level TEXT NOT NULL DEFAULT 'Học sinh Cấp 2 Tập sự',
    avatar_url TEXT DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. AQ PROFILES TABLE
CREATE TABLE IF NOT EXISTS aq_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    control_score INTEGER NOT NULL DEFAULT 50 CHECK (control_score >= 0 AND control_score <= 100),
    ownership_score INTEGER NOT NULL DEFAULT 50 CHECK (ownership_score >= 0 AND ownership_score <= 100),
    reach_score INTEGER NOT NULL DEFAULT 50 CHECK (reach_score >= 0 AND reach_score <= 100),
    endurance_score INTEGER NOT NULL DEFAULT 50 CHECK (endurance_score >= 0 AND endurance_score <= 100),
    total_aq INTEGER GENERATED ALWAYS AS (control_score + ownership_score + reach_score + endurance_score) STORED,
    last_scenario_completed TEXT DEFAULT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    CONSTRAINT unique_user_profile UNIQUE (user_id)
);

-- 4. SCENARIOS TABLE
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

-- 5. SESSION LOGS TABLE
CREATE TABLE IF NOT EXISTS session_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id TEXT NOT NULL,
    scenario_id TEXT NOT NULL REFERENCES scenarios(id) ON DELETE CASCADE,
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    role TEXT NOT NULL CHECK (role IN ('user', 'npc', 'system')),
    message_content TEXT NOT NULL,
    extracted_core_delta JSONB DEFAULT '{"c": 0, "o": 0, "r": 0, "e": 0}'::jsonb,
    is_crisis_resolved BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. INDEXES FOR FAST QUERYING
CREATE INDEX IF NOT EXISTS idx_session_logs_session_id ON session_logs(session_id);
CREATE INDEX IF NOT EXISTS idx_session_logs_scenario_id ON session_logs(scenario_id);
CREATE INDEX IF NOT EXISTS idx_aq_profiles_user_id ON aq_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_scenarios_core_focus ON scenarios(core_focus);

-- 7. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE aq_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE scenarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_logs ENABLE ROW LEVEL SECURITY;

DO $$ 
BEGIN
    DROP POLICY IF EXISTS "Allow public read scenarios" ON scenarios;
    DROP POLICY IF EXISTS "Allow public read users" ON users;
    DROP POLICY IF EXISTS "Allow public insert/update users" ON users;
    DROP POLICY IF EXISTS "Allow public read aq_profiles" ON aq_profiles;
    DROP POLICY IF EXISTS "Allow public insert/update aq_profiles" ON aq_profiles;
    DROP POLICY IF EXISTS "Allow public insert/read session_logs" ON session_logs;
END $$;

-- Allow public read access to scenarios (educational content)
CREATE POLICY "Allow public read scenarios" 
    ON scenarios FOR SELECT 
    USING (true);

-- Allow public / anon read and write for development and demo users
CREATE POLICY "Allow public read users" 
    ON users FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert/update users" 
    ON users FOR ALL 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Allow public read aq_profiles" 
    ON aq_profiles FOR SELECT 
    USING (true);

CREATE POLICY "Allow public insert/update aq_profiles" 
    ON aq_profiles FOR ALL 
    USING (true) 
    WITH CHECK (true);

CREATE POLICY "Allow public insert/read session_logs" 
    ON session_logs FOR ALL 
    USING (true) 
    WITH CHECK (true);
