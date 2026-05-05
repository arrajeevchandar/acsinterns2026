import React from 'react';

interface AdobeLogoProps {
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
}

const AdobeLogo: React.FC<AdobeLogoProps> = ({
  size = 48,
  color = 'currentColor',
  className = '',
  animated = false,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`adobe-logo ${animated ? 'adobe-logo--animated' : ''} ${className}`}
      aria-label="Adobe Logo"
    >
      {/* Triangular "A" — Adobe style */}
      <path
        d="M50 5 L95 95 L65 95 L55 72 L35 72 L50 40 L60 62 L70 62 L50 5 Z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 2 : 0}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? 'adobe-logo__path' : ''}
      />
      {/* Left half of the A */}
      <path
        d="M5 95 L50 5 L50 95 Z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 2 : 0}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? 'adobe-logo__path adobe-logo__path--left' : ''}
      />
      {/* Right half of the A */}
      <path
        d="M95 95 L50 5 L50 95 Z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 2 : 0}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={animated ? 'adobe-logo__path adobe-logo__path--right' : ''}
      />
    </svg>
  );
};

export default AdobeLogo;
