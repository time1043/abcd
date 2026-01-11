DROP TYPE IF EXISTS problem_type;
CREATE TYPE problem_type AS ENUM (
    'TRUE_OR_FALSE',
    'FILL_IN_THE_BLANK',
    'MULTIPLE_CHOICE',
    'MULTIPLE_CHOICE_MORE_THAN_ONE_ANSWER',
    'SQL_PROGRAMMING',
    'PROGRAMMING',
    'SUBJECTIVE'
);

DROP TABLE IF EXISTS questions;
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    type problem_type NOT NULL,
    title TEXT,
    description TEXT NOT NULL,
    choices JSONB, 
    answers JSONB NOT NULL
);
DROP INDEX IF EXISTS idx_questions_type;
CREATE INDEX idx_questions_type ON questions(type);

DROP TABLE IF EXISTS buckets;
CREATE TABLE buckets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

-- n:m
DROP TABLE IF EXISTS bucket_questions;
CREATE TABLE bucket_questions (
    bucket_id UUID REFERENCES buckets(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0, 
    PRIMARY KEY (bucket_id, question_id)
);

DROP VIEW IF EXISTS bucket_questions_view;
CREATE OR REPLACE VIEW bucket_questions_view AS
SELECT
  bq.bucket_id,
  COALESCE(bq.sort_order, 0) AS id,
  q.description::text AS description,
  COALESCE(q.choices, '[]'::jsonb) AS choices,
  COALESCE(q.answers, '[]'::jsonb) AS answers
FROM bucket_questions bq
JOIN questions q ON q.id = bq.question_id;


DROP TYPE IF EXISTS record_status;
CREATE TYPE record_status AS ENUM ('IN_PROGRESS', 'COMPLETED');

DROP TABLE IF EXISTS records;
CREATE TABLE records (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    bucket_id UUID REFERENCES buckets(id) ON DELETE CASCADE, -- 1:1
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,  -- 1:1
    score DECIMAL(5, 2) NOT NULL DEFAULT -1,
    status record_status DEFAULT 'IN_PROGRESS',
    details JSONB NOT NULL DEFAULT '{}'::jsonb
);

DROP INDEX IF EXISTS idx_records_user_bucket;
CREATE INDEX idx_records_user_bucket ON records(user_id, bucket_id);