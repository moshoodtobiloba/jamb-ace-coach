import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function InstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShowBanner(true);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => { setInstalled(true); setShowBanner(false); });
    
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setInstalled(true);
    }
    
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  if (installed) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-20 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 bg-card border border-primary/30 rounded-lg p-4 shadow-2xl border-glow"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">📱</span>
            <div className="flex-1">
              <p className="text-sm font-bold text-foreground tracking-wider">INSTALL EXAMGUIDE</p>
              <p className="text-xs text-muted-foreground mt-1">Access offline. No browser needed. Like a real app.</p>
            </div>
            <button onClick={() => setShowBanner(false)} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
          </div>
          <button
            onClick={handleInstall}
            className="w-full mt-3 py-2.5 bg-primary text-primary-foreground rounded font-bold text-xs tracking-wider hover:bg-primary/80 transition-colors"
          >
            ⚡ INSTALL NOW
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Standalone button for HQ tab
export function InstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    if (window.matchMedia('(display-mode: standalone)').matches) setInstalled(true);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setDeferredPrompt(null);
  };

  if (installed) {
    return (
      <div className="border border-primary/30 rounded p-4 text-center">
        <p className="text-xs text-primary font-bold tracking-wider">✓ APP INSTALLED</p>
      </div>
    );
  }

  return (
    <button
      onClick={handleInstall}
      disabled={!deferredPrompt}
      className="w-full py-3 border border-border rounded text-xs font-bold tracking-wider text-foreground hover:border-primary hover:text-primary transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
    >
      📱 DOWNLOAD APP {!deferredPrompt && '(Open in browser)'}
    </button>
  );
}
