import React from 'react';
import { ZenithProvider } from '../context/ZenithContext';
import { ZenithChat } from '../components/Zenith/ZenithChat';
import Footer from '../components/Footer/Footer';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';

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
            <div className="faq-card">
              <div className="faq-card-icon">🧭</div>
              <h3>First-week tips</h3>
              <p>Ask about surviving your first week, onboarding, and getting settled.</p>
            </div>
            <div className="faq-card">
              <div className="faq-card-icon">🏥</div>
              <h3>Benefits & Insurance</h3>
              <p>Learn about your apprentice benefits, insurance, and perks.</p>
            </div>
            <div className="faq-card">
              <div className="faq-card-icon">🎤</div>
              <h3>Demo Day Prep</h3>
              <p>Get tips on preparing for Demo Day and showcasing your project.</p>
            </div>
            <div className="faq-card">
              <div className="faq-card-icon">🏆</div>
              <h3>Past Projects</h3>
              <p>Explore award-winning projects from previous batches.</p>
            </div>
          </div>

          <p className="faq-cta-text">
            Tap the chat button in the bottom-right corner or click below to open Zenith and ask your questions!
          </p>
        </section>
      </main>
      <Footer />
      <ZenithChat />
    </ZenithProvider>
  );
};

export default FAQ;