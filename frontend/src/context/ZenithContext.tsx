import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import { Compass, Presentation, Award, Building2, Users } from 'lucide-react';

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
  icon: React.ReactNode;
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
  { label: 'First-week tips', query: 'What are the best tips for surviving the first week as an intern?', icon: <Compass size={18} /> },
  { label: 'Demo Day prep', query: 'How should I prepare for Demo Day?', icon: <Presentation size={18} /> },
  { label: 'Past projects', query: 'Show me the award-winning projects from last year', icon: <Award size={18} /> },
  { label: 'Office culture', query: 'What should I know about the Adobe Bengaluru office culture?', icon: <Building2 size={18} /> },
  { label: 'Meet the mentors', query: 'Tell me about the mentors in the ACS program', icon: <Users size={18} /> },
];

const WELCOME_CONTENT = "👋 Hi there! I'm **Zenith**, your Adobe ACS Intern companion. I'm here to answer questions about the internship, the portal, events, mentors, or anything else you're curious about. What can I help you with today?";

const ZenithContext = createContext<ZenithCtx | undefined>(undefined);

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8000').replace(/\/$/, '');

/* ── Provider ─────────────────────────────────────────────── */
export const ZenithProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const saved = localStorage.getItem('zenith_history');
    if (saved) {
      try { return JSON.parse(saved); } catch { /* ignore */ }
    }
    return [{
      id: 'welcome',
      role: 'assistant' as const,
      content: WELCOME_CONTENT,
      timestamp: Date.now(),
    }];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Ref to track current messages for the sendMessage callback (avoids stale closure)
  const messagesRef = useRef(messages);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  // Persist chat history
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem('zenith_history', JSON.stringify(messages.slice(-100)));
    }
  }, [messages]);



  const sendMessage = useCallback(async (text: string) => {
    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    // Build history from the ref (which now includes the just-added user message via a small delay)
    // We use messagesRef.current which gets updated by the useEffect above
    const currentHistory = [...messagesRef.current.slice(-19), userMsg].map(m => ({
      role: m.role,
      content: m.content,
    }));

    try {
      const res = await fetch(`${API_URL}/api/agent/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: currentHistory,
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
    } catch (error) {
      const detail = error instanceof Error ? ` (${error.message})` : '';
      setMessages(prev => [...prev, {
        id: `err-${Date.now()}`,
        role: 'assistant',
        content: `Hmm, I'm having trouble connecting right now. I tried the backend at \`${API_URL}\`${detail}.`,
        timestamp: Date.now(),
      }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const clearChat = useCallback(() => {
    localStorage.removeItem('zenith_history');
    setMessages([{
      id: `welcome-${Date.now()}`,
      role: 'assistant',
      content: WELCOME_CONTENT,
      timestamp: Date.now(),
    }]);
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
