import React from "react";
import { portraitUrl } from "./data.jsx";
import {
  IconClose,
  IconLinkedin,
  IconGithub,
  IconExternal,
  IconArrowUpRight,
} from "./icons.jsx";

const MemberModal = ({ member, team, onClose }) => {
  // Lock body scroll
  React.useEffect(() => {
    document.body.classList.add("modal-open");
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  if (!member) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-stretch md:items-center justify-center backdrop-in"
      role="dialog"
      aria-modal="true"
      aria-label={`Profile · ${member.name}`}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0"
        style={{
          background: "rgba(10, 10, 10, 0.8)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      />

      {/* Modal */}
      <div
        className="modal-in relative bg-ink text-white w-full md:w-[min(1100px,92vw)] md:h-[min(720px,86vh)] md:rounded-[8px] overflow-hidden border border-white/10 flex flex-col md:flex-row max-h-screen"
        style={{ borderRadius: "8px" }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 inline-flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Close"
        >
          <IconClose size={22} strokeWidth={1.5} />
        </button>

        {/* LEFT — portrait + identity */}
        <div className="md:w-[44%] md:h-full flex flex-col bg-elevated">
          <div className="relative w-full aspect-square md:aspect-auto md:flex-1 overflow-hidden">
            <img
              src={portraitUrl(member.avatar)}
              alt={member.name}
              className="absolute inset-0 w-full h-full object-cover"
              style={{ filter: "grayscale(0.05) contrast(1.02)" }}
            />
            <div className="absolute top-4 left-4 eyebrow text-white/85 mix-blend-difference">
              {team.number} / {team.name}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="font-display font-semibold text-[28px] md:text-[34px] leading-tight tracking-tight">
              {member.name}
            </div>
            <div className="mt-2 text-[14px] md:text-[15px] text-white/70">
              {member.role}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              <Pill>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full mr-2"
                  style={{ background: "#FA0F00" }}
                />
                {team.number} {team.name}
              </Pill>
              <Pill>{member.university}</Pill>
            </div>
          </div>
        </div>

        {/* RIGHT — bio + project + links */}
        <div className="md:w-[56%] md:h-full overflow-y-auto p-6 md:p-10 lg:p-12 flex flex-col">
          <div className="eyebrow text-white/50">About</div>
          <p className="mt-4 text-[15px] md:text-[16px] leading-relaxed text-white/85 max-w-[52ch]">
            {member.bio}
          </p>

          <div className="mt-10 border-t border-white/10 pt-6">
            <div className="eyebrow text-white/50">Currently working on</div>
            <h3 className="mt-4 font-display font-semibold text-[22px] md:text-[26px] leading-tight tracking-tight">
              {member.project.title}
            </h3>
            <p className="mt-3 text-[14px] md:text-[15px] leading-relaxed text-white/70 max-w-[50ch]">
              {member.project.summary}
            </p>
          </div>

          <div className="mt-8">
            <div className="eyebrow text-white/50 mb-3">Stack</div>
            <div className="flex flex-wrap gap-2">
              {member.stack.map((s) => (
                <Chip key={s}>{s}</Chip>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-10">
            <LinkRow
              label="LinkedIn"
              detail={"/in/" + member.name.toLowerCase().replace(/\s+/g, "-")}
              icon={<IconLinkedin size={16} />}
              href="#"
            />
            <LinkRow
              label="Project"
              detail={member.project.title}
              icon={<IconExternal size={16} />}
              href="#"
            />
            <LinkRow
              label="GitHub"
              detail={"@" + member.name.toLowerCase().split(" ")[0]}
              icon={<IconGithub size={16} />}
              href="#"
              isLast
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const Pill = ({ children }) => (
  <span className="inline-flex items-center text-[11px] eyebrow px-3 py-1.5 border border-white/15 text-white/80">
    {children}
  </span>
);

const Chip = ({ children }) => (
  <span className="inline-flex items-center text-[12px] px-3 py-1.5 bg-white/5 text-white/85 border border-white/10 rounded-[4px]">
    {children}
  </span>
);

const LinkRow = ({ label, detail, icon, href, isLast = false }) => (
  <a
    href={href}
    className={
      "group flex items-center justify-between gap-4 py-5 border-t border-white/15 " +
      (isLast ? "border-b" : "")
    }
  >
    <div className="flex items-baseline gap-5">
      <span className="font-display font-semibold text-[18px] md:text-[20px] tracking-tight">
        <span className="ulink">{label}</span>
      </span>
      <span className="hidden sm:inline text-[12px] text-white/45 truncate max-w-[28ch]">
        {detail}
      </span>
    </div>
    <span className="inline-flex items-center justify-center w-9 h-9 text-white/70 group-hover:text-adobe transition-colors">
      <IconArrowUpRight size={20} strokeWidth={1.5} />
    </span>
  </a>
);

export default MemberModal;
