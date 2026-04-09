
CREATE TABLE public.survey_responses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  responses JSONB NOT NULL DEFAULT '{}',
  comment TEXT DEFAULT '',
  completed BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.survey_responses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can insert their own survey" ON public.survey_responses
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can read their own survey" ON public.survey_responses
  FOR SELECT USING (true);
