import React from 'react';

interface AdobeLogoProps {
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
}

/**
 * Accurate recreation of the Adobe corporate logo — the iconic triangular "A".
 * Based on the official Adobe brandmark proportions.
 */
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
      viewBox="0 0 240 234"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`adobe-logo ${animated ? 'adobe-logo--animated' : ''} ${className}`}
      aria-label="Adobe Logo"
    >
      {/* Left triangle */}
      <path
        d="M0 233.4V0L93.6 233.4H0Z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 2.5 : 0}
        className={animated ? 'adobe-logo__path' : ''}
      />
      {/* Right triangle */}
      <path
        d="M240 233.4V0L146.4 233.4H240Z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 2.5 : 0}
        className={animated ? 'adobe-logo__path adobe-logo__path--right' : ''}
      />
      {/* Center "A" notch */}
      <path
        d="M120 46.8L163.2 153.6H141.6L128.4 120H97.2L120 46.8Z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 2.5 : 0}
        className={animated ? 'adobe-logo__path adobe-logo__path--center' : ''}
      />
    </svg>
  );
};

export default AdobeLogo;
