const Nav = ({ onHome }) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-30 mix-blend-difference">
      <div className="px-6 md:px-10 lg:px-14 pt-6 md:pt-8 flex items-center justify-between text-white">
        <button
          onClick={onHome}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Adobe DX home"
        >
          <span
            className="inline-block w-2 h-2 rounded-full"
            style={{ background: "#FA0F00" }}
          />
          <span className="wordmark text-[15px] tracking-tight">
            Adobe&nbsp;DX
          </span>
        </button>

        <nav className="hidden md:flex items-center gap-10 text-[13px] font-medium">
          <button onClick={onHome} className="ulink">
            Teams
          </button>
          <a href="#projects" className="ulink opacity-60 hover:opacity-100">
            Projects
          </a>
          <a href="#calendar" className="ulink opacity-60 hover:opacity-100">
            Calendar
          </a>
          <a href="#handbook" className="ulink opacity-60 hover:opacity-100">
            Handbook
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-3 text-[12px] eyebrow">
          <span style={{ color: "#737373" }}>Cohort</span>
          <span>2026</span>
        </div>
      </div>
    </header>
  );
};

export default Nav;
