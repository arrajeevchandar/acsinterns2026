import React from 'react';
import { ZenithProvider, useZenith } from '../context/ZenithContext';
import { ZenithChat } from '../components/Zenith/ZenithChat';
import Footer from '../components/Footer/Footer';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';

interface FAQCardDef {
  icon: string;
  title: string;
  description: string;
  query: string;
}

const FAQ_CARDS: FAQCardDef[] = [
  {
    icon: '🧭',
    title: 'First-week tips',
    description: 'Ask about surviving your first week, onboarding, and getting settled.',
    query: 'What are the best tips for surviving the first week as an intern?',
  },
  {
    icon: '🏥',
    title: 'Benefits & Insurance',
    description: 'Learn about your apprentice benefits, insurance, and perks.',
    query: 'Tell me about my insurance benefits as an apprentice',
  },
  {
    icon: '🎤',
    title: 'Demo Day Prep',
    description: 'Get tips on preparing for Demo Day and showcasing your project.',
    query: 'How should I prepare for Demo Day?',
  },
  {
    icon: '🏆',
    title: 'Past Projects',
    description: 'Explore award-winning projects from previous batches.',
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

          <p className="faq-cta-text">
            Tap the chat button in the bottom-right corner or click any card above to open Zenith and ask your questions!
          </p>
        </section>
      </main>
      <Footer />
      <ZenithChat />
    </ZenithProvider>
  );
};

export default FAQ;
