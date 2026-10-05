import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Bell, BookOpen, Brain, ClipboardCheck, Moon, RotateCcw } from 'lucide-react';
import { getStoredTimetable } from '@/components/EditableTimetable';
import HomeCarousel from '@/components/HomeCarousel';
import { requestNotificationPermission } from '@/components/NotificationManager';
import { Button } from '@/components/ui/button';
import { getTodaySubjects, getDailySchedule, isGeneralCBTDay, SUBJECT_LABELS } from '@/data/syllabus';

interface DashboardProps {
  restMode: boolean;
  onToggleRest: () => void;
  onNavigate: (tab: 'dashboard' | 'syllabus' | 'cbt' | 'mistakes' | 'tutor') => void;
  streakDays: number;
  masteredCount: number;
  totalTopics: number;
  revisionsDue: number;
  onEditTimetable?: () => void;
}

const TICKER = [
  'UTME 2027 is coming — every topic you master today counts',
  'Use of English: 60 questions · Each other subject: 40 questions',
  'Read The Lekki Headmaster chapter by chapter',
  'Time yourself: about 45 seconds per question in CBT',
  'Review your mistake log before starting new topics',
  'Rest well — a fresh brain scores higher',
];
const TIPS = [
  'Eliminate two wrong options first — your odds jump to 50%.',
  'In Physics, write the formula and units before substituting numbers.',
  'For Chemistry calculations, always balance the equation first.',
  'In English comprehension, read the questions before the passage.',
  'Indices and logarithms appear every year — master the laws.',
  'Never leave a question blank; there is no negative marking.',
  'Spaced revision beats cramming: revisit topics after 1, 3 and 7 days.',
];
const EXAM_DATE = new Date('2027-04-24T08:00:00+01:00');

function getCurrentBlock(schedule: ReturnType<typeof getDailySchedule>) {
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  for (let i = 0; i < schedule.length; i++) {
    const [start] = schedule[i].time.split('-');
    const [sh, sm] = start.split(':').map(Number);
    const next = schedule[i + 1];
    let endMin = 24 * 60;
    if (next) {
      const [ns] = next.time.split('-');
      const [nh, nm] = ns.split(':').map(Number);
      endMin = nh * 60 + nm;
    }
    if (current >= sh * 60 + sm && current < endMin) return i;
  }
  return -1;
}

export default function Dashboard({ restMode, onToggleRest, onNavigate, streakDays, masteredCount, totalTopics, revisionsDue, onEditTimetable }: DashboardProps) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const timer = setInterval(() => setTime(new Date()), 60000); return () => clearInterval(timer); }, []);

  const subjects = getTodaySubjects(time);
  const [ttVersion, setTtVersion] = useState(0);
  useEffect(() => { const h = () => setTtVersion(v => v + 1); window.addEventListener('timetable-updated', h); window.addEventListener('storage', h); return () => { window.removeEventListener('timetable-updated', h); window.removeEventListener('storage', h); }; }, []);
  const schedule = (() => { void ttVersion; const hasCustom = !!localStorage.getItem('jamb-custom-timetable'); return hasCustom ? getStoredTimetable() : getDailySchedule(subjects); })();
  const currentBlockIdx = getCurrentBlock(schedule);
  const progress = totalTopics ? Math.round((masteredCount / totalTopics) * 100) : 0;
  const currentBlock = currentBlockIdx >= 0 ? schedule[currentBlockIdx] : schedule[0];
  const daysLeft = Math.max(0, Math.ceil((EXAM_DATE.getTime() - time.getTime()) / 86400000));
  const [tipIdx, setTipIdx] = useState(() => time.getDate() % TIPS.length);
  useEffect(() => { const t = setInterval(() => setTipIdx((i) => (i + 1) % TIPS.length), 8000); return () => clearInterval(t); }, []);
  const [notifState, setNotifState] = useState(() => ('Notification' in window ? Notification.permission : 'unsupported'));
  const enableReminders = async () => { await requestNotificationPermission(); setNotifState('Notification' in window ? Notification.permission : 'unsupported'); };
  const date = time.toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long' });

  if (restMode) {
    return <div className="flex min-h-[75vh] flex-col justify-center py-12"><Moon className="mb-8 size-9 text-primary" /><p className="page-kicker">Rest mode</p><h1 className="mt-3 max-w-xl text-5xl leading-tight sm:text-6xl">Pause without losing your place.</h1><p className="mt-5 max-w-md text-muted-foreground">Your progress is safe. Return when you are ready to continue.</p><Button onClick={onToggleRest} className="mt-10 w-fit">Return to study <ArrowRight /></Button></div>;
  }

  return (
    <div>
      <HomeCarousel />
      <section className="grid gap-8 border-b border-border pb-10 md:grid-cols-[1.5fr_.7fr] md:items-end">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
          <p className="page-kicker">Your study briefing · {date}</p>
          <h1 className="mt-4 max-w-3xl text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">Prepare with direction, not pressure.</h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">Build confidence across the syllabus, then prove it under real CBT conditions.</p>
        </motion.div>
        <div className="border-l-2 border-primary pl-5">
          <p className="text-xs font-bold uppercase text-muted-foreground">UTME 2027 countdown</p>
          <motion.p key={daysLeft} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="mt-1 font-serif text-4xl">{daysLeft} days</motion.p>
          <p className="mt-2 text-xs text-muted-foreground">Target 300+ · estimated exam window, confirm on the official JAMB 2027 timetable.</p>
        </div>
      </section>

      <section className="grid border-b border-border md:grid-cols-2">
        <div className="py-8 md:border-r md:border-border md:pr-10">
          <p className="page-kicker">Continue now</p>
          <h2 className="mt-3 text-3xl">{currentBlock?.label || 'Start a focused practice'}</h2>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{currentBlock?.description || 'Choose a subject and strengthen one topic.'}</p>
          <Button className="mt-7" onClick={() => onNavigate('cbt')}>Start CBT practice <ArrowRight /></Button>
        </div>
        <div className="py-8 md:pl-10">
          <p className="page-kicker">Today’s subjects</p>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {subjects.map((subject, index) => <div key={subject} className="flex items-center justify-between py-4"><span className="font-medium">{SUBJECT_LABELS[subject]}</span><span className="text-xs text-muted-foreground">0{index + 1}</span></div>)}
            {isGeneralCBTDay(time) && <div className="flex items-center justify-between py-4 text-primary"><span className="font-medium">General CBT simulation</span><span className="text-xs">Due today</span></div>}
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 border-b border-border md:grid-cols-4">
        {[['Study streak', `${streakDays} days`], ['Topics mastered', `${masteredCount}/${totalTopics}`], ['Syllabus', `${progress}%`], ['Revisions due', String(revisionsDue)]].map(([label, value], index) => (
          <div key={label} className={`py-7 ${index % 2 === 0 ? 'pr-4' : 'border-l border-border pl-4'} md:border-l md:border-border md:px-6 ${index === 0 ? 'md:border-l-0 md:pl-0' : ''}`}><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 font-serif text-3xl">{value}</p></div>
        ))}
      </section>

      <section className="grid border-b border-border md:grid-cols-[1.2fr_.8fr]">
        <div className="py-8 md:border-r md:border-border md:pr-10">
          <p className="page-kicker">Exam tip</p>
          <motion.p key={tipIdx} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }} className="mt-3 font-serif text-2xl leading-snug">{TIPS[tipIdx]}</motion.p>
          <div className="mt-5 flex gap-1.5">{TIPS.map((_, i) => <span key={i} className={`h-1 w-6 transition-colors ${i === tipIdx ? 'bg-primary' : 'bg-border'}`} />)}</div>
        </div>
        <div className="py-8 md:pl-10">
          <p className="page-kicker">Study reminders</p>
          {notifState === 'granted' ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground"><Bell className="mr-2 inline size-4 text-primary" />On. You'll be reminded at the start of each block in your timetable.</p>
          ) : notifState === 'denied' ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">Reminders are blocked. Allow notifications for this site in your browser settings.</p>
          ) : notifState === 'unsupported' ? (
            <p className="mt-3 text-sm leading-6 text-muted-foreground">This browser can't show reminders. Install the app to your home screen to get them.</p>
          ) : (
            <><p className="mt-3 text-sm leading-6 text-muted-foreground">Get a nudge when each study block in your timetable starts.</p><Button variant="outline" className="mt-5" onClick={enableReminders}><Bell /> Turn on reminders</Button></>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 border-b border-border sm:grid-cols-3">
        {[
          { label: 'Study a topic', detail: 'Offline lessons + practice', icon: BookOpen, tab: 'syllabus' as const },
          { label: 'Take a CBT', detail: 'Timed, exam-style', icon: ClipboardCheck, tab: 'cbt' as const },
          { label: 'Ask the tutor', detail: 'Explanations on demand', icon: Brain, tab: 'tutor' as const },
        ].map(({ label, detail, icon: Icon, tab }, i) => (
          <motion.button key={tab} whileHover={{ x: 4 }} onClick={() => onNavigate(tab)} className={`group flex items-center gap-4 py-6 text-left ${i > 0 ? 'border-t border-border sm:border-l sm:border-t-0 sm:pl-6' : ''}`}>
            <Icon className="size-6 text-primary" />
            <span className="flex-1"><span className="block font-medium">{label}</span><span className="block text-xs text-muted-foreground">{detail}</span></span>
            <ArrowRight className="size-4 text-muted-foreground transition-colors group-hover:text-primary" />
          </motion.button>
        ))}
      </section>

      <section className="grid gap-10 py-10 lg:grid-cols-[.75fr_1.25fr]">
        <div><p className="page-kicker">Today’s timetable</p><h2 className="mt-3 text-4xl">A clear route through the day.</h2><div className="mt-7 flex flex-wrap gap-3"><Button variant="outline" onClick={() => onNavigate('syllabus')}><BookOpen /> Open syllabus</Button><Button variant="outline" onClick={() => onNavigate('mistakes')}><RotateCcw /> Review mistakes</Button>{onEditTimetable && <Button variant="outline" onClick={onEditTimetable}>Edit timetable</Button>}</div></div>
        <div className="border-t border-border">
          {schedule.map((block, index) => {
            const current = index === currentBlockIdx;
            return <div key={`${block.time}-${index}`} className={`grid grid-cols-[5.5rem_1fr_auto] items-center gap-3 border-b border-border py-4 ${index < currentBlockIdx ? 'text-muted-foreground' : ''}`}><span className="text-xs tabular-nums text-muted-foreground">{block.time}</span><div><p className={current ? 'font-semibold text-primary' : 'font-medium'}>{block.label}</p><p className="mt-1 text-xs text-muted-foreground">{block.description}</p></div>{current && <span className="text-[10px] font-bold uppercase text-primary">Now</span>}</div>;
          })}
        </div>
      </section>
    </div>
  );
}