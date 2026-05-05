import React from 'react';

interface AdobeLogoProps {
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
  showWordmark?: boolean;
}

const AdobeLogo: React.FC<AdobeLogoProps> = ({
  size = 48,
  color = 'currentColor',
  className = '',
  animated = false,
  showWordmark = false,
}) => {
  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 234"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`adobe-logo ${animated ? 'adobe-logo--animated' : ''} ${className}`}
      aria-label="Adobe ACS mark"
    >
      <path
        d="M0 233.4V0L93.6 233.4H0Z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 3 : 0}
        className={animated ? 'adobe-logo__path adobe-logo__path--left' : ''}
      />
      <path
        d="M240 233.4V0L146.4 233.4H240Z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 3 : 0}
        className={animated ? 'adobe-logo__path adobe-logo__path--right' : ''}
      />
      <path
        d="M120 47L163.2 153.6H141.6L128.4 120H97.2L120 47Z"
        fill={animated ? 'none' : color}
        stroke={animated ? color : 'none'}
        strokeWidth={animated ? 3 : 0}
        className={animated ? 'adobe-logo__path adobe-logo__path--center' : ''}
      />
    </svg>
  );

  if (!showWordmark) return mark;

  return (
    <span className={`adobe-wordmark ${className}`}>
      {mark}
      <span className="adobe-wordmark__copy">
        <span>Adobe</span>
        <small>ACS Interns</small>
      </span>
    </span>
  );
};

export default AdobeLogo;
