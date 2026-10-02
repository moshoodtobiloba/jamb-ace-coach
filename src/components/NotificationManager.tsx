import { useEffect, useCallback } from 'react';

const NOTIF_PERMISSION_KEY = 'jamb-notif-asked';

interface ScheduleBlock {
  time: string;
  label: string;
  description: string;
}

function getCustomSchedule(): ScheduleBlock[] | null {
  try {
    const stored = localStorage.getItem('jamb-custom-timetable');
    if (stored) return JSON.parse(stored);
  } catch {}
  return null;
}

function parseTime(timeStr: string): { hour: number; minute: number } {
  const [start] = timeStr.split('-');
  const [h, m] = start.split(':').map(Number);
  return { hour: h, minute: m };
}

export async function requestNotificationPermission() {
  if (!('Notification' in window)) return;
  if (Notification.permission === 'default') {
    await Notification.requestPermission();
  }
}

async function showReminder(title: string, body: string, tag: string) {
  const opts = { body, icon: '/logo-192.png', badge: '/logo-192.png', tag } as NotificationOptions;
  try {
    const reg = 'serviceWorker' in navigator ? await navigator.serviceWorker.getRegistration() : undefined;
    if (reg) { await reg.showNotification(title, opts); return; }
  } catch {}
  try { new Notification(title, opts); } catch {}
}

export function useScheduleNotifications(schedule: ScheduleBlock[]) {
  const checkAndNotify = useCallback(() => {
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    
    const customSchedule = getCustomSchedule() || schedule;
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    for (const block of customSchedule) {
      const { hour, minute } = parseTime(block.time);
      const blockMinutes = hour * 60 + minute;
      
      // Notify if we're within 1 minute of the block start
      if (Math.abs(currentMinutes - blockMinutes) <= 1) {
        const notifKey = `jamb-notif-${now.toDateString()}-${block.time}`;
        if (!localStorage.getItem(notifKey)) {
          localStorage.setItem(notifKey, 'true');
          showReminder('EXAMGUIDE · time to study', `${block.label}: ${block.description}`, block.time);
        }
      }
    }
  }, [schedule]);

  useEffect(() => {
    // Ask permission after a delay
    const asked = localStorage.getItem(NOTIF_PERMISSION_KEY);
    if (!asked) {
      setTimeout(() => {
        requestNotificationPermission();
        localStorage.setItem(NOTIF_PERMISSION_KEY, 'true');
      }, 10000);
    }

    // Check every 30 seconds
    const interval = setInterval(checkAndNotify, 30000);
    checkAndNotify();
    return () => clearInterval(interval);
  }, [checkAndNotify]);
}

export default function NotificationManager({ schedule }: { schedule: ScheduleBlock[] }) {
  useScheduleNotifications(schedule);
  return null;
}
