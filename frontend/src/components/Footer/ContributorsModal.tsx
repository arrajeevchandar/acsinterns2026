import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { contributors } from './contributors';

type ContributorsModalProps = {
  onClose: () => void;
};

const ContributorsModal: React.FC<ContributorsModalProps> = ({ onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.classList.add('modal-open');
    document.addEventListener('keydown', handleKeyDown);
    window.setTimeout(() => closeButtonRef.current?.focus(), 0);

    return () => {
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const basePath = import.meta.env.BASE_URL;

  return createPortal(
    <div className="footer-team-modal" onMouseDown={onClose}>
      <section
        className="footer-team-modal__panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="footer-team-modal-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          ref={closeButtonRef}
          className="footer-team-modal__close"
          type="button"
          aria-label="Close contributors modal"
          onClick={onClose}
        >
          x
        </button>

        <div className="footer-team-modal__header">
          <span>Developed by</span>
          <h2 id="footer-team-modal-title">The Team</h2>
        </div>

        <div className="footer-team-modal__grid">
          {contributors.map((contributor) => (
            <article className="footer-team-card" key={contributor.name}>
              <span className="footer-team-card__redbar" aria-hidden="true" />
              <span className="footer-team-card__shine" aria-hidden="true" />
              <div className="footer-team-card__imageWrap">
                <img
                  src={`${basePath}${contributor.image}`}
                  alt={contributor.name}
                  className="footer-team-card__image"
                  loading="lazy"
                />
              </div>
              <h3>{contributor.name}</h3>
            </article>
          ))}
        </div>
      </section>
    </div>,
    document.body
  );
};

export default ContributorsModal;
