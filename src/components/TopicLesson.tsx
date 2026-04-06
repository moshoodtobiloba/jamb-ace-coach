import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MathMarkdown from '@/components/MathMarkdown';
import { Topic, SUBJECT_LABELS } from '@/data/syllabus';

interface TopicLessonProps {
  topic: Topic;
  onClose: () => void;
  onMarkMastered: () => void;
  isMastered: boolean;
}

export default function TopicLesson({ topic, onClose, onMarkMastered, isMastered }: TopicLessonProps) {
  const [lesson, setLesson] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    generateLesson();
  }, [topic.id]);

  // Track scroll to bottom for auto-mastery
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handleScroll = () => {
      const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 50;
      if (atBottom && !loading && lesson.length > 200) {
        setScrolledToEnd(true);
      }
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, [loading, lesson]);

  const generateLesson = async () => {
    setLoading(true);
    setError('');
    setLesson('');
    setScrolledToEnd(false);

    const prompt = `You are teaching the JAMB UTME topic "${topic.name}" under ${SUBJECT_LABELS[topic.subject]} (${topic.category}).

USE THE "NEW GENERAL MATHEMATICS" TEXTBOOK TEACHING APPROACH:
- Start from absolute zero like teaching a child
- Define every term in ONE clear sentence with a real-life analogy
- Build understanding layer by layer, never skip steps
- Show FULLY worked examples with EVERY step written out (like NGM textbook style)
- Include practice exercises at the end

STRUCTURE YOUR LESSON EXACTLY LIKE THIS:

## ${topic.name}

### 📖 What Is This? (Foundation)
Define the topic in ONE sentence a 10-year-old would understand. Give a real-life analogy from everyday Nigerian life. List the key terms/vocabulary with simple definitions.

### 🔰 Baby Steps (Core Concepts)
Teach every rule, law, formula, or principle from scratch. For EACH concept:
- State the rule/formula clearly in a box-like format
- Explain WHY it works (not just what it is)
- Give a simple numerical example immediately after stating it
- Show the calculation step by step: formula → substitution → simplification → answer

### 📈 Building Up (Intermediate)
Now combine concepts. Show how rules connect. Solve 2-3 slightly harder problems:
- State the problem
- Identify what type of problem it is
- Choose the right formula and explain WHY
- Solve step-by-step with clear arithmetic
- Box/highlight the final answer

### 🎯 JAMB Standard (Exam Level)
Show exactly how JAMB frames questions on this topic:
- 3 real JAMB-style MCQs with options A, B, C, D
- Solve each one showing the working
- Point out the TRAP in each question (the wrong answer JAMB wants you to pick)
- Teach the SHORTCUT method for speed
- Explain how to RECOGNIZE this question type in 5 seconds

### ⚡ Cheat Sheet
Bullet-point summary of:
- Every formula used (numbered)
- Common mistakes to avoid
- Memory tricks / mnemonics
- Speed hacks for exam day

### 🧠 Practice Exercises
Give 5 practice questions (increasing difficulty):
- Questions 1-2: Basic (test if you understood the foundation)
- Questions 3-4: Intermediate (test if you can combine concepts)  
- Question 5: JAMB-hard (test exam readiness)
- Put detailed answers with full working at the very end

CRITICAL RULES:
- Write EVERY calculation step. Never say "simplifying, we get..." — show the actual simplification.
- Use real numbers in every example, never generic "let x = ..."  without computing.
- If it's a formula-based topic, derive or explain the formula before using it.
- Teach like the student has ZERO prior knowledge.
- Keep language simple but precise. Use Nigerian English naturally.
- For English/Literature topics: give direct quotes, character analysis, and theme breakdowns.
- Make this lesson so complete that reading it alone is enough to answer ANY JAMB question on this topic.
- IMPORTANT: For ALL mathematical expressions, use LaTeX with dollar sign delimiters:
  - Use $...$ for inline math (e.g., $x^2 + 3x = 5$, $\\frac{1}{2}$, $\\sqrt{3}$)
  - Use $$...$$ for display/block math (e.g., $$a^2 + b^2 = c^2$$)
  - Use $\\cdot$ for multiplication dot, $\\frac{a}{b}$ for fractions
  - Use subscripts like $234_5$ for number bases
  - NEVER write bare LaTeX like \\cdot or \\frac outside of $ delimiters
  - NEVER use \\( \\) or \\[ \\] delimiters — ONLY use $ and $$`;

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tutor-chat`;
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          messages: [{ role: 'user', content: prompt }],
        }),
      });

      if (!resp.ok || !resp.body) {
        throw new Error('Failed to load lesson');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, idx);
          textBuffer = textBuffer.slice(idx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ') || line.trim() === '' || line.startsWith(':')) continue;
          const json = line.slice(6).trim();
          if (json === '[DONE]') break;
          try {
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content;
            if (c) { full += c; setLesson(full); }
          } catch { break; }
        }
      }
    } catch (e: any) {
      setError(e.message || 'Failed to generate lesson. Check your connection.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 flex flex-col"
    >
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center justify-between shrink-0">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold tracking-wider text-primary truncate">{SUBJECT_LABELS[topic.subject]}</p>
          <p className="text-sm font-bold text-foreground truncate">{topic.name}</p>
        </div>
        <button onClick={onClose}
          className="px-4 py-2 bg-muted rounded text-xs font-bold tracking-wider text-foreground hover:bg-muted/80 transition-colors shrink-0 ml-3">
          ← BACK
        </button>
      </div>

      {/* Lesson Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto">
          {loading && !lesson && (
            <div className="text-center py-12 space-y-3">
              <span className="text-3xl animate-pulse">📖</span>
              <p className="text-sm text-muted-foreground animate-pulse">Machine is preparing your lesson...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm text-destructive">⚠️ {error}</p>
              <button onClick={generateLesson}
                className="px-4 py-2 bg-primary text-primary-foreground rounded text-xs font-bold">
                RETRY
              </button>
            </div>
          )}

          {lesson && (
            <MathMarkdown className="prose prose-sm prose-invert max-w-none [&_p]:my-2 [&_li]:my-1 [&_h2]:text-lg [&_h2]:font-black [&_h2]:tracking-wider [&_h3]:text-sm [&_h3]:font-bold [&_h3]:tracking-wider [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg">
              {lesson}
            </MathMarkdown>
          )}

          {loading && lesson && (
            <div className="mt-4">
              <span className="text-xs text-muted-foreground animate-pulse">Still loading...</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="bg-card border-t border-border px-4 py-3 shrink-0">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          {!isMastered && scrolledToEnd && !loading && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex-1">
              <p className="text-[10px] text-primary tracking-widest mb-1">✅ YOU'VE FINISHED THE LESSON!</p>
            </motion.div>
          )}
          <button
            onClick={() => { onMarkMastered(); }}
            disabled={isMastered}
            className={`px-6 py-2.5 rounded text-xs font-bold tracking-wider transition-colors ${
              isMastered
                ? 'bg-primary/20 text-primary cursor-default'
                : 'bg-primary text-primary-foreground hover:bg-primary/80'
            }`}
          >
            {isMastered ? '✅ MASTERED' : scrolledToEnd ? '🎯 MARK AS MASTERED' : '📖 MARK AS MASTERED'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
