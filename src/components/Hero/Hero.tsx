import React from 'react';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Hero.css';

interface HeroProps {
  contentReady?: boolean;
}

const Hero: React.FC<HeroProps> = ({ contentReady = true }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
  const show = contentReady || isVisible;

  return (
    <section className="hero" id="hero" ref={ref}>
      {/* Dot grid background */}
      <div className="hero__grid-pattern" />

      {/* Floating decorative blobs */}
      <div className="hero__float-element" />
      <div className="hero__float-element" />
      <div className="hero__float-element" />

      {/* Large watermark logo */}
      <div className="hero__watermark">
        <AdobeLogo size={600} color="var(--text-primary)" />
      </div>

      {/* Main content */}
      <div className="hero__content">
        <h1 className="hero__title">
          <span
            className={`hero__title-line ${show ? 'hero__title-line--visible' : ''}`}
          >
            ACS Interns
          </span>
          <span
            className={`hero__title-line ${show ? 'hero__title-line--visible' : ''}`}
            style={{ animationDelay: '0.2s' }}
          >
            <span className="hero__title-accent">2026</span>
          </span>
        </h1>

        <p className={`hero__subtitle ${show ? 'hero__subtitle--visible' : ''}`}>
          Where Innovation Meets Opportunity — Crafting the future of
          Adobe Experience Cloud, one line of code at a time.
        </p>

        <a
          href="#teams"
          className={`hero__cta ${show ? 'hero__cta--visible' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector('#teams')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Explore Teams
          <span className="hero__cta-arrow">→</span>
        </a>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll-indicator">
        <span>Scroll</span>
        <div className="hero__scroll-chevron" />
      </div>
    </section>
  );
};

export default Hero;
