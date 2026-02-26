import { useState, useEffect, useCallback } from 'react';

interface MasteredTopic {
  topicId: string;
  masteredAt: number;
  revisionDue: number;
  revised: boolean;
}

interface MistakeEntry {
  id: string;
  date: string;
  subject: string;
  question: string;
  createdAt: number;
}

interface CBTSession {
  id: string;
  date: string;
  duration: number;
  score?: number;
  total?: number;
  type: 'daily' | 'general';
}

interface JambState {
  mastered: MasteredTopic[];
  mistakes: MistakeEntry[];
  cbtSessions: CBTSession[];
  restMode: boolean;
  streakDays: number;
  lastActiveDate: string;
}

const STORAGE_KEY = 'jamb-mastery-machine';

function getInitialState(): JambState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return {
    mastered: [],
    mistakes: [],
    cbtSessions: [],
    restMode: false,
    streakDays: 0,
    lastActiveDate: '',
  };
}

export function useJambStore() {
  const [state, setState] = useState<JambState>(getInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Update streak on load
  useEffect(() => {
    const today = new Date().toDateString();
    if (state.lastActiveDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isConsecutive = state.lastActiveDate === yesterday.toDateString();
      setState(s => ({
        ...s,
        lastActiveDate: today,
        streakDays: isConsecutive ? s.streakDays + 1 : 1,
      }));
    }
  }, []);

  const toggleMastered = useCallback((topicId: string) => {
    setState(s => {
      const existing = s.mastered.find(m => m.topicId === topicId);
      if (existing) {
        return { ...s, mastered: s.mastered.filter(m => m.topicId !== topicId) };
      }
      const now = Date.now();
      return {
        ...s,
        mastered: [...s.mastered, {
          topicId,
          masteredAt: now,
          revisionDue: now + 3 * 24 * 60 * 60 * 1000,
          revised: false,
        }],
      };
    });
  }, []);

  const markRevised = useCallback((topicId: string) => {
    setState(s => ({
      ...s,
      mastered: s.mastered.map(m =>
        m.topicId === topicId ? { ...m, revised: true } : m
      ),
    }));
  }, []);

  const addMistake = useCallback((subject: string, question: string) => {
    setState(s => ({
      ...s,
      mistakes: [...s.mistakes, {
        id: crypto.randomUUID(),
        date: new Date().toDateString(),
        subject,
        question,
        createdAt: Date.now(),
      }],
    }));
  }, []);

  const deleteMistake = useCallback((id: string) => {
    setState(s => ({
      ...s,
      mistakes: s.mistakes.filter(m => m.id !== id),
    }));
  }, []);

  const addCBTSession = useCallback((session: Omit<CBTSession, 'id'>) => {
    setState(s => ({
      ...s,
      cbtSessions: [...s.cbtSessions, { ...session, id: crypto.randomUUID() }],
    }));
  }, []);

  const toggleRestMode = useCallback(() => {
    setState(s => ({ ...s, restMode: !s.restMode }));
  }, []);

  const getRevisionsDue = useCallback(() => {
    const now = Date.now();
    return state.mastered.filter(m => !m.revised && m.revisionDue <= now);
  }, [state.mastered]);

  const topicsMasteredCount = state.mastered.length;

  return {
    ...state,
    toggleMastered,
    markRevised,
    addMistake,
    deleteMistake,
    addCBTSession,
    toggleRestMode,
    getRevisionsDue,
    topicsMasteredCount,
  };
}
