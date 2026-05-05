import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit after all animations complete
    const exitTimer = setTimeout(() => setIsExiting(true), 3800);
    const completeTimer = setTimeout(() => onComplete(), 4800);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash ${isExiting ? 'splash--exit' : ''}`}>
      {/* Corner markers — cinematic framing */}
      <div className="splash__corner splash__corner--tl" />
      <div className="splash__corner splash__corner--tr" />
      <div className="splash__corner splash__corner--bl" />
      <div className="splash__corner splash__corner--br" />

      {/* Horizontal accent lines */}
      <div className="splash__line splash__line--top" />
      <div className="splash__line splash__line--bottom" />

      {/* Particle burst */}
      <div className="splash__particles">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="splash__particle" />
        ))}
      </div>

      {/* Logo area */}
      <div className="splash__logo-wrap splash__glow">
        {/* Expanding rings */}
        <div className="splash__ring" />
        <div className="splash__ring" />
        <div className="splash__ring" />
        <div className="splash__ring" />

        {/* Adobe Logo — accurate SVG */}
        <svg
          viewBox="0 0 240 234"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Adobe Logo"
        >
          <path
            d="M0 233.4V0L93.6 233.4H0Z"
            className="splash__logo-path splash__logo-fill"
          />
          <path
            d="M240 233.4V0L146.4 233.4H240Z"
            className="splash__logo-path splash__logo-path--right splash__logo-fill"
          />
          <path
            d="M120 46.8L163.2 153.6H141.6L128.4 120H97.2L120 46.8Z"
            className="splash__logo-path splash__logo-path--center splash__logo-fill"
          />
        </svg>
      </div>

      {/* Text */}
      <div className="splash__text">ADOBE</div>
      <div className="splash__subtext">ACS INTERNS 2026</div>
    </div>
  );
};

export default SplashScreen;
