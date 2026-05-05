import React from 'react';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import './Hero.css';

interface HeroProps {
  contentReady?: boolean;
}

const Hero: React.FC<HeroProps> = ({ contentReady = true }) => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.15 });
  const show = contentReady || isVisible;

  return (
    <section className="hero" id="hero" ref={ref}>
      {/* Background layers */}
      <div className="hero__grid" />
      <div className="hero__center-line" />

      {/* Floating orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      {/* Watermark logo */}
      <div className="hero__watermark">
        <AdobeLogo size={700} color="var(--text-primary)" />
      </div>

      {/* Editorial side text */}
      <span className="hero__side-text hero__side-text--left">Adobe Experience Cloud</span>
      <span className="hero__side-text hero__side-text--right">Summer 2026</span>

      {/* Main Content */}
      <div className="hero__content">
        {/* Label pill */}
        <div className={`hero__label ${show ? 'hero__label--visible' : ''}`}>
          <span className="hero__label-dot" />
          Summer Internship Program
        </div>

        {/* Title */}
        <h1 className="hero__title">
          <span
            className={`hero__title-line ${show ? 'hero__title-line--visible' : ''}`}
          >
            ACS{' '}
            <span className="hero__title-outline">Interns</span>
          </span>
          <span
            className={`hero__title-line ${show ? 'hero__title-line--visible' : ''}`}
            style={{ animationDelay: '0.15s' }}
          >
            <span className="hero__title-accent">2026</span>
          </span>
        </h1>

        {/* Subtitle */}
        <p className={`hero__subtitle ${show ? 'hero__subtitle--visible' : ''}`}>
          Where innovation meets opportunity. Building the future of
          Adobe Experience Cloud — one breakthrough at a time.
        </p>

        {/* CTA Row */}
        <div className={`hero__cta-row ${show ? 'hero__cta-row--visible' : ''}`}>
          <a
            href="#teams"
            className="hero__cta"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#teams')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Explore Teams
            <span className="hero__cta-arrow">→</span>
          </a>
          <a
            href="#values"
            className="hero__cta hero__cta--ghost"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#values')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Our Values
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero__scroll">
        <span className="hero__scroll-text">Scroll</span>
        <div className="hero__scroll-line" />
      </div>
    </section>
  );
};

export default Hero;
