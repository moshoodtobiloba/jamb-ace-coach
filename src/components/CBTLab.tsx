import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { isGeneralCBTDay, SUBJECT_LABELS, Subject } from '@/data/syllabus';

interface CBTLabProps {
  onSessionComplete: (session: { date: string; duration: number; score?: number; total?: number; type: 'daily' | 'general' }) => void;
  sessions: { id: string; date: string; duration: number; score?: number; total?: number; type: string }[];
}

export default function CBTLab({ onSessionComplete, sessions }: CBTLabProps) {
  const [running, setRunning] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [mode, setMode] = useState<'daily' | 'general'>(isGeneralCBTDay(new Date()) ? 'general' : 'daily');
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState('');
  const [total, setTotal] = useState('40');

  const DURATION = mode === 'general' ? 120 * 60 : 30 * 60; // 2hr or 30min

  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => {
      setElapsed(e => {
        if (e + 1 >= DURATION) {
          setRunning(false);
          setShowResult(true);
          return DURATION;
        }
        return e + 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [running, DURATION]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const remaining = DURATION - elapsed;
  const pct = (elapsed / DURATION) * 100;

  const handleComplete = () => {
    onSessionComplete({
      date: new Date().toDateString(),
      duration: elapsed,
      score: score ? parseInt(score) : undefined,
      total: total ? parseInt(total) : undefined,
      type: mode,
    });
    setRunning(false);
    setElapsed(0);
    setShowResult(false);
    setScore('');
  };

  const todaySessions = sessions.filter(s => s.date === new Date().toDateString());

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-black tracking-wider glow-green mb-1">🖥️ CBT LAB</h2>
        <p className="text-xs text-muted-foreground tracking-widest">SIMULATE THE REAL THING. NO MERCY.</p>
      </div>

      {/* Mode Toggle */}
      <div className="flex gap-3">
        <button
          onClick={() => { setMode('daily'); setElapsed(0); setRunning(false); }}
          className={`px-4 py-2 rounded text-xs font-bold tracking-wider ${mode === 'daily' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}
        >
          DAILY (30 MIN)
        </button>
        <button
          onClick={() => { setMode('general'); setElapsed(0); setRunning(false); }}
          className={`px-4 py-2 rounded text-xs font-bold tracking-wider ${mode === 'general' ? 'bg-secondary text-secondary-foreground' : 'bg-muted text-muted-foreground'}`}
        >
          GENERAL (2 HRS)
        </button>
      </div>

      {/* Timer */}
      <motion.div
        className="border border-border rounded p-8 text-center border-glow"
        animate={running ? { borderColor: ['hsl(120,100%,50%)', 'hsl(120,100%,20%)', 'hsl(120,100%,50%)'] } : {}}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <p className="text-6xl font-black font-mono glow-green">{formatTime(remaining)}</p>
        <p className="text-xs text-muted-foreground mt-2 tracking-widest">
          {running ? "DON'T STOP NOW" : 'READY TO BEGIN'}
        </p>

        {/* Progress bar */}
        <div className="w-full bg-muted rounded-full h-2 mt-4">
          <div className="bg-primary h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>

        <div className="flex gap-3 justify-center mt-6">
          {!running && !showResult && (
            <Button onClick={() => setRunning(true)} className="tracking-wider font-bold">
              ⚡ START CBT
            </Button>
          )}
          {running && (
            <>
              <Button variant="outline" onClick={() => setRunning(false)} className="tracking-wider">PAUSE</Button>
              <Button variant="destructive" onClick={() => { setRunning(false); setShowResult(true); }} className="tracking-wider">END</Button>
            </>
          )}
        </div>
      </motion.div>

      {/* Score Input */}
      {showResult && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-border rounded p-6 space-y-4"
        >
          <p className="text-sm font-bold tracking-wider">SESSION COMPLETE — LOG YOUR SCORE</p>
          <div className="flex gap-3 items-center">
            <input
              type="number"
              value={score}
              onChange={e => setScore(e.target.value)}
              placeholder="Score"
              className="bg-muted border border-border rounded px-3 py-2 text-sm w-24 text-foreground"
            />
            <span className="text-muted-foreground">/</span>
            <input
              type="number"
              value={total}
              onChange={e => setTotal(e.target.value)}
              className="bg-muted border border-border rounded px-3 py-2 text-sm w-24 text-foreground"
            />
          </div>
          <Button onClick={handleComplete} className="tracking-wider font-bold">LOG SESSION ✓</Button>
        </motion.div>
      )}

      {/* Recent Sessions */}
      {todaySessions.length > 0 && (
        <div className="border border-border rounded p-4">
          <p className="text-xs text-muted-foreground tracking-widest mb-3">TODAY'S SESSIONS</p>
          <div className="space-y-2">
            {todaySessions.map(s => (
              <div key={s.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{s.type.toUpperCase()} • {formatTime(s.duration)}</span>
                {s.score !== undefined && (
                  <span className={`font-bold ${(s.score / (s.total || 1)) >= 0.7 ? 'text-foreground' : 'text-destructive'}`}>
                    {s.score}/{s.total}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {isGeneralCBTDay(new Date()) && (
        <p className="text-center text-sm text-secondary font-bold tracking-wider glow-amber pulse-slow">
          🔥 GENERAL CBT DAY — ALL SUBJECTS. FULL JAMB SIMULATION.
        </p>
      )}
    </div>
  );
}
