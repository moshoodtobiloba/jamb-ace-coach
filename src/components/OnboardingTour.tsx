import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ONBOARDING_KEY = 'jamb-onboarding-done';

const STEPS = [
  {
    icon: '👋',
    title: 'Welcome to ACE COACH!',
    description: 'Your personal JAMB 2026 preparation assistant. Let me show you around!',
  },
  {
    icon: '☰',
    title: 'Navigation Menu',
    description: 'Tap the ☰ hamburger icon at the top-right to access ALL features: Dashboard, Syllabus, CBT, Tutor, Mistake Log, Theme settings, and more.',
  },
  {
    icon: '⚡',
    title: 'HQ Dashboard',
    description: 'Your command center! See your streak, topics mastered, today\'s study targets, and your daily timetable schedule.',
  },
  {
    icon: '📋',
    title: 'AOC Syllabus',
    description: 'Track every JAMB topic across all 4 subjects. Mark topics as mastered and get revision reminders.',
  },
  {
    icon: '🖥️',
    title: 'CBT Practice',
    description: 'Simulate the real JAMB exam! Choose Daily Test (your today\'s subjects), Full Simulation (180 questions), or Custom Mode.',
  },
  {
    icon: '🤖',
    title: 'AI Tutor',
    description: 'Ask any question about your subjects. The AI tutor explains concepts, solves problems, and helps you understand difficult topics.',
  },
  {
    icon: '📝',
    title: 'Mistake Log',
    description: 'Record questions you got wrong so you can review and learn from your mistakes. Never repeat the same error!',
  },
  {
    icon: '🔔',
    title: 'Stay on Track',
    description: 'Enable notifications to get reminders for your study schedule. Your timetable keeps you disciplined every day!',
  },
  {
    icon: '🚀',
    title: 'You\'re Ready!',
    description: 'Start with a CBT practice or explore the syllabus. Consistency is key — study every day and you WILL ace JAMB 2026! 💪',
  },
];

export default function OnboardingTour() {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const done = localStorage.getItem(ONBOARDING_KEY) === 'true';
    // Only show if survey is already done (don't overlap)
    const surveyDone = localStorage.getItem('jamb-survey-completed') === 'true';
    if (!done && surveyDone) {
      setShow(true);
    }
    // Also show if survey hasn't appeared yet but after a delay
    if (!done && !surveyDone) {
      // Will show after survey completes via storage event
      const check = setInterval(() => {
        if (localStorage.getItem('jamb-survey-completed') === 'true') {
          setTimeout(() => setShow(true), 1000);
          clearInterval(check);
        }
      }, 2000);
      return () => clearInterval(check);
    }
  }, []);

  const handleFinish = () => {
    localStorage.setItem(ONBOARDING_KEY, 'true');
    setShow(false);
  };

  const handleNext = () => {
    if (step < STEPS.length - 1) {
      setStep(s => s + 1);
    } else {
      handleFinish();
    }
  };

  if (!show) return null;

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[110] flex items-center justify-center p-6"
        style={{ backgroundColor: 'hsl(var(--background) / 0.95)' }}
      >
        <motion.div
          key={step}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ duration: 0.3 }}
          className="w-full max-w-sm bg-card border-2 border-border rounded-2xl p-8 shadow-2xl text-center"
        >
          <span className="text-6xl block mb-4">{current.icon}</span>
          <h2 className="text-lg font-black tracking-wider text-foreground mb-3">{current.title}</h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8">{current.description}</p>

          {/* Progress dots */}
          <div className="flex justify-center gap-1.5 mb-6">
            {STEPS.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 rounded-full transition-all ${
                  i === step ? 'w-6 bg-primary' : i < step ? 'w-1.5 bg-primary/50' : 'w-1.5 bg-muted'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button
                onClick={() => setStep(s => s - 1)}
                className="flex-1 py-3 border border-border rounded-xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold tracking-wider hover:bg-primary/80 transition-colors"
            >
              {isLast ? "LET'S GO! 🔥" : 'Next →'}
            </button>
          </div>

          <button
            onClick={handleFinish}
            className="mt-4 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip tour
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
