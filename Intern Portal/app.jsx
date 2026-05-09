// App shell — v3 matching ACS design system

const { useState: useStateA, useEffect: useEffectA, useCallback: useCallbackA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "dark"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [view, setView] = useStateA({ name: 'overview' });
  const [modalMember, setModalMember] = useStateA(null);
  const [transitioning, setTransitioning] = useStateA(false);

  useEffectA(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
    document.documentElement.style.colorScheme = tweaks.theme;
  }, [tweaks.theme]);

  function goToTeam(teamId) {
    setTransitioning(true);
    setTimeout(() => {
      setView({ name: 'detail', teamId });
      window.scrollTo(0, 0);
      setTransitioning(false);
    }, 300);
  }

  function goBack() {
    setTransitioning(true);
    setTimeout(() => {
      setView({ name: 'overview' });
      window.scrollTo(0, 0);
      setTransitioning(false);
    }, 300);
  }

  return (
    <div className="app-shell">
      <Navbar theme={tweaks.theme} onToggleTheme={() => setTweak('theme', tweaks.theme === 'dark' ? 'light' : 'dark')} />

      <main className={`view-stage ${transitioning ? 'is-out' : ''}`}>
        {view.name === 'overview' && <TeamsOverview onSelectTeam={goToTeam} />}
        {view.name === 'detail' && (
          <TeamDetail
            teamId={view.teamId}
            onBack={goBack}
            onSelectMember={(m) => setModalMember(m)}
          />
        )}
      </main>

      <Footer />

      {modalMember && (
        <MemberModal
          member={modalMember}
          team={TEAMS.find((t) => MEMBERS_BY_TEAM[t.id].some((m) => m.id === modalMember.id))}
          onClose={() => setModalMember(null)}
        />
      )}

      <TweaksPanel title="Tweaks">
        <TweakSection title="Appearance">
          <TweakRadio
            label="Theme"
            value={tweaks.theme}
            options={[{ value: 'light', label: 'Light' }, { value: 'dark', label: 'Dark' }]}
            onChange={(v) => setTweak('theme', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </div>
  );
}

function Navbar({ theme, onToggleTheme }) {
  const [scrolled, setScrolled] = useStateA(false);
  useEffectA(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <a className="navbar__brand" href="#">
        <span className="navbar__brand-logo">
          <svg width="28" height="28" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" fill="rgba(255,255,255,0.06)" rx="6"/>
            <polygon points="8,8 42,8 8,92" fill="#EB1C24"/>
            <polygon points="58,8 92,8 92,92" fill="#EB1C24"/>
            <polygon points="50,28 68,78 50,78 44,62 32,78 50,78" fill="#EB1C24"/>
          </svg>
        </span>
        <span className="navbar__brand-sep" />
        <span>ACS Interns 2026</span>
      </a>

      <ul className="navbar__links">
        <li><a className="navbar__link" href="#">Home</a></li>
        <li><a className="navbar__link" href="#">Gallery</a></li>
        <li><a className="navbar__link navbar__link--active" href="#">Teams</a></li>
        <li><a className="navbar__link" href="#">Projects</a></li>
      </ul>

      <div className="navbar__right">
        <button
          className={`navbar__theme-toggle navbar__theme-toggle--${theme}`}
          onClick={onToggleTheme}
          role="switch"
        >
          <span>Light</span>
          <span>Dark</span>
        </button>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__mark">
        <svg width="24" height="24" viewBox="0 0 100 100" fill="none">
          <polygon points="8,8 42,8 8,92" fill="#EB1C24"/>
          <polygon points="58,8 92,8 92,92" fill="#EB1C24"/>
          <polygon points="50,28 68,78 50,78 44,62 32,78 50,78" fill="#EB1C24"/>
        </svg>
        <span>ACS Interns 2026</span>
      </div>
      <div className="footer__links">
        <a href="#">Home</a>
        <a href="#">Gallery</a>
        <a href="#">Teams</a>
        <a href="#">Projects</a>
      </div>
    </footer>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
