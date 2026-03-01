import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface Conversation {
  id: string;
  title: string;
  created_at: string;
}

export default function TutorChat() {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConvId, setActiveConvId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Load conversations
  useEffect(() => {
    if (!user) return;
    supabase
      .from('tutor_conversations')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .then(({ data }) => {
        if (data) setConversations(data);
      });
  }, [user]);

  // Load messages for active conversation
  useEffect(() => {
    if (!activeConvId || !user) return;
    supabase
      .from('tutor_messages')
      .select('*')
      .eq('conversation_id', activeConvId)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        if (data) setMessages(data.map(m => ({ role: m.role as 'user' | 'assistant', content: m.content })));
      });
  }, [activeConvId, user]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const createConversation = async () => {
    if (!user) return null;
    const { data, error } = await supabase
      .from('tutor_conversations')
      .insert({ user_id: user.id, title: 'New Chat' })
      .select()
      .single();
    if (error || !data) return null;
    setConversations(prev => [data, ...prev]);
    setActiveConvId(data.id);
    setMessages([]);
    return data.id;
  };

  const saveMessage = async (convId: string, role: string, content: string) => {
    if (!user) return;
    await supabase.from('tutor_messages').insert({
      conversation_id: convId,
      user_id: user.id,
      role,
      content,
    });
  };

  const send = useCallback(async (text?: string) => {
    const messageText = text || input.trim();
    if (!messageText || isLoading || !user) return;
    setInput('');

    let convId = activeConvId;
    if (!convId) {
      convId = await createConversation();
      if (!convId) return;
    }

    const userMsg: Message = { role: 'user', content: messageText };
    setMessages(prev => [...prev, userMsg]);
    await saveMessage(convId, 'user', messageText);
    setIsLoading(true);

    // Update conversation title from first message
    if (messages.length === 0) {
      const title = messageText.slice(0, 50) + (messageText.length > 50 ? '...' : '');
      await supabase.from('tutor_conversations').update({ title }).eq('id', convId);
      setConversations(prev => prev.map(c => c.id === convId ? { ...c, title } : c));
    }

    try {
      const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/tutor-chat`;
      const resp = await fetch(CHAT_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!resp.ok || !resp.body) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData.error || 'Failed to connect to tutor');
      }

      const reader = resp.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = '';
      let assistantSoFar = '';

      const upsertAssistant = (chunk: string) => {
        assistantSoFar += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last?.role === 'assistant') {
            return prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantSoFar } : m);
          }
          return [...prev, { role: 'assistant', content: assistantSoFar }];
        });
      };

      let streamDone = false;
      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf('\n')) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);
          if (line.endsWith('\r')) line = line.slice(0, -1);
          if (line.startsWith(':') || line.trim() === '') continue;
          if (!line.startsWith('data: ')) continue;
          const jsonStr = line.slice(6).trim();
          if (jsonStr === '[DONE]') { streamDone = true; break; }
          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content;
            if (content) upsertAssistant(content);
          } catch {
            textBuffer = line + '\n' + textBuffer;
            break;
          }
        }
      }

      // Save assistant message
      if (assistantSoFar) {
        await saveMessage(convId, 'assistant', assistantSoFar);
      }
    } catch (e: any) {
      console.error(e);
      setMessages(prev => [...prev, { role: 'assistant', content: `⚠️ ${e.message || 'Connection error. Try again.'}` }]);
    } finally {
      setIsLoading(false);
    }
  }, [input, isLoading, user, activeConvId, messages]);

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h2 className="text-xl font-black tracking-wider glow-green">🤖 MACHINE TUTOR</h2>
          <p className="text-[10px] text-muted-foreground tracking-widest">YOUR STUDY COMPANION • NOT AN AI • A WARRIOR</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setShowSidebar(!showSidebar)}
            className="px-3 py-1.5 bg-muted rounded text-xs font-bold tracking-wider text-muted-foreground hover:text-foreground transition-colors"
          >
            💬 CHATS
          </button>
          <button
            onClick={() => { setActiveConvId(null); setMessages([]); }}
            className="px-3 py-1.5 bg-primary/20 text-primary rounded text-xs font-bold tracking-wider hover:bg-primary/30 transition-colors"
          >
            + NEW
          </button>
        </div>
      </div>

      {/* Conversation sidebar */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-3"
          >
            <div className="border border-border rounded p-3 max-h-40 overflow-y-auto space-y-1">
              {conversations.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-2">No conversations yet. Start chatting!</p>
              )}
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => { setActiveConvId(conv.id); setShowSidebar(false); }}
                  className={`w-full text-left px-3 py-2 rounded text-xs truncate transition-colors ${
                    activeConvId === conv.id ? 'bg-primary/20 text-primary' : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {conv.title}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-1 mb-3">
        {messages.length === 0 && (
          <div className="text-center py-12 space-y-4">
            <span className="text-4xl">🤖</span>
            <p className="text-sm text-muted-foreground">Machine is ready. Ask me anything about JAMB.</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Explain Quadratic Equations', 'Summarize The Lekki Headmaster', 'Tips for Oral English', 'Solve: ∫2x dx'].map(q => (
                <button
                  key={q}
                  onClick={() => send(q)}
                  className="px-3 py-2 bg-muted rounded text-xs text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[85%] rounded-lg px-4 py-3 text-sm ${
              msg.role === 'user'
                ? 'bg-primary/20 text-foreground'
                : 'bg-muted text-foreground'
            }`}>
              {msg.role === 'assistant' ? (
                <div className="prose prose-sm prose-invert max-w-none [&_p]:my-1 [&_li]:my-0.5 [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_code]:bg-background/50 [&_code]:px-1 [&_code]:rounded">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              ) : (
                <p>{msg.content}</p>
              )}
            </div>
          </motion.div>
        ))}
        {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
          <div className="flex justify-start">
            <div className="bg-muted rounded-lg px-4 py-3">
              <span className="text-sm text-muted-foreground animate-pulse">Machine is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
          placeholder="Ask Machine anything about JAMB..."
          className="flex-1 bg-muted border border-border rounded px-4 py-3 text-sm text-foreground focus:border-primary focus:outline-none transition-colors"
        />
        <button
          onClick={() => send()}
          disabled={!input.trim() || isLoading}
          className="px-5 py-3 bg-primary text-primary-foreground rounded font-bold text-sm tracking-wider hover:bg-primary/80 transition-colors disabled:opacity-50"
        >
          ⚡
        </button>
      </div>
    </div>
  );
}
