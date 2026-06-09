-- ============================================================
-- NURSSIM GHANA — SUPABASE SCHEMA v2
-- Run this entire script in your Supabase SQL Editor
-- ============================================================

-- Students
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  student_id TEXT UNIQUE NOT NULL,
  university TEXT NOT NULL,
  year_group TEXT NOT NULL,
  gender TEXT,
  age INTEGER,
  group_type TEXT CHECK (group_type IN ('DSBL','Traditional')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Pre-test responses
CREATE TABLE IF NOT EXISTS pre_test_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  critical_thinking_scores JSONB NOT NULL DEFAULT '{}',
  confidence_scores JSONB NOT NULL DEFAULT '{}',
  competence_scores JSONB NOT NULL DEFAULT '{}',
  total_ct_score DECIMAL(6,2) DEFAULT 0,
  total_conf_score DECIMAL(6,2) DEFAULT 0,
  total_comp_score DECIMAL(6,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post-test responses
CREATE TABLE IF NOT EXISTS post_test_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  critical_thinking_scores JSONB NOT NULL DEFAULT '{}',
  confidence_scores JSONB NOT NULL DEFAULT '{}',
  competence_scores JSONB NOT NULL DEFAULT '{}',
  total_ct_score DECIMAL(6,2) DEFAULT 0,
  total_conf_score DECIMAL(6,2) DEFAULT 0,
  total_comp_score DECIMAL(6,2) DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Simulation attempts
CREATE TABLE IF NOT EXISTS simulation_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  procedure_id TEXT NOT NULL,
  procedure_name TEXT NOT NULL,
  score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 10,
  decisions JSONB DEFAULT '[]',
  videos_watched JSONB DEFAULT '[]',
  completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Post-simulation reflections
CREATE TABLE IF NOT EXISTS reflections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  procedure_id TEXT NOT NULL,
  what_went_well TEXT,
  what_would_change TEXT,
  confidence_rating INTEGER CHECK (confidence_rating BETWEEN 1 AND 5),
  key_learning TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Verbal walkthrough assessments (completed by researcher/facilitator)
CREATE TABLE IF NOT EXISTS verbal_assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  procedure_id TEXT NOT NULL,
  phase TEXT NOT NULL CHECK (phase IN ('pre','post')),
  item_scores JSONB NOT NULL DEFAULT '{}',
  total_score INTEGER DEFAULT 0,
  max_score INTEGER DEFAULT 10,
  assessed_by TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- Row Level Security — open policies (no auth for now)
-- ============================================================
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE pre_test_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_test_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE simulation_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE reflections ENABLE ROW LEVEL SECURITY;
ALTER TABLE verbal_assessments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "open_all" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all" ON pre_test_responses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all" ON post_test_responses FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all" ON simulation_attempts FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all" ON reflections FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "open_all" ON verbal_assessments FOR ALL USING (true) WITH CHECK (true);
