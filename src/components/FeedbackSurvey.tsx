import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';

const SURVEY_DONE_KEY = 'jamb-survey-completed';
const SURVEY_USER_KEY = 'jamb-survey-user-id';

function getSurveyUserId(): string {
  let id = localStorage.getItem(SURVEY_USER_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SURVEY_USER_KEY, id);
  }
  return id;
}

const QUESTIONS = [
  { id: 'q1', text: 'How would you rate this app overall?', type: 'rating' as const },
  { id: 'q2', text: 'Which feature do you use the most?', type: 'choice' as const, options: ['CBT Practice', 'AI Tutor', 'Syllabus/AOC', 'Dashboard', 'Mistake Log'] },
  { id: 'q3', text: 'How easy is the app to use?', type: 'rating' as const },
  { id: 'q4', text: 'What subject do you struggle with most?', type: 'choice' as const, options: ['Mathematics', 'English', 'Physics', 'Chemistry'] },
  { id: 'q5', text: 'Would you recommend this app to a friend?', type: 'choice' as const, options: ['Definitely Yes', 'Probably Yes', 'Not Sure', 'No'] },
  { id: 'q6', text: 'How many hours do you study daily?', type: 'choice' as const, options: ['Less than 2', '2-4 hours', '4-6 hours', 'More than 6'] },
  { id: 'q7', text: 'What would you like us to add or improve?', type: 'text' as const },
];

export default function FeedbackSurvey() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(SURVEY_DONE_KEY) === 'true';
    if (!done) {
      const t = setTimeout(() => setShow(true), 3000);
      return () => clearTimeout(t);
    }
  }, []);

  if (!show || localStorage.getItem(SURVEY_DONE_KEY) === 'true') return null;

  const currentQ = QUESTIONS[step];
  const isLast = step === QUESTIONS.length - 1;
  const progress = ((step + 1) / QUESTIONS.length) * 100;

  const handleAnswer = (val: string) => {
    setAnswers(prev => ({ ...prev, [currentQ.id]: val }));
    if (!isLast) {
      setTimeout(() => setStep(s => s + 1), 300);
    }
  };

  const handleSubmit = async () => {
    const userId = getSurveyUserId();
    const finalAnswers = { ...answers };
    if (comment) finalAnswers.comment = comment;

    try {
      await supabase.from('survey_responses').insert({
        user_id: userId,
        responses: finalAnswers,
        comment,
        completed: true,
      });
    } catch (e) {
      const offline = JSON.parse(localStorage.getItem('jamb-offline-surveys') || '[]');
      offline.push({ user_id: userId, responses: finalAnswers, comment, created_at: new Date().toISOString() });
      localStorage.setItem('jamb-offline-surveys', JSON.stringify(offline));
    }

    localStorage.setItem(SURVEY_DONE_KEY, 'true');
    setSubmitted(true);
    setTimeout(() => setShow(false), 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center p-4"
        style={{ backgroundColor: 'hsl(var(--background))' }}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-full max-w-md bg-card border border-border rounded-2xl p-6 shadow-2xl"
        >
          {submitted ? (
            <div className="text-center space-y-4 py-12">
              <span className="text-5xl">🎉</span>
              <h2 className="text-xl font-black tracking-wider text-foreground">THANK YOU!</h2>
              <p className="text-sm text-muted-foreground">Your feedback helps us build a better app for everyone.</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <span className="text-3xl">📝</span>
                <h2 className="text-lg font-black tracking-wider text-foreground mt-2">QUICK FEEDBACK</h2>
                <p className="text-xs text-muted-foreground tracking-wider mt-1">Help us improve • {step + 1}/{QUESTIONS.length}</p>
                <p className="text-[10px] text-muted-foreground mt-1">This is required to continue using the app</p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-muted rounded-full h-2 mb-6">
                <motion.div
                  className="bg-primary h-2 rounded-full"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  <p className="text-sm font-bold text-foreground">{currentQ.text}</p>

                  {currentQ.type === 'rating' && (
                    <div className="flex gap-3 justify-center">
                      {[1, 2, 3, 4, 5].map(n => (
                        <button
                          key={n}
                          onClick={() => handleAnswer(String(n))}
                          className={`w-14 h-14 rounded-xl border-2 text-lg font-bold transition-all ${
                            answers[currentQ.id] === String(n)
                              ? 'bg-primary text-primary-foreground border-primary scale-110'
                              : 'border-border text-muted-foreground hover:border-primary hover:text-foreground'
                          }`}
                        >
                          {n}
                        </button>
                      ))}
                    </div>
                  )}

                  {currentQ.type === 'choice' && currentQ.options && (
                    <div className="space-y-2">
                      {currentQ.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => handleAnswer(opt)}
                          className={`w-full text-left px-4 py-4 rounded-xl border-2 text-sm font-medium transition-all ${
                            answers[currentQ.id] === opt
                              ? 'bg-primary/20 border-primary text-foreground'
                              : 'border-border text-foreground hover:border-primary hover:bg-muted'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {currentQ.type === 'text' && (
                    <div className="space-y-4">
                      <textarea
                        value={comment}
                        onChange={e => setComment(e.target.value)}
                        placeholder="Tell us what you think... your honest feedback matters!"
                        rows={4}
                        className="w-full bg-muted border-2 border-border rounded-xl px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors resize-none"
                      />
                      <button
                        onClick={handleSubmit}
                        className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-sm tracking-wider hover:bg-primary/80 transition-colors"
                      >
                        ✅ SUBMIT FEEDBACK
                      </button>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              {currentQ.type !== 'text' && (
                <div className="flex justify-between mt-6">
                  <button
                    onClick={() => setStep(s => Math.max(0, s - 1))}
                    disabled={step === 0}
                    className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground disabled:opacity-30 transition-colors rounded-lg hover:bg-muted"
                  >
                    ← Back
                  </button>
                  {answers[currentQ.id] && (
                    <button
                      onClick={() => isLast ? setStep(QUESTIONS.length - 1) : setStep(s => s + 1)}
                      className="px-4 py-2 text-sm text-primary font-bold hover:text-primary/80 transition-colors rounded-lg hover:bg-primary/10"
                    >
                      Next →
                    </button>
                  )}
                </div>
              )}
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
