import React from 'react';

interface AdobeLogoProps {
  size?: number;
  color?: string;
  className?: string;
  animated?: boolean;
  showWordmark?: boolean;
  ghost?: boolean;
}

const AdobeLogo: React.FC<AdobeLogoProps> = ({
  size = 48,
  className = '',
  animated = false,
  showWordmark = false,
  ghost = false,
}) => {
  const mark = ghost ? (
    // Ghost/watermark usage in Hero orbit — keep as faint outline
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`adobe-logo ${className}`}
      aria-hidden="true"
    >
      <rect width="100" height="100" fill="rgba(255,255,255,0.06)" rx="6" />
      <polygon points="0,0 40,0 0,100" fill="rgba(255,255,255,0.08)" />
      <polygon points="60,0 100,0 100,100" fill="rgba(255,255,255,0.08)" />
      <polygon points="50,18 62,48 38,48" fill="rgba(255,255,255,0.08)" />
    </svg>
  ) : (
    <img
      src={`${process.env.PUBLIC_URL}/images/adobe-logo.png`}
      alt="Adobe"
      width={size}
      height={size}
      className={`adobe-logo ${animated ? 'adobe-logo--animated' : ''} ${className}`}
      style={{ objectFit: 'contain', display: 'block' }}
    />
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