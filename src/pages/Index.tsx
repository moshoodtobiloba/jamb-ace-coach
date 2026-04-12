import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Dashboard from '@/components/Dashboard';
import SyllabusTracker from '@/components/SyllabusTracker';
import CBTExam from '@/components/CBTExam';
import MistakeLog from '@/components/MistakeLog';
import TutorChat from '@/components/TutorChat';
import AskTutorPopup from '@/components/AskTutorPopup';
import InstallBanner from '@/components/InstallBanner';
import { InstallButton } from '@/components/InstallBanner';
import ContactForm from '@/components/ContactForm';
import FeedbackSurvey from '@/components/FeedbackSurvey';
import { useJambStore } from '@/hooks/useJambStore';
import { useAuth } from '@/contexts/AuthContext';
import { SYLLABUS } from '@/data/syllabus';
import ThemeSettings, { initTheme } from '@/components/ThemeSettings';

type Tab = 'dashboard' | 'syllabus' | 'cbt' | 'mistakes' | 'tutor';

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showTheme, setShowTheme] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const store = useJambStore();
  const { signOut, user } = useAuth();

  useEffect(() => { initTheme(); }, []);

  const isInExam = activeTab === 'cbt';
  const displayName = user?.user_metadata?.display_name || localStorage.getItem('jamb-guest-name') || 'Student';

  const navigateTo = (tab: Tab) => {
    setActiveTab(tab);
    setShowMenu(false);
  };

  const MENU_ITEMS: { id: Tab | string; label: string; icon: string; action?: () => void }[] = [
    { id: 'dashboard', label: 'HQ Dashboard', icon: '⚡' },
    { id: 'syllabus', label: 'AOC Syllabus', icon: '📋' },
    { id: 'cbt', label: 'CBT Practice', icon: '🖥️' },
    { id: 'tutor', label: 'AI Tutor', icon: '🤖' },
    { id: 'mistakes', label: 'Mistake Log', icon: '📝' },
    { id: 'theme', label: 'Theme & Display', icon: '🎨', action: () => { setShowTheme(true); setShowMenu(false); } },
    { id: 'contact', label: 'Contact / Help', icon: '📧', action: () => { setShowContact(true); setShowMenu(false); } },
    { id: 'rest', label: 'Rest Mode', icon: '😴', action: () => { store.toggleRestMode(); setShowMenu(false); } },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ThemeSettings isOpen={showTheme} onClose={() => setShowTheme(false)} />
      <AskTutorPopup disabled={isInExam} />
      <InstallBanner />
      <FeedbackSurvey />
      <ContactForm isOpen={showContact} onClose={() => setShowContact(false)} />

      {/* Top Bar */}
      {!store.restMode && (
        <header className="border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-40">
          <div className="flex items-center gap-2">
            <img src="/logo-192.png" alt="ACE" className="w-7 h-7" />
            <span className="text-sm font-black tracking-widest text-foreground">ACE COACH</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-lg px-2 py-1 border border-border rounded text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
            >
              ☰
            </button>
          </div>
        </header>
      )}

      {/* Full-screen Facebook-style Menu */}
      <AnimatePresence>
        {showMenu && !store.restMode && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-background overflow-y-auto"
            style={{ top: '52px' }}
          >
            <div className="p-4 max-w-2xl mx-auto">
              {/* Profile Header */}
              <div className="flex items-center gap-3 p-4 rounded-xl border border-border bg-card mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-xl">
                  {displayName.charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-bold text-foreground">{displayName}</p>
                  <p className="text-[10px] text-muted-foreground tracking-widest">JAMB 2026 CANDIDATE</p>
                </div>
              </div>

              {/* Grid Menu Items */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {MENU_ITEMS.map(item => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (item.action) {
                        item.action();
                      } else {
                        navigateTo(item.id as Tab);
                      }
                    }}
                    className={`flex flex-col items-start gap-2 p-4 rounded-xl border transition-all text-left ${
                      activeTab === item.id && !item.action
                        ? 'bg-primary/10 border-primary text-foreground'
                        : 'border-border bg-card hover:bg-muted text-foreground'
                    }`}
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-xs font-bold tracking-wider">{item.label}</span>
                  </button>
                ))}
              </div>

              {/* Sign Out - separate at bottom */}
              <button
                onClick={() => { signOut(); setShowMenu(false); }}
                className="w-full flex items-center gap-3 p-4 rounded-xl border border-border bg-card hover:bg-destructive/10 transition-colors"
              >
                <span className="text-2xl">🚪</span>
                <span className="text-xs font-bold tracking-wider text-destructive/70">Sign Out</span>
              </button>

              {/* Contact info */}
              <div className="mt-4 p-3 rounded-lg bg-muted/50 text-center">
                <p className="text-[10px] text-muted-foreground tracking-wider">Need help? Email us at</p>
                <p className="text-xs text-primary font-bold">moshoodabdulmujib9@gmail.com</p>
              </div>

              <div className="mt-3">
                <InstallButton />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-4 pb-8">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'dashboard' && (
            <>
              <Dashboard
                restMode={store.restMode}
                onToggleRest={store.toggleRestMode}
                streakDays={store.streakDays}
                masteredCount={store.topicsMasteredCount}
                totalTopics={SYLLABUS.length}
                revisionsDue={store.getRevisionsDue().length}
              />
              <div className="mt-6">
                <InstallButton />
              </div>
            </>
          )}
          {activeTab === 'syllabus' && (
            <SyllabusTracker
              mastered={store.mastered}
              onToggle={store.toggleMastered}
              onMarkRevised={store.markRevised}
              getRevisionsDue={store.getRevisionsDue}
            />
          )}
          {activeTab === 'cbt' && (
            <CBTExam
              onSessionComplete={store.addCBTSession}
              sessions={store.cbtSessions}
            />
          )}
          {activeTab === 'tutor' && <TutorChat />}
          {activeTab === 'mistakes' && (
            <MistakeLog
              mistakes={store.mistakes}
              onAdd={store.addMistake}
              onDelete={store.deleteMistake}
            />
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default Index;
