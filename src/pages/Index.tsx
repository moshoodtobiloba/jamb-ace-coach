import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Dashboard from '@/components/Dashboard';
import SyllabusTracker from '@/components/SyllabusTracker';
import CBTExam from '@/components/CBTExam';
import MistakeLog from '@/components/MistakeLog';
import TutorChat from '@/components/TutorChat';
import AskTutorPopup from '@/components/AskTutorPopup';
import InstallBanner from '@/components/InstallBanner';
import { InstallButton } from '@/components/InstallBanner';
import { useJambStore } from '@/hooks/useJambStore';
import { useAuth } from '@/contexts/AuthContext';
import { SYLLABUS } from '@/data/syllabus';
import ThemeSettings, { initTheme } from '@/components/ThemeSettings';

type Tab = 'dashboard' | 'syllabus' | 'cbt' | 'mistakes' | 'tutor';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'dashboard', label: 'HQ', icon: '⚡' },
  { id: 'syllabus', label: 'AOC', icon: '📋' },
  { id: 'cbt', label: 'CBT', icon: '🖥️' },
  { id: 'tutor', label: 'TUTOR', icon: '🤖' },
  { id: 'mistakes', label: 'LOG', icon: '📝' },
];

const Index = () => {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [showTheme, setShowTheme] = useState(false);
  const store = useJambStore();
  const { signOut, user } = useAuth();

  useEffect(() => { initTheme(); }, []);

  const isInExam = activeTab === 'cbt';

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Theme Settings */}
      <ThemeSettings isOpen={showTheme} onClose={() => setShowTheme(false)} />
      
      {/* Ask Tutor on text selection (disabled during CBT) */}
      <AskTutorPopup disabled={isInExam} />
      
      {/* Install Banner */}
      <InstallBanner />

      {/* Top Bar */}
      {!store.restMode && (
        <header className="border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-40">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <span className="text-sm font-black tracking-widest text-foreground">JAMB MACHINE</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowTheme(true)}
              className="text-xs px-3 py-1 border border-border rounded text-muted-foreground hover:text-foreground hover:border-foreground transition-colors tracking-wider"
            >
              🎨
            </button>
            <button
              onClick={store.toggleRestMode}
              className="text-xs px-3 py-1 border border-border rounded text-muted-foreground hover:text-foreground hover:border-foreground transition-colors tracking-wider"
            >
              😴 REST
            </button>
            <button
              onClick={signOut}
              className="text-xs px-3 py-1 border border-destructive/30 rounded text-destructive/70 hover:text-destructive hover:border-destructive transition-colors tracking-wider"
            >
              EXIT
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className="max-w-2xl mx-auto p-4 pb-24">
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
              {/* Install button in HQ */}
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

      {/* Bottom Navigation */}
      {!store.restMode && (
        <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur border-t border-border z-40">
          <div className="max-w-2xl mx-auto flex">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-3 flex flex-col items-center gap-1 transition-colors ${
                  activeTab === tab.id
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-[10px] font-bold tracking-widest">{tab.label}</span>
                {activeTab === tab.id && (
                  <motion.div layoutId="nav-indicator" className="w-6 h-0.5 bg-primary rounded-full" />
                )}
              </button>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Index;
