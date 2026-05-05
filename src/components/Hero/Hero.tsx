import React, { useEffect, useState } from 'react';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Hero.css';

interface HeroProps {
  contentReady?: boolean;
}

const Hero: React.FC<HeroProps> = ({ contentReady = false }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.1 });
  const [animatedIn, setAnimatedIn] = useState(false);

  useEffect(() => {
    if (!contentReady) return;
    const timer = window.setTimeout(() => setAnimatedIn(true), 160);
    return () => window.clearTimeout(timer);
  }, [contentReady]);

  const show = animatedIn || isVisible;

  const scrollTo = (selector: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.querySelector(selector)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero" id="hero" ref={ref}>
      <div className="hero__image" style={{ backgroundImage: `url(${process.env.PUBLIC_URL}/images/hero-bg.png)` }} />
      <div className="hero__shade" />
      <div className="hero__beam hero__beam--one" />
      <div className="hero__beam hero__beam--two" />
      <div className="hero__grain" />

      <div className="hero__orbit" aria-hidden="true">
        <span />
        <span />
        <span />
        <AdobeLogo size={210} color="rgba(255,255,255,0.12)" />
      </div>

      <div className={`hero__content ${show ? 'is-visible' : ''}`}>
        <p className="hero__eyebrow">
          <span />
          Adobe Cloud Services
        </p>

        <h1 className="hero__title">
          ACS Interns 2026
        </h1>

        <p className="hero__copy">
          People. Teams. Moments. One portal.
        </p>

        <div className="hero__actions">
          <a className="hero__button hero__button--primary" href="#teams" onClick={scrollTo('#teams')}>
            Explore teams
            <span aria-hidden="true">-&gt;</span>
          </a>
          <a className="hero__button hero__button--secondary" href="#gallery" onClick={scrollTo('#gallery')}>
            View moments
          </a>
        </div>
      </div>

      <aside className={`hero__dashboard ${show ? 'is-visible' : ''}`} aria-label="Internship overview">
        <div className="hero__dashboard-top">
          <span>Internship pulse</span>
          <strong>Week 01</strong>
        </div>

        <div className="hero__metric">
          <strong>30+</strong>
          <span>interns across ACS</span>
        </div>

        <div className="hero__team-strip">
          {['Onboarding', 'Teams', 'Mentors', 'Moments'].map((team) => (
            <span key={team}>{team}</span>
          ))}
        </div>

        <div className="hero__timeline">
          <span className="is-live" />
          <span />
          <span />
          <span />
        </div>
      </aside>

      <div className="hero__footerline">
        <span>Home / Gallery / Teams / FAQs</span>
        <span>Summer internship 2026</span>
      </div>
    </section>
  );
};

export default Hero;
