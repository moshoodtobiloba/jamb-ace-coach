import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, Brain, CalendarDays, CircleHelp, ClipboardCheck, Home, LogOut, Menu, Moon, Palette, X } from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import SyllabusTracker from '@/components/SyllabusTracker';
import CBTExam from '@/components/CBTExam';
import MistakeLog from '@/components/MistakeLog';
import TutorChat from '@/components/TutorChat';
import AskTutorPopup from '@/components/AskTutorPopup';
import InstallBanner, { InstallButton } from '@/components/InstallBanner';
import { Button } from '@/components/ui/button';
import { useJambStore } from '@/hooks/useJambStore';
import { useAuth } from '@/contexts/AuthContext';
import { SYLLABUS, getDailySchedule, getTodaySubjects } from '@/data/syllabus';
import ContactForm from '@/components/ContactForm';
import FeedbackSurvey from '@/components/FeedbackSurvey';
import OnboardingTour from '@/components/OnboardingTour';
import NotificationManager from '@/components/NotificationManager';
import EditableTimetable from '@/components/EditableTimetable';
import ThemeSettings, { initTheme } from '@/components/ThemeSettings';
import SurveyResponses from '@/components/SurveyResponses';
import VersionBadge from '@/components/VersionBadge';
import UpdateNotice from '@/components/UpdateNotice';
import { supabase } from '@/integrations/supabase/client';

type Tab = 'dashboard' | 'syllabus' | 'cbt' | 'mistakes' | 'tutor';

const primaryItems = [
  { id: 'dashboard' as const, label: 'Headquarters', detail: 'Today’s study briefing', icon: Home },
  { id: 'syllabus' as const, label: 'AOC syllabus', detail: 'Topics and revision', icon: BookOpen },
  { id: 'cbt' as const, label: 'CBT centre', detail: 'Practice and full simulations', icon: ClipboardCheck },
  { id: 'tutor' as const, label: 'Personal tutor', detail: 'Ask and understand', icon: Brain },
  { id: 'mistakes' as const, label: 'Mistake log', detail: 'Review weak points', icon: ClipboardCheck },
];

const pageNames: Record<Tab, string> = {
  dashboard: 'Headquarters', syllabus: 'AOC syllabus', cbt: 'CBT centre', tutor: 'Personal tutor', mistakes: 'Mistake log',
};

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>(() => {
    const t = new URLSearchParams(window.location.search).get('tab') as Tab | null;
    return t && ['dashboard', 'syllabus', 'cbt', 'mistakes', 'tutor'].includes(t) ? t : 'dashboard';
  });
  useEffect(() => {
    const onMsg = (e: MessageEvent) => { if (e.data?.type === 'open-tab') setActiveTab(e.data.tab); };
    navigator.serviceWorker?.addEventListener('message', onMsg);
    return () => navigator.serviceWorker?.removeEventListener('message', onMsg);
  }, []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [utilityPanel, setUtilityPanel] = useState<'display' | 'help' | null>(null);
  const [showTheme, setShowTheme] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showSurveys, setShowSurveys] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    if (!navigator.onLine) return;
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) return;
      supabase.rpc('has_role', { _user_id: data.user.id, _role: 'admin' }).then(({ data: ok }) => setIsAdmin(!!ok));
    });
  }, []);
  const [showTimetable, setShowTimetable] = useState(false);
  const store = useJambStore();
  useEffect(() => { initTheme(); }, []);
  const schedule = getDailySchedule(getTodaySubjects(new Date()));
  const { signOut } = useAuth();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const navigate = (tab: Tab) => {
    setActiveTab(tab);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleTheme = () => document.documentElement.classList.toggle('dark');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeSettings isOpen={showTheme} onClose={() => setShowTheme(false)} />
      <ContactForm isOpen={showContact} onClose={() => setShowContact(false)} />
      {showSurveys && <SurveyResponses onClose={() => setShowSurveys(false)} />}
      <EditableTimetable isOpen={showTimetable} onClose={() => setShowTimetable(false)} />
      <FeedbackSurvey />
      <OnboardingTour />
      <NotificationManager schedule={schedule} />
      <AskTutorPopup disabled={activeTab === 'cbt'} />
      <InstallBanner />
      <UpdateNotice />

      {!store.restMode && (
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 lg:px-8">
            <button onClick={() => navigate('dashboard')} className="text-left" aria-label="Go to headquarters">
              <span className="flex items-center gap-3"><img src="/logo-192.png" alt="" width={36} height={36} className="size-9 rounded-sm" /><span>
              <span className="block font-serif text-xl leading-none">EXAMGUIDE</span>
              <span className="mt-1 block text-[9px] font-bold uppercase text-primary" style={{ letterSpacing: '.18em' }}>UTME 2027</span></span></span>
            </button>
            <div className="flex items-center gap-3">
              <VersionBadge />
              <Button variant="outline" size="icon" onClick={() => setMenuOpen(true)} aria-label="Open main menu">
                <Menu className="size-5" />
              </Button>
            </div>
          </div>
        </header>
      )}

      <main className={activeTab === 'cbt' ? 'mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8' : 'mx-auto max-w-6xl px-5 py-8 sm:py-12 lg:px-8'}>
        <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.22 }}>
          {activeTab === 'dashboard' && (
            <>
              <Dashboard
                restMode={store.restMode}
                onToggleRest={store.toggleRestMode}
                onNavigate={navigate}
                streakDays={store.streakDays}
                masteredCount={store.topicsMasteredCount}
                totalTopics={SYLLABUS.length}
                revisionsDue={store.getRevisionsDue().length}
                onEditTimetable={() => setShowTimetable(true)}
              />
              <div className="mt-10 border-t border-border pt-6"><InstallButton /></div>
            </>
          )}
          {activeTab === 'syllabus' && <SyllabusTracker mastered={store.mastered} onToggle={store.toggleMastered} onMarkRevised={store.markRevised} getRevisionsDue={store.getRevisionsDue} />}
          {activeTab === 'cbt' && <CBTExam onSessionComplete={store.addCBTSession} sessions={store.cbtSessions} />}
          {activeTab === 'tutor' && <TutorChat />}
          {activeTab === 'mistakes' && <MistakeLog mistakes={store.mistakes} onAdd={store.addMistake} onDelete={store.deleteMistake} />}
        </motion.div>
      </main>

      <AnimatePresence>
        {menuOpen && (
          <motion.div className="fixed inset-0 z-50 bg-foreground/25" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setMenuOpen(false)}>
            <motion.aside
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="ml-auto flex h-full w-full max-w-md flex-col bg-background shadow-2xl" onClick={event => event.stopPropagation()}
            >
              <div className="flex h-20 items-center justify-between border-b border-border px-6">
                <div><p className="font-serif text-2xl">Study index</p><p className="text-xs text-muted-foreground">Everything in one place</p></div>
                <Button variant="ghost" size="icon" onClick={() => setMenuOpen(false)} aria-label="Close menu"><X /></Button>
              </div>
              <nav className="flex-1 overflow-y-auto px-6 py-3" aria-label="Main navigation">
                {primaryItems.map(({ id, label, detail, icon: Icon }, index) => (
                  <button key={id} onClick={() => navigate(id)} className={`flex w-full items-center gap-4 border-b border-border py-4 text-left transition-colors hover:text-primary ${activeTab === id ? 'text-primary' : ''}`}>
                    <span className="w-5 text-xs text-muted-foreground">0{index + 1}</span><Icon className="size-5" />
                    <span className="flex-1"><span className="block font-medium">{label}</span><span className="block text-xs text-muted-foreground">{detail}</span></span>
                  </button>
                ))}
                <p className="page-kicker mt-8 mb-2">Preferences & support</p>
                <button onClick={() => { setShowTimetable(true); setMenuOpen(false); }} className="editorial-row flex w-full items-center gap-4 text-left"><CalendarDays className="size-5" /><span>Edit timetable</span></button>
                <button onClick={() => { setShowTheme(true); setMenuOpen(false); }} className="editorial-row flex w-full items-center gap-4 text-left"><Palette className="size-5" /><span>Theme & display</span></button>
                <button onClick={() => { setShowContact(true); setMenuOpen(false); }} className="editorial-row flex w-full items-center gap-4 text-left"><CircleHelp className="size-5" /><span>Contact & get help</span></button>
                <button onClick={() => { store.toggleRestMode(); setMenuOpen(false); }} className="editorial-row flex w-full items-center gap-4 text-left"><Moon className="size-5" /><span>Rest mode</span></button>
                {isAdmin && <button onClick={() => { setShowSurveys(true); setMenuOpen(false); }} className="editorial-row flex w-full items-center gap-4 text-left"><ClipboardCheck className="size-5" /><span>Survey responses</span></button>}
              </nav>
              <div className="border-t border-border p-6"><div className="mb-3"><VersionBadge /></div><Button variant="outline" className="w-full justify-between" onClick={signOut}>Sign out <LogOut /></Button></div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {utilityPanel && (
          <motion.div className="fixed inset-0 z-[60] flex items-end justify-center bg-foreground/25 p-0 sm:items-center sm:p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.section initial={{ y: 30 }} animate={{ y: 0 }} exit={{ y: 30 }} className="w-full max-w-lg border border-border bg-background p-6 shadow-2xl">
              <div className="mb-8 flex items-start justify-between"><div><p className="page-kicker">{utilityPanel === 'display' ? 'Preferences' : 'Support'}</p><h2 className="mt-1 text-3xl">{utilityPanel === 'display' ? 'Theme & display' : 'How can we help?'}</h2></div><Button variant="ghost" size="icon" onClick={() => setUtilityPanel(null)}><X /></Button></div>
              {utilityPanel === 'display' ? (
                <div className="space-y-6"><p className="text-sm leading-6 text-muted-foreground">Choose the reading mode that feels most comfortable. Your study data is unaffected.</p><Button onClick={toggleTheme} className="w-full">Switch light / dark reading mode</Button></div>
              ) : (
                <div className="space-y-5"><p className="text-sm leading-6 text-muted-foreground">Tell us what went wrong or what would make studying better.</p><a className="block border-y border-border py-4 font-medium text-primary" href="mailto:moshoodabdulmujib9@gmail.com?subject=EXAMGUIDE%20UTME%20support">Email moshoodabdulmujib9@gmail.com</a><p className="text-xs text-muted-foreground">Your email app will open with a new support message.</p></div>
              )}
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;