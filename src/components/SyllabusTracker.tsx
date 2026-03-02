import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SYLLABUS, SUBJECT_LABELS, Subject, Topic } from '@/data/syllabus';
import { Checkbox } from '@/components/ui/checkbox';
import TopicLesson from './TopicLesson';

interface SyllabusTrackerProps {
  mastered: { topicId: string; masteredAt: number; revisionDue: number; revised: boolean }[];
  onToggle: (topicId: string) => void;
  onMarkRevised: (topicId: string) => void;
  getRevisionsDue: () => { topicId: string; revisionDue: number }[];
}

export default function SyllabusTracker({ mastered, onToggle, onMarkRevised, getRevisionsDue }: SyllabusTrackerProps) {
  const [activeSubject, setActiveSubject] = useState<Subject>('mathematics');
  const [showMastered, setShowMastered] = useState(false);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);

  const masteredIds = new Set(mastered.map(m => m.topicId));
  const revisionsDue = getRevisionsDue();
  const revisionIds = new Set(revisionsDue.map(r => r.topicId));

  const subjectTopics = SYLLABUS.filter(t => t.subject === activeSubject);
  const pending = subjectTopics.filter(t => !masteredIds.has(t.id));
  const done = subjectTopics.filter(t => masteredIds.has(t.id));

  const categories = [...new Set(pending.map(t => t.category))];
  const masteredCategories = [...new Set(done.map(t => t.category))];

  const subjects: Subject[] = ['mathematics', 'physics', 'chemistry', 'english'];

  // If a topic lesson is open, show it
  if (activeTopic) {
    return (
      <TopicLesson
        topic={activeTopic}
        onClose={() => setActiveTopic(null)}
        onMarkMastered={() => {
          if (!masteredIds.has(activeTopic.id)) {
            onToggle(activeTopic.id);
          }
        }}
        isMastered={masteredIds.has(activeTopic.id)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black tracking-wider glow-green mb-1">📋 AOC SYLLABUS</h2>
        <p className="text-xs text-muted-foreground tracking-widest">TAP A TOPIC TO LEARN • CHECK TO MARK MASTERED</p>
      </div>

      {/* Revisions Due Alert */}
      {revisionsDue.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="border border-destructive/50 bg-destructive/10 rounded p-4">
          <p className="text-sm font-bold text-destructive tracking-wider mb-2">🔄 {revisionsDue.length} REVISION(S) DUE</p>
          <div className="space-y-2">
            {revisionsDue.map(r => {
              const topic = SYLLABUS.find(t => t.id === r.topicId);
              if (!topic) return null;
              return (
                <div key={r.topicId} className="flex items-center justify-between">
                  <button onClick={() => setActiveTopic(topic)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors text-left">
                    {topic.name} ({SUBJECT_LABELS[topic.subject]})
                  </button>
                  <button onClick={() => onMarkRevised(r.topicId)}
                    className="text-xs px-3 py-1 border border-primary/50 text-primary rounded hover:bg-primary/10 transition-colors">
                    REVISED ✓
                  </button>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Subject Tabs */}
      <div className="flex gap-2 flex-wrap">
        {subjects.map(sub => {
          const total = SYLLABUS.filter(t => t.subject === sub).length;
          const masteredCount = SYLLABUS.filter(t => t.subject === sub && masteredIds.has(t.id)).length;
          return (
            <button key={sub} onClick={() => setActiveSubject(sub)}
              className={`px-4 py-2 rounded text-xs font-bold tracking-wider transition-all ${
                activeSubject === sub ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:text-foreground'
              }`}>{SUBJECT_LABELS[sub]} ({masteredCount}/{total})</button>
          );
        })}
      </div>

      {/* Pending Topics */}
      <div className="space-y-4">
        {categories.map(cat => (
          <div key={cat}>
            <p className="text-xs text-secondary tracking-widest font-bold mb-2">{cat.toUpperCase()}</p>
            <div className="space-y-1">
              {pending.filter(t => t.category === cat).map(topic => (
                <TopicRow
                  key={topic.id}
                  topic={topic}
                  checked={false}
                  needsRevision={revisionIds.has(topic.id)}
                  onToggle={() => onToggle(topic.id)}
                  onTap={() => setActiveTopic(topic)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Mastered Section */}
      {done.length > 0 && (
        <div>
          <button onClick={() => setShowMastered(!showMastered)}
            className="text-xs text-muted-foreground tracking-widest hover:text-foreground transition-colors">
            {showMastered ? '▼' : '▶'} MASTERED ({done.length})
          </button>
          <AnimatePresence>
            {showMastered && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} className="overflow-hidden mt-3 space-y-4">
                {masteredCategories.map(cat => (
                  <div key={cat}>
                    <p className="text-xs text-muted-foreground tracking-widest mb-2">{cat.toUpperCase()}</p>
                    <div className="space-y-1">
                      {done.filter(t => t.category === cat).map(topic => (
                        <TopicRow
                          key={topic.id}
                          topic={topic}
                          checked
                          needsRevision={revisionIds.has(topic.id)}
                          onToggle={() => onToggle(topic.id)}
                          onTap={() => setActiveTopic(topic)}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function TopicRow({ topic, checked, needsRevision, onToggle, onTap }: {
  topic: Topic; checked: boolean; needsRevision: boolean; onToggle: () => void; onTap: () => void;
}) {
  return (
    <motion.div layout
      className={`flex items-center gap-3 p-2 rounded transition-colors ${
        checked ? 'opacity-60' : 'hover:bg-muted/50'
      } ${needsRevision ? 'border border-secondary/30 bg-secondary/5' : ''}`}>
      <Checkbox checked={checked} onCheckedChange={onToggle} />
      <button onClick={onTap}
        className={`text-sm text-left flex-1 transition-colors ${
          checked ? 'line-through text-muted-foreground' : 'text-foreground hover:text-primary'
        }`}>
        {topic.name}
      </button>
      {needsRevision && <span className="text-xs text-secondary font-bold ml-auto">REVISE!</span>}
    </motion.div>
  );
}
