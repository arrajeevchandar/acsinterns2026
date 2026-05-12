import React, { useState, useRef, useEffect } from 'react';
import { useZenith } from '../../context/ZenithContext';
import { Send, Trash2, Sparkles, ChevronDown, Bot, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import './ZenithInline.css';

export const ZenithInline: React.FC = () => {
  const { messages, isLoading, isOpen, suggestions, sendMessage, clearChat, openChat, closeChat } = useZenith();
  const [input, setInput] = useState('');
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  /* ── Auto-scroll ───────────────────────────────────────── */
  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
      if (isNearBottom) el.scrollTop = el.scrollHeight;
    }
  }, [messages, isLoading]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const handler = () => {
      setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 200);
    };
    el.addEventListener('scroll', handler);
    return () => el.removeEventListener('scroll', handler);
  }, []);


  /* ── Send handler ──────────────────────────────────────── */
  const handleSend = () => {
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage(text);
    setInput('');
    if (inputRef.current) inputRef.current.style.height = 'auto';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /* ── Auto-resize textarea ──────────────────────────────── */
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    const ta = e.target;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 150) + 'px';
  };

  const scrollToBottom = () => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  };

  const showSuggestions = messages.length <= 1 && !isLoading;

  return (
    <motion.div
      className="zenith-inline-panel"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* ── Header ──────────────────────────────────── */}
      <header className="zenith-inline-header">
        <div className="zenith-header-left">
          <div className="zenith-avatar">
            <Sparkles size={20} />
          </div>
          <div>
            <h2 className="zenith-title">Zenith</h2>
            <p className="zenith-subtitle">
              {isLoading ? (
                <span className="zenith-typing">
                  <span>Thinking</span>
                  <span className="dot" />
                  <span className="dot" />
                  <span className="dot" />
                </span>
              ) : (
                'Your AI Intern Buddy — ask me anything!'
              )}
            </p>
          </div>
        </div>
        <div className="zenith-header-actions">
          <button onClick={clearChat} className="zenith-btn-icon" title="Clear chat">
            <Trash2 size={15} />
          </button>
        </div>
      </header>

      {/* ── Messages ────────────────────────────────── */}
      <div className="zenith-messages" ref={scrollRef}>
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
              className={`zenith-msg zenith-msg-${msg.role}`}
            >
              <div className="zenith-msg-icon">
                {msg.role === 'assistant' ? (
                  <div className="zenith-msg-avatar-ai"><Bot size={14} /></div>
                ) : (
                  <div className="zenith-msg-avatar-user"><User size={14} /></div>
                )}
              </div>
              <div className="zenith-msg-body">
                <div className="zenith-msg-content">
                  <ReactMarkdown>{msg.content}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="zenith-msg zenith-msg-assistant"
            >
              <div className="zenith-msg-icon">
                <div className="zenith-msg-avatar-ai thinking"><Bot size={14} /></div>
              </div>
              <div className="zenith-msg-body">
                <div className="zenith-thinking-indicator">
                  <span /><span /><span />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggestion Chips */}
        {showSuggestions && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="zenith-suggestions"
          >
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  className="zenith-suggestion-chip"
                  onClick={() => sendMessage(s.query)}
                >
                  <span className="zenith-chip-icon">{s.icon}</span>
                  <span>{s.label}</span>
                </button>
              ))}
          </motion.div>
        )}
      </div>

      {/* Scroll-to-bottom button */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            onClick={scrollToBottom}
            className="zenith-scroll-btn"
          >
            <ChevronDown size={16} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* ── Input ───────────────────────────────────── */}
      <div className="zenith-input-area">
        <div className="zenith-input-wrap">
          <textarea
            ref={inputRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask Zenith anything..."
            rows={1}
            className="zenith-input"
            id="zenith-inline-input"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="zenith-send-btn"
            id="zenith-inline-send"
          >
            <Send size={16} />
          </button>
        </div>
        <p className="zenith-disclaimer">
          Zenith is your AI intern buddy. Always verify critical info with your mentor.
        </p>
      </div>
    </motion.div>
  );
};