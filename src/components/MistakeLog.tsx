import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { SUBJECT_LABELS, Subject } from '@/data/syllabus';

interface MistakeLogProps {
  mistakes: { id: string; date: string; subject: string; question: string; createdAt: number }[];
  onAdd: (subject: string, question: string) => void;
  onDelete: (id: string) => void;
}

export default function MistakeLog({ mistakes, onAdd, onDelete }: MistakeLogProps) {
  const [subject, setSubject] = useState<Subject>('mathematics');
  const [question, setQuestion] = useState('');
  const [filter, setFilter] = useState<'all' | 'today' | 'sunday'>('all');

  const handleAdd = () => {
    if (!question.trim()) return;
    onAdd(subject, question.trim());
    setQuestion('');
  };

  const today = new Date().toDateString();
  const isSunday = new Date().getDay() === 0;

  const filtered = mistakes.filter(m => {
    if (filter === 'today') return m.date === today;
    if (filter === 'sunday') return true; // Show all on Sunday for review
    return true;
  }).sort((a, b) => b.createdAt - a.createdAt);

  const subjects: Subject[] = ['mathematics', 'physics', 'chemistry', 'english'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black tracking-wider glow-green mb-1">📝 MISTAKE LOG</h2>
        <p className="text-xs text-muted-foreground tracking-widest">OWN YOUR MISTAKES. REVIEW EVERY SUNDAY.</p>
      </div>

      {isSunday && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="border border-secondary/50 bg-secondary/10 rounded p-4"
        >
          <p className="text-sm font-bold text-secondary tracking-wider glow-amber">🔥 SUNDAY = REVIEW DAY</p>
          <p className="text-xs text-muted-foreground mt-1">Go through every mistake below. Don't repeat them.</p>
        </motion.div>
      )}

      {/* Add Mistake */}
      <div className="border border-border rounded p-4 space-y-3">
        <p className="text-xs text-muted-foreground tracking-widest">LOG A MISTAKE</p>
        <div className="flex gap-2 flex-wrap">
          {subjects.map(s => (
            <button
              key={s}
              onClick={() => setSubject(s)}
              className={`px-3 py-1 rounded text-xs font-bold tracking-wider ${
                subject === s ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}
            >
              {SUBJECT_LABELS[s]}
            </button>
          ))}
        </div>
        <Textarea
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="What question did you miss? Type it here..."
          className="bg-muted text-foreground border-border text-sm"
          rows={3}
        />
        <Button onClick={handleAdd} disabled={!question.trim()} className="tracking-wider font-bold">
          LOG MISTAKE
        </Button>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {(['all', 'today'] as const).map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded text-xs font-bold tracking-wider ${
              filter === f ? 'bg-muted text-foreground' : 'text-muted-foreground'
            }`}
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Mistakes List */}
      <div className="space-y-2">
        <AnimatePresence>
          {filtered.map(m => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="border border-border rounded p-3 flex gap-3"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 bg-muted rounded font-bold tracking-wider">
                    {SUBJECT_LABELS[m.subject as Subject] || m.subject.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted-foreground">{m.date}</span>
                </div>
                <p className="text-sm text-foreground">{m.question}</p>
              </div>
              <button
                onClick={() => onDelete(m.id)}
                className="text-muted-foreground hover:text-destructive transition-colors text-xs shrink-0"
              >
                ✕
              </button>
            </motion.div>
          ))}
        </AnimatePresence>
        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-8">
            {filter === 'today' ? 'No mistakes today. Keep it that way.' : 'No mistakes logged yet. Stay sharp.'}
          </p>
        )}
      </div>

      <p className="text-center text-xs text-muted-foreground tracking-widest">
        TOTAL LOGGED: {mistakes.length} MISTAKES
      </p>
    </div>
  );
}
