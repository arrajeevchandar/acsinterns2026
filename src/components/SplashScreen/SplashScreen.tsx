import React, { useState, useEffect } from 'react';
import './SplashScreen.css';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Start exit animation after 3.4 seconds
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 3400);

    // Unmount after exit animation completes
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`splash-screen ${isExiting ? 'splash-screen--exiting' : ''}`}>
      {/* Particle effects */}
      <div className="splash-particles">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="splash-particle" />
        ))}
      </div>

      {/* Pulsing rings behind logo */}
      <div className="splash-logo-container splash-logo-glow splash-logo-scale">
        <div className="splash-ring" />
        <div className="splash-ring" />
        <div className="splash-ring" />

        {/* Adobe "A" Triangle Logo — SVG inline */}
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Adobe Logo"
        >
          {/* Left side of the A */}
          <path
            d="M5 95 L50 5 L50 95 Z"
            className="splash-logo-path splash-logo-path--fill"
          />
          {/* Right side of the A */}
          <path
            d="M95 95 L50 5 L50 95 Z"
            className="splash-logo-path splash-logo-path--fill"
            style={{ animationDelay: '0.3s, 2.1s' }}
          />
          {/* Center notch / crossbar of the A */}
          <path
            d="M65 95 L50 55 L35 95 Z"
            className="splash-logo-path splash-logo-path--fill"
            style={{ animationDelay: '0.6s, 2.4s' }}
            stroke="#E8302A"
            strokeWidth="1.5"
            fill="transparent"
          />
        </svg>
      </div>

      {/* "ADOBE" text */}
      <div className="splash-text">ADOBE</div>
    </div>
  );
};

export default SplashScreen;
