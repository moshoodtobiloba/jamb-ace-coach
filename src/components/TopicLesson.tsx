import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MathMarkdown from '@/components/MathMarkdown';
import { Topic, SUBJECT_LABELS } from '@/data/syllabus';
import type { Question } from '@/data/questions';
import { buildOfflineLessonMarkdown, getOfflinePracticeQuestions } from '@/data/aocLessons';
import AOCQuiz from '@/components/AOCQuiz';

interface TopicLessonProps {
  topic: Topic;
  onClose: () => void;
  onMarkMastered: () => void;
  isMastered: boolean;
}

export default function TopicLesson({ topic, onClose, onMarkMastered, isMastered }: TopicLessonProps) {
  const [lesson, setLesson] = useState('');
  const [practiceQuestions, setPracticeQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [scrolledToEnd, setScrolledToEnd] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadOfflineLesson();
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

  const loadOfflineLesson = () => {
    setLoading(true);
    setError('');
    setLesson('');
    setPracticeQuestions([]);
    setScrolledToEnd(false);

    try {
      setLesson(buildOfflineLessonMarkdown(topic));
      setPracticeQuestions(getOfflinePracticeQuestions(topic, 10));
    } catch (e: any) {
      setError(e.message || 'Failed to load offline lesson.');
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
              <p className="text-sm text-muted-foreground animate-pulse">Opening your lesson...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12 space-y-3">
                <p className="text-sm text-destructive">⚠️ {error}</p>
                <button onClick={loadOfflineLesson}
                className="px-4 py-2 bg-primary text-primary-foreground rounded text-xs font-bold">
                RETRY
              </button>
            </div>
          )}

          {lesson && (
            <div className="space-y-6">
              <MathMarkdown className="prose prose-sm dark:prose-invert prose-neutral max-w-none [&_p]:my-2 [&_li]:my-1 [&_h2]:text-lg [&_h2]:font-black [&_h2]:tracking-wider [&_h3]:text-sm [&_h3]:font-bold [&_h3]:tracking-wider [&_code]:bg-muted [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_pre]:bg-muted [&_pre]:p-4 [&_pre]:rounded-lg">
                {lesson}
              </MathMarkdown>
              <AOCQuiz questions={practiceQuestions} />
            </div>
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
