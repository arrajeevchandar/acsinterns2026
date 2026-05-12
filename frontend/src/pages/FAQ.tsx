import React from 'react';
import Footer from '../components/Footer/Footer';
import ScrollProgress from '../components/ScrollProgress/ScrollProgress';
import { ZenithInline } from '../components/Zenith/ZenithInline';

const FAQ: React.FC = () => {
  return (
    <>
      <ScrollProgress />
      <main className="faq-page">
        <section className="faq-hero">
          <h1 className="faq-title">FAQs & AI Assistant</h1>
          <p className="faq-subtitle">
            Ask Zenith — your AI intern buddy — anything about ACS, the internship program, projects, mentors, or just say hi!
          </p>
        </section>

        <section className="faq-content">
          <div className="faq-chat-embed">
            <ZenithInline />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default FAQ;