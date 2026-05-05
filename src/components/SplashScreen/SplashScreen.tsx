import React, { useEffect, useState } from 'react';
import AdobeLogo from '../AdobeLogo/AdobeLogo';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'boot' | 'form' | 'open'>('boot');

  useEffect(() => {
    const timers = [
      window.setTimeout(() => setPhase('form'), 420),
      window.setTimeout(() => setPhase('open'), 3000),
      window.setTimeout(onComplete, 4300),
    ];

    return () => timers.forEach(window.clearTimeout);
  }, [onComplete]);

  return (
    <div className={`splash splash--${phase}`} aria-label="Adobe ACS intro animation">
      <div className="splash__panel splash__panel--left" />
      <div className="splash__panel splash__panel--right" />
      <div className="splash__scanline" />

      <div className="splash__stage">
        <div className="splash__rings">
          <span />
          <span />
          <span />
        </div>

        <div className="splash__mark" aria-hidden="true">
          <span className="splash__mark-shadow splash__mark-shadow--one">
            <AdobeLogo size={148} color="#ff1f2d" />
          </span>
          <span className="splash__mark-shadow splash__mark-shadow--two">
            <AdobeLogo size={148} color="#ffffff" />
          </span>
          <AdobeLogo size={148} color="#eb1c24" animated />
        </div>

        <div className="splash__word">
          <span>Adobe</span>
          <small>Experience Cloud Services Internship Portal</small>
        </div>
      </div>

      <div className="splash__counter">
        <span>ACS</span>
        <span>2026</span>
      </div>
    </div>
  );
};

export default SplashScreen;
