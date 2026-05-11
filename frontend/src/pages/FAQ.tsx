import React, { useState } from 'react';
import { ZenithProvider, useZenith } from '../context/ZenithContext';
import { ZenithChat } from '../components/Zenith/ZenithChat';
import Footer from '../components/Footer/Footer';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import { Compass, Presentation, Award, Send } from 'lucide-react';

interface FAQCardDef {
  icon: React.ReactNode;
  title: string;
  description: string;
  query: string;
}

const FAQ_CARDS: FAQCardDef[] = [
  {
    icon: <Compass size={32} />,
    title: 'First-week tips',
    description: 'Surviving your first week, onboarding, and getting settled.',
    query: 'What are the best tips for surviving the first week as an intern?',
  },
  {
    icon: <Presentation size={32} />,
    title: 'Demo Day Prep',
    description: 'Tips on preparing for Demo Day and showcasing your project.',
    query: 'How should I prepare for Demo Day?',
  },
  {
    icon: <Award size={32} />,
    title: 'Past Projects',
    description: 'Award-winning projects from previous batches.',
    query: 'Show me the award-winning projects from last year',
  },
];

const FAQCard: React.FC<FAQCardDef> = ({ icon, title, description, query }) => {
  const { openChat, sendMessage } = useZenith();

  const handleClick = () => {
    openChat();
    setTimeout(() => sendMessage(query), 400);
  };

  return (
    <button className="faq-card" onClick={handleClick} type="button">
      <span className="faq-card-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </button>
  );
};

const FAQCustomInput: React.FC = () => {
  const { openChat, sendMessage } = useZenith();
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = query.trim();
    if (!text) return;
    openChat();
    setTimeout(() => sendMessage(text), 400);
    setQuery('');
  };

  return (
    <form className="faq-custom-input" onSubmit={handleSubmit}>
      <div className="faq-custom-input-wrap">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ask me anything"
          className="faq-custom-input-field"
        />
        <button type="submit" className="faq-custom-send-btn" aria-label="Send">
          <Send size={16} />
        </button>
      </div>
    </form>
  );
};

const FAQ: React.FC = () => {
  return (
    <ZenithProvider>
      <ScrollProgress />
      <main className="faq-page">
        <section className="faq-hero">
          <h1 className="faq-title">FAQs & AI Assistant</h1>
          <p className="faq-subtitle">
            Ask Zenith — your AI intern buddy — anything about ACS, the internship program, projects, mentors, or just say hi!
          </p>
        </section>

        <section className="faq-content">
          <div className="faq-info-cards">
            {FAQ_CARDS.map((card) => (
              <FAQCard key={card.title} {...card} />
            ))}
          </div>

          <FAQCustomInput />

          <p className="faq-cta-text">
            Or tap the chat bubble in the bottom-right corner to chat with Zenith directly.
          </p>
        </section>
      </main>
      <Footer />
      <ZenithChat />
    </ZenithProvider>
  );
};

export default FAQ;
