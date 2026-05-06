import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

/* ── Types ────────────────────────────────────────────────── */
export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface Suggestion {
  label: string;
  query: string;
  icon: string;
}

interface ZenithCtx {
  messages: Message[];
  isLoading: boolean;
  isOpen: boolean;
  suggestions: Suggestion[];
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
}

const SUGGESTIONS: Suggestion[] = [
  { label: 'First-week survival tips', query: 'What are the best tips for surviving the first week as an intern?', icon: '🧭' },
  { label: 'Insurance & benefits', query: 'Tell me about my insurance benefits as an apprentice', icon: '🏥' },
  { label: 'Demo Day prep', query: 'How should I prepare for Demo Day?', icon: '🎤' },
  { label: 'Best projects from 2025', query: 'Show me the award-winning projects from last year', icon: '🏆' },
  { label: 'Office & culture tips', query: 'What should I know about the Adobe Bengaluru office culture?', icon: '🏢' },
  { label: 'Who are the mentors?', query: 'Tell me about the mentors in the ACS program', icon: '👥' },
];

const WELCOME_MSG: Message = {
  id: 'welcome',
  role: 'assistant',
  content: "Hey! 👋 I'm **Zenith** — think of me as the senior intern who's been through it all.\n\nI know the ropes at ACS — the tips, the projects, the mentors, Demo Day, office hacks, benefits, everything.\n\nAsk me anything about the program, your first week, or just say hi!",
  timestamp: Date.now(),
};

const ZenithContext = createContext<ZenithCtx | undefined>(undefined);

const API_URL = 'http://localhost:8000';

/* ── Provider ─────────────────────────────────────────────── */
export const ZenithProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('zenith_history');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [WELCOME_MSG];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Persist chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('zenith_history', JSON.stringify(messages.slice(-100)));
    }
  }, [messages]);

  // Lock body scroll when chat is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const sendMessage = useCallback(async (text: string) => {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: messages.slice(-20).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      const assistantMsg: Message = {
        id: `a-${Date.now()}`,
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, assistantMsg]);
    } catch {
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: "Hmm, I'm having trouble connecting right now. Make sure the backend is running on `localhost:8000` and try again!",
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearChat = useCallback(() => {
    localStorage.removeItem('zenith_history');
    setMessages([{ ...WELCOME_MSG, id: `welcome-${Date.now()}`, timestamp: Date.now() }]);
  }, []);

  const openChat = useCallback(() => setIsOpen(true), []);
  const closeChat = useCallback(() => setIsOpen(false), []);
  const toggleChat = useCallback(() => setIsOpen(prev => !prev), []);

  return (
    <ZenithContext.Provider value={{
      messages, isLoading, isOpen, suggestions: SUGGESTIONS,
      sendMessage, clearChat, openChat, closeChat, toggleChat,
    }}>
      {children}
    </ZenithContext.Provider>
  );
};

export const useZenith = () => {
  const ctx = useContext(ZenithContext);
  if (!ctx) throw new Error('useZenith must be inside ZenithProvider');
  return ctx;
};
