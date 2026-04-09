import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getTodaySubjects, getDailySchedule, isGeneralCBTDay, SUBJECT_LABELS } from '@/data/syllabus';

interface DashboardProps {
  restMode: boolean;
  onToggleRest: () => void;
  streakDays: number;
  masteredCount: number;
  totalTopics: number;
  revisionsDue: number;
}

function getCurrentBlock(schedule: ReturnType<typeof getDailySchedule>) {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const current = h * 60 + m;

  for (let i = 0; i < schedule.length; i++) {
    const [start] = schedule[i].time.split('-');
    const [sh, sm] = start.split(':').map(Number);
    const startMin = sh * 60 + sm;

    const next = schedule[i + 1];
    let endMin = 24 * 60;
    if (next) {
      const [ns] = next.time.split('-');
      const [nh, nm] = ns.split(':').map(Number);
      endMin = nh * 60 + nm;
    }

    if (current >= startMin && current < endMin) return i;
  }
  return -1;
}

export default function Dashboard({ restMode, onToggleRest, streakDays, masteredCount, totalTopics, revisionsDue }: DashboardProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const hour = time.getHours();
  const isActive = hour >= 5 && hour < 18;
  const subjects = getTodaySubjects(time);
  const schedule = getDailySchedule(subjects);
  const currentBlockIdx = getCurrentBlock(schedule);
  const isGeneral = isGeneralCBTDay(time);
  const progress = Math.round((masteredCount / totalTopics) * 100);

  const dayNames = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];

  if (restMode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center space-y-6">
          <p className="text-2xl text-muted-foreground">😴 REST MODE</p>
          <p className="text-lg text-muted-foreground">You're human. Take a breath.</p>
          <p className="text-sm text-muted-foreground">When you're ready, toggle back.</p>
          <button onClick={onToggleRest} className="mt-8 px-6 py-3 border border-border rounded text-foreground hover:bg-muted transition-colors">
            ⚡ REACTIVATE
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Bar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-border rounded-lg p-6 border-glow"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <div className="flex items-center gap-3">
              <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-primary animate-pulse' : 'bg-destructive'}`} />
              <h1 className="text-xl font-black tracking-wider glow-green">
                {isActive ? '⚡ STUDY MODE' : '🌙 REST MODE'}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground mt-1 tracking-widest">
              {dayNames[time.getDay()]} • {time.toLocaleTimeString('en-US', { hour12: false })}
            </p>
          </div>
          <div className="text-right">
            <p className="text-2xl font-black text-secondary glow-amber">TARGET 300+</p>
            <p className="text-xs text-muted-foreground tracking-widest">JAMB 2026 • ACE COACH</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'STREAK', value: `${streakDays} DAYS`, color: 'text-secondary' },
          { label: 'TOPICS', value: `${masteredCount}/${totalTopics}`, color: 'text-foreground' },
          { label: 'SYLLABUS', value: `${progress}%`, color: 'text-foreground' },
          { label: 'REVISIONS', value: revisionsDue.toString(), color: revisionsDue > 0 ? 'text-destructive' : 'text-foreground' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="border border-border rounded-lg p-4 text-center"
          >
            <p className="text-xs text-muted-foreground tracking-widest">{stat.label}</p>
            <p className={`text-xl font-black mt-1 ${stat.color}`}>{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Today's Subjects */}
      <div className="border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground tracking-widest mb-3">TODAY'S TARGETS</p>
        <div className="flex gap-4 flex-wrap">
          <span className="px-4 py-2 bg-muted rounded-lg text-sm font-bold tracking-wider">{SUBJECT_LABELS[subjects[0]]}</span>
          <span className="px-4 py-2 bg-muted rounded-lg text-sm font-bold tracking-wider">{SUBJECT_LABELS[subjects[1]]}</span>
          {isGeneral && <span className="px-4 py-2 bg-destructive/20 text-destructive rounded-lg text-sm font-bold tracking-wider">🔥 GENERAL CBT DAY</span>}
        </div>
      </div>

      {/* Daily Flow Timeline */}
      <div className="border border-border rounded-lg p-4">
        <p className="text-xs text-muted-foreground tracking-widest mb-4">DAILY FLOW</p>
        <div className="space-y-1">
          {schedule.map((block, i) => {
            const isCurrent = i === currentBlockIdx;
            const isPast = i < currentBlockIdx;
            return (
              <motion.div
                key={block.time}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`flex items-center gap-4 p-3 rounded-lg text-sm transition-colors ${
                  isCurrent ? 'bg-primary/10 border border-primary/30' : isPast ? 'opacity-40' : ''
                }`}
              >
                <span className="text-xs text-muted-foreground w-24 shrink-0 font-mono">{block.time}</span>
                <span className="text-lg">{block.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className={`font-bold tracking-wider ${isCurrent ? 'text-foreground glow-green' : 'text-muted-foreground'}`}>
                    {block.label}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">{block.description}</p>
                </div>
                {isCurrent && (
                  <span className="text-xs text-primary font-bold animate-pulse tracking-widest">NOW</span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Motivational Footer */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-sm text-muted-foreground tracking-widest pulse-slow"
      >
        {hour < 6 ? "EARLY RISERS WIN. LET'S GO." :
         hour < 13 ? "FOCUS. LEARN. CONQUER." :
         hour < 15 ? "RECHARGE, THEN PUSH HARDER." :
         hour < 18 ? "FINAL SESSION. MAKE IT COUNT." :
         "REST WELL. TOMORROW WE GO AGAIN. 🔥"}
      </motion.p>
    </div>
  );
}
