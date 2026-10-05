import { useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

declare const __BUILD_ID__: string;

async function hardRefresh() {
  try {
    if ('serviceWorker' in navigator) {
      const regs = await navigator.serviceWorker.getRegistrations();
      await Promise.all(regs.map(r => r.update().catch(() => {})));
      await Promise.all(regs.map(r => r.unregister()));
    }
    if ('caches' in window) {
      const keys = await caches.keys();
      await Promise.all(keys.filter(k => !k.includes('fonts')).map(k => caches.delete(k)));
    }
  } catch {}
  window.location.reload();
}

export default function UpdateNotice() {
  const [latest, setLatest] = useState<string | null>(null);
  useEffect(() => {
    if (!import.meta.env.PROD) return;
    const check = async () => {
      if (!navigator.onLine) return;
      try {
        const res = await fetch(`/version.json?t=${Date.now()}`, { cache: 'no-store' });
        if (!res.ok) return;
        const { id } = await res.json();
        if (id && id !== __BUILD_ID__) setLatest(id);
      } catch {}
    };
    check();
    const t = setInterval(check, 5 * 60 * 1000);
    const vis = () => document.visibilityState === 'visible' && check();
    document.addEventListener('visibilitychange', vis);
    window.addEventListener('online', check);
    return () => { clearInterval(t); document.removeEventListener('visibilitychange', vis); window.removeEventListener('online', check); };
  }, []);
  if (!latest) return null;
  return (
    <div className="fixed inset-x-0 top-0 z-[100] flex items-center justify-between gap-3 bg-primary px-4 py-3 text-sm text-primary-foreground shadow-lg">
      <span>A new version of EXAMGUIDE is ready. Keep your data on and tap Update.</span>
      <button onClick={hardRefresh} className="flex shrink-0 items-center gap-2 border border-primary-foreground/60 px-3 py-1.5 font-semibold"><RefreshCw className="size-4" /> Update</button>
    </div>
  );
}
