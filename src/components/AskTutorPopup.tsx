import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MathMarkdown from '@/components/MathMarkdown';

interface AskTutorPopupProps {
  disabled?: boolean; // true during CBT exams
}

export default function AskTutorPopup({ disabled = false }: AskTutorPopupProps) {
  const [selectedText, setSelectedText] = useState('');
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [showButton, setShowButton] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSelection = () => {
      if (disabled) return;
      const selection = window.getSelection();
      const text = selection?.toString().trim();
      if (text && text.length > 2) {
        const range = selection!.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setSelectedText(text);
        setPosition({ x: rect.left + rect.width / 2, y: rect.top - 10 });
        setShowButton(true);
      } else {
        // Delay hiding to allow button click
        setTimeout(() => {
          if (!showChat) setShowButton(false);
        }, 200);
      }
    };

    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleSelection);
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleSelection);
    };
  }, [disabled, showChat]);

  const askTutor = async () => {
    setShowButton(false);
    setShowChat(true);
    setLoading(true);
    setResponse('');

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tutor-chat`;
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({
          userName: localStorage.getItem('jamb-student-name') || '',
          messages: [{ role: 'user', content: `Explain this clearly and concisely for UTME 2027 preparation: "${selectedText}"` }],
        }),
      });

      if (!resp.ok || !resp.body) throw new Error('Failed');

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let idx: number;
        while ((idx = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, idx);
          textBuffer = textBuffer.slice(idx + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (!line.startsWith('data: ') || line.trim() === '' || line.startsWith(':')) continue;
          const json = line.slice(6).trim();
          if (json === '[DONE]') break;
          try {
            const p = JSON.parse(json);
            const c = p.choices?.[0]?.delta?.content;
            if (c) { full += c; setResponse(full); }
          } catch { break; }
        }
      }
    } catch {
      setResponse('⚠️ Could not reach the tutor — check your internet. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (disabled) return null;

  return (
    <>
      {/* Floating "Ask Tutor" button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            onClick={askTutor}
            style={{ position: 'fixed', left: Math.min(position.x - 50, window.innerWidth - 120), top: Math.max(position.y - 40, 10), zIndex: 100 }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-bold tracking-wider shadow-lg hover:bg-primary/80 transition-colors"
          >
            Ask tutor
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating response */}
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            ref={popupRef}
            className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:w-96 z-[100] bg-card border border-border rounded-lg shadow-2xl max-h-80 flex flex-col"
          >
            <div className="flex items-center justify-between px-4 py-2 border-b border-border">
              <span className="text-xs font-bold tracking-widest text-primary">TUTOR</span>
              <button onClick={() => { setShowChat(false); setResponse(''); }} className="text-muted-foreground hover:text-foreground text-xs">✕</button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {loading && !response && <span className="text-sm text-muted-foreground animate-pulse">Thinking...</span>}
              {response && (
                <MathMarkdown className="prose prose-sm dark:prose-invert prose-neutral max-w-none text-sm [&_p]:my-1">
                  {response}
                </MathMarkdown>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
