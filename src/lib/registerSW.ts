const h = window.location.hostname;
export const isPreviewHost =
  !import.meta.env.PROD ||
  h.startsWith('id-preview--') || h.startsWith('preview--') ||
  h === 'lovableproject.com' || h.endsWith('.lovableproject.com') ||
  h.endsWith('.lovableproject-dev.com') || h.endsWith('.beta.lovable.dev') ||
  h === 'localhost';

export async function setupServiceWorker() {
  if (!('serviceWorker' in navigator)) return;
  let inIframe = false;
  try { inIframe = window.self !== window.top; } catch { inIframe = true; }
  const off = new URLSearchParams(window.location.search).get('sw') === 'off';
  if (isPreviewHost || inIframe || off) {
    const regs = await navigator.serviceWorker.getRegistrations();
    await Promise.all(regs.filter(r => r.active?.scriptURL.endsWith('/sw.js') || r.installing || r.waiting).map(r => r.unregister()));
    return;
  }
  const { registerSW } = await import('virtual:pwa-register');
  const updateSW = registerSW({
    immediate: true,
    onNeedRefresh() { updateSW(true); },
    onRegisteredSW(_u, reg) { if (reg) setInterval(() => reg.update().catch(() => {}), 30 * 60 * 1000); },
  });
}
