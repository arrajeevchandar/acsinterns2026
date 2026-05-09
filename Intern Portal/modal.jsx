// Member Modal — matching ACS design system

const { useEffect: useEffectM } = React;

function MemberModal({ member, team, onClose }) {
  useEffectM(() => {
    document.body.classList.add('modal-open');
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('modal-open');
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  if (!member) return null;

  const teamIndexList = Object.keys(window.MEMBERS_BY_TEAM || {});
  const teamIndex = teamIndexList.indexOf(team.id) !== -1 ? teamIndexList.indexOf(team.id) : 0;
  const parts = member.id ? member.id.split('-') : [];
  const idNum = parts.length > 1 ? parseInt(parts[1], 10) : 1;
  const avatarId = (teamIndex * 10) + idNum + 1;
  const avatarUrl = `https://i.pravatar.cc/600?img=${avatarId}`;

  const modal = (
    <div className="member-modal__backdrop" onClick={onClose}>
      <div className="member-modal__panel glass" onClick={(e) => e.stopPropagation()}>
        <button className="member-modal__close" onClick={onClose} aria-label="Close">
          <span aria-hidden="true">✕</span>
        </button>

        <div className="member-modal__body">
          {/* Portrait column */}
          <div className="member-modal__portrait-col">
            <div className="member-modal__portrait-wrap">
              <img
                src={avatarUrl}
                alt={member.name}
                className="member-modal__portrait"
              />
            </div>
            <p className="member-modal__team-badge">Team {team.name}</p>

            <div className="member-modal__socials">
              {member.github && (
                <a
                  href={member.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="member-modal__social-link"
                  aria-label={`${member.name} on GitHub`}
                >
                  <IconGitHub />
                  <span>GitHub</span>
                </a>
              )}
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="member-modal__social-link member-modal__social-link--linkedin"
                  aria-label={`${member.name} on LinkedIn`}
                >
                  <IconLinkedIn />
                  <span>LinkedIn</span>
                </a>
              )}
            </div>
          </div>

          {/* Info column */}
          <div className="member-modal__info-col">
            <h2 className="member-modal__name">{member.name}</h2>
            <p className="member-modal__role">{member.role}</p>
            <p className="member-modal__university">
              {member.university} &middot; {member.batch || member.program}
            </p>

            <p className="member-modal__bio">{member.bio}</p>

            {member.project && (
              <div className="member-modal__project glass">
                <p className="member-modal__project-label">Project</p>
                <p className="member-modal__project-title">{member.project.name || member.project.title}</p>
                {(member.project.description || member.project.summary) && (
                  <p className="member-modal__project-summary">{member.project.description || member.project.summary}</p>
                )}
                {member.project.url && (
                  <a
                    href={member.project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-modal__project-link"
                  >
                    View project <IconExternal />
                  </a>
                )}
              </div>
            )}

            <div className="member-modal__stack">
              {(member.skills || member.stack || []).map((s) => (
                <span key={s} className="member-modal__chip">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return window.ReactDOM && window.ReactDOM.createPortal
    ? window.ReactDOM.createPortal(modal, document.body)
    : modal;
}

// Icons
function IconLinkedIn() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>);
}
function IconGitHub() {
  return (<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.341-3.369-1.341-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" /></svg>);
}
function IconExternal() {
  return (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>);
}

window.MemberModal = MemberModal;
