self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/';
  const tab = new URL(url, self.location.origin).searchParams.get('tab');
  event.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) {
      if (new URL(c.url).origin === self.location.origin) {
        await c.focus();
        c.postMessage({ type: 'open-tab', tab });
        return;
      }
    }
    await self.clients.openWindow(url);
  })());
});
