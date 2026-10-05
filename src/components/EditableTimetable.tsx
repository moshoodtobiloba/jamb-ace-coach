import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CUSTOM_TIMETABLE_KEY = 'jamb-custom-timetable';

interface TimeBlock {
  id: string;
  time: string;
  label: string;
  description: string;
  icon: string;
}

const DEFAULT_BLOCKS: TimeBlock[] = [
  { id: 'b1', time: '05:30-06:00', label: 'WAKE UP & ACTIVATE', description: 'Machine boots. Cold water. Focus.', icon: '⚡' },
  { id: 'b2', time: '06:00-06:45', label: 'REVISION DRILL', description: 'Review yesterday\'s topics. Quick-fire recall.', icon: '🔁' },
  { id: 'b3', time: '06:45-08:30', label: 'MORNING STUDY', description: 'Deep study session — Subject 1', icon: '📖' },
  { id: 'b4', time: '08:30-09:00', label: 'FUEL & PREP', description: 'Eat. Prepare for lesson.', icon: '🍳' },
  { id: 'b5', time: '09:00-13:00', label: 'LESSON MODE', description: 'At lesson. Machine on standby.', icon: '🏫' },
  { id: 'b6', time: '13:00-14:30', label: 'HUMAN RECHARGE', description: 'Eat. Rest. You are human. Recover.', icon: '🍽️' },
  { id: 'b7', time: '14:30-16:00', label: 'AFTERNOON STUDY', description: 'Deep study session — Subject 2', icon: '📖' },
  { id: 'b8', time: '16:00-16:15', label: 'BREAK', description: 'Walk. Stretch. Breathe.', icon: '🚶' },
  { id: 'b9', time: '16:15-17:30', label: 'CBT LAB', description: 'Timed practice. Simulate the real thing.', icon: '🖥️' },
  { id: 'b10', time: '17:30-18:00', label: 'MISTAKE REVIEW', description: 'Log what you missed. Own it.', icon: '📝' },
  { id: 'b11', time: '18:00', label: 'MACHINE REST', description: 'Shut down. Tomorrow we go again.', icon: '🌙' },
];

function getStoredTimetable(): TimeBlock[] {
  try {
    const stored = localStorage.getItem(CUSTOM_TIMETABLE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_BLOCKS;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditableTimetable({ isOpen, onClose }: Props) {
  const [blocks, setBlocks] = useState<TimeBlock[]>(getStoredTimetable);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editTime, setEditTime] = useState('');
  const [editDesc, setEditDesc] = useState('');

  useEffect(() => {
    localStorage.setItem(CUSTOM_TIMETABLE_KEY, JSON.stringify(blocks));
    window.dispatchEvent(new Event('timetable-updated'));
  }, [blocks]);

  const addBlock = () => {
    const id = `b${Date.now()}`;
    const nb = { id, time: '19:00-20:00', label: 'NEW PERIOD', description: 'Describe this period', icon: '📌' };
    setBlocks(prev => [...prev, nb]);
    startEdit(nb);
  };
  const deleteBlock = (id: string) => setBlocks(prev => prev.filter(b => b.id !== id));
  const sortBlocks = (list: TimeBlock[]) => [...list].sort((a, b) => a.time.localeCompare(b.time));

  const startEdit = (block: TimeBlock) => {
    setEditingId(block.id);
    setEditLabel(block.label);
    setEditTime(block.time);
    setEditDesc(block.description);
  };

  const saveEdit = () => {
    if (!editingId) return;
    setBlocks(prev => prev.map(b =>
      b.id === editingId ? { ...b, label: editLabel, time: editTime, description: editDesc } : b
    ).sort((a, b) => a.time.localeCompare(b.time)));
    setEditingId(null);
  };

  const resetToDefault = () => {
    setBlocks(sortBlocks(DEFAULT_BLOCKS));
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[90] bg-background overflow-y-auto"
        style={{ top: '52px' }}
      >
        <div className="p-4 max-w-2xl mx-auto pb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-black tracking-wider text-foreground">📅 EDIT TIMETABLE</h2>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground px-3 py-1 border border-border rounded-lg text-sm">
              ✕ Close
            </button>
          </div>

          <p className="text-xs text-muted-foreground mb-4 tracking-wider">
            Tap any period to edit or delete it, or add a new one. Changes show on your home page right away. Notifications will follow your custom times.
          </p>

          <div className="space-y-2">
            {blocks.map((block) => (
              <motion.div
                key={block.id}
                layout
                className="border border-border rounded-xl p-4 bg-card"
              >
                {editingId === block.id ? (
                  <div className="space-y-3">
                    <input
                      value={editTime}
                      onChange={e => setEditTime(e.target.value)}
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground font-mono"
                      placeholder="e.g. 05:30-06:00"
                    />
                    <input
                      value={editLabel}
                      onChange={e => setEditLabel(e.target.value)}
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-foreground font-bold"
                      placeholder="Block name"
                    />
                    <input
                      value={editDesc}
                      onChange={e => setEditDesc(e.target.value)}
                      className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground"
                      placeholder="Description"
                    />
                    <div className="flex gap-2">
                      <button onClick={saveEdit} className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold">
                        ✅ Save
                      </button>
                      <button onClick={() => setEditingId(null)} className="flex-1 py-2 border border-border rounded-lg text-xs text-muted-foreground">
                        Cancel
                      </button>
                      <button onClick={() => { deleteBlock(block.id); setEditingId(null); }} className="flex-1 py-2 border border-destructive text-destructive rounded-lg text-xs font-bold">
                        Delete
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    onClick={() => startEdit(block)}
                    className="w-full text-left flex items-center gap-3"
                  >
                    <span className="text-lg">{block.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs text-muted-foreground font-mono">{block.time}</p>
                      <p className="text-sm font-bold text-foreground tracking-wider">{block.label}</p>
                      <p className="text-xs text-muted-foreground truncate">{block.description}</p>
                    </div>
                    <span className="text-muted-foreground text-xs">✏️</span>
                  </button>
                )}
              </motion.div>
            ))}
          </div>

          <div className="mt-4 flex gap-3">
            <button onClick={addBlock} className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl text-xs font-bold">
              ＋ Add period
            </button>
            <button
              onClick={resetToDefault}
              className="flex-1 py-3 border border-border rounded-xl text-xs font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              🔄 Reset to Default
            </button>
          </div>

          <p className="text-[10px] text-muted-foreground text-center mt-4 tracking-wider">
            💡 TIP: Set times that match YOUR real schedule for the best results
          </p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export { getStoredTimetable, DEFAULT_BLOCKS };
export type { TimeBlock };
