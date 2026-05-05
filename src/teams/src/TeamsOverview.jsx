import Reveal from "./Reveal.jsx";
import Marquee from "./Marquee.jsx";
import { TEAMS, totalMembers } from "./data.jsx";
import { IconArrowUpRight } from "./icons.jsx";

const TeamsOverview = ({ onSelectTeam }) => {
  return (
    <main data-screen-label="Teams Overview" className="relative">
      {/* HERO */}
      <section className="relative px-6 md:px-10 lg:px-14 pt-32 md:pt-40 pb-16 md:pb-24">
        <Reveal>
          <div className="flex items-center gap-3 eyebrow text-white/70">
            <span style={{ background: "#FA0F00" }} className="w-6 h-px" />
            <span>DX Internship · 2026</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h1 className="display-xl mt-8 md:mt-10 max-w-[14ch]">
            Meet&nbsp;the
            <br />
            Teams.
          </h1>
        </Reveal>

        <div className="mt-10 md:mt-14 grid grid-cols-12 gap-6 md:gap-10 items-end">
          <Reveal delay={140} className="col-span-12 md:col-span-7">
            <p className="text-[18px] md:text-[22px] leading-snug text-white/80 max-w-[42ch]">
              Six teams. One DX mission. Built by interns shipping with Adobe —
              from design tokens to data pipelines, from authoring tools to the
              copy that ties it all together.
            </p>
          </Reveal>

          <Reveal
            delay={220}
            className="col-span-12 md:col-span-5 md:justify-self-end"
          >
            <div className="flex md:justify-end gap-10 md:gap-14 glass-panel-subtle px-6 py-5">
              <Stat label="Teams" value="06" />
              <Stat label="Interns" value={String(totalMembers).padStart(2, "0")} />
              <Stat label="Universities" value="05" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section anchor */}
      <section className="px-6 md:px-10 lg:px-14 pt-6 pb-4">
        <Reveal>
          <SectionLabel index="01" title="The Cohort" />
        </Reveal>
      </section>

      {/* TEAM GRID */}
      <section className="px-6 md:px-10 lg:px-14 pb-24 md:pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/6 border border-white/10 rounded-xl overflow-hidden">
          {TEAMS.map((team, i) => (
            <Reveal key={team.slug} delay={i * 40}>
              <TeamCard team={team} onClick={() => onSelectTeam(team.slug)} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="border-y border-white/8 py-8 md:py-10 bg-white/[0.02] backdrop-blur-sm">
        <Marquee
          items={TEAMS.map((t) => `${t.number}  ${t.name}`)}
          separator="●"
          itemClassName="display-l text-white"
          separatorClassName="text-adobe text-[14px]"
        />
      </section>

      {/* SECONDARY: 02 — How they work */}
      <section className="px-6 md:px-10 lg:px-14 pt-24 md:pt-36 pb-12">
        <Reveal>
          <SectionLabel index="02" title="How they work" />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
          <Reveal delay={60} className="md:col-span-7">
            <h2 className="display-l max-w-[18ch]">
              Teams ship&nbsp;real&nbsp;work — not internship&nbsp;exercises.
            </h2>
          </Reveal>
          <Reveal delay={140} className="md:col-span-5 md:pt-4">
            <p className="text-white/70 text-[16px] md:text-[17px] leading-relaxed max-w-[44ch]">
              Every team is paired with full-time engineers, designers, and
              PMs. Interns own scoped slices of the roadmap, present at DX
              reviews, and ship their work to production before the cohort ends.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-y-10 gap-x-6 md:gap-x-10 glass-panel px-6 py-8">
          <Stat label="Cohort" value="2026" align="left" />
          <Stat label="Weeks" value="12" align="left" />
          <Stat label="Reviews" value="04" align="left" />
          <Stat label="Ship rate" value="100%" align="left" />
        </div>
      </section>

      {/* Fast marquee — universities */}
      <section className="border-y border-white/8 py-6 md:py-8 mt-24 bg-white/[0.02] backdrop-blur-sm">
        <Marquee
          fast
          items={[
            "CHRIST University",
            "BITS Pilani",
            "NIT Trichy",
            "IIIT Bangalore",
            "VIT Vellore",
          ]}
          separator="—"
          itemClassName="font-display text-[28px] md:text-[32px] font-medium text-white/80"
          separatorClassName="text-adobe"
        />
      </section>

      {/* FOOTER */}
      <footer className="px-6 md:px-10 lg:px-14 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-7">
            <div className="eyebrow text-white/50">Adobe Digital Experience</div>
            <h3 className="display-l mt-6 max-w-[16ch]">
              Built by interns. <span className="text-adobe">Shipped</span> with
              Adobe.
            </h3>
          </div>
          <div className="md:col-span-5 md:justify-self-end flex flex-col gap-3 text-[14px]">
            <a href="#" className="ulink w-fit">
              Internship handbook
              <IconArrowUpRight size={16} />
            </a>
            <a href="#" className="ulink w-fit">
              DX engineering blog
              <IconArrowUpRight size={16} />
            </a>
            <a href="#" className="ulink w-fit">
              Apply for 2027
              <IconArrowUpRight size={16} />
            </a>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-[12px] text-white/40">
          <div className="flex items-center gap-3">
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "#FA0F00" }}
            />
            <span>Adobe DX · Internal portal · 2026</span>
          </div>
          <div className="flex items-center gap-6">
            <span>Bengaluru</span>
            <span>·</span>
            <span>Noida</span>
            <span>·</span>
            <span>Remote</span>
          </div>
        </div>
      </footer>
    </main>
  );
};

const Stat = ({ label, value, align = "right" }) => (
  <div className={align === "right" ? "text-right" : "text-left"}>
    <div className="num-mega text-[44px] md:text-[56px]">{value}</div>
    <div className="eyebrow text-white/50 mt-2">{label}</div>
  </div>
);

const SectionLabel = ({ index, title }) => (
  <div className="flex items-baseline gap-4 md:gap-6 border-t border-white/15 pt-5">
    <span className="text-adobe num-mega text-[14px] tracking-normal">
      {index}
    </span>
    <span className="eyebrow text-white/70">{title}</span>
  </div>
);

const TeamCard = ({ team, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="team-card group relative text-white text-left p-7 md:p-9 lg:p-10 min-h-[300px] md:min-h-[340px] flex flex-col justify-between cursor-pointer w-full"
      style={{ borderRadius: "0px" }}
      aria-label={`Open ${team.name} team`}
    >
      <div className="flex items-start justify-between">
        <span className="num-mega text-adobe text-[88px] md:text-[104px] leading-none">
          {team.number}
        </span>
        <span className="team-arrow inline-flex">
          <IconArrowUpRight size={26} strokeWidth={1.25} />
        </span>
      </div>

      <div>
        <h3 className="display-l text-[40px] md:text-[44px] lg:text-[52px]">
          {team.name}
        </h3>
        <p className="muted-on-card mt-3 text-[14px] md:text-[15px] leading-snug max-w-[34ch] text-white/60">
          {team.tagline}
        </p>

        <div className="divider-on-card mt-7 h-px w-full bg-white/15" />

        <div className="mt-4 flex items-center justify-between text-[12px]">
          <span className="eyebrow muted-on-card text-white/50">
            {String(team.members.length).padStart(2, "0")} members
          </span>
          <span className="eyebrow muted-on-card text-white/50">
            View team
          </span>
        </div>
      </div>
    </button>
  );
};

export default TeamsOverview;
