import Reveal from "./Reveal.jsx";
import Marquee from "./Marquee.jsx";
import { universityBreakdown, portraitUrl } from "./data.jsx";
import { IconArrowLeft } from "./icons.jsx";

const TeamDetail = ({ team, onBack, onSelectMember }) => {
  const breakdown = universityBreakdown(team.members);

  return (
    <main
      data-screen-label={`Team Detail · ${team.name}`}
      className="relative pb-24 md:pb-32"
    >
      {/* Breadcrumb */}
      <div className="px-6 md:px-10 lg:px-14 pt-28 md:pt-32">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[12px] eyebrow text-white/60 hover:text-white transition-colors"
        >
          <IconArrowLeft size={14} strokeWidth={1.5} />
          <span>Teams</span>
          <span className="text-white/30 mx-1">/</span>
          <span className="text-white">{team.name}</span>
        </button>
      </div>

      {/* HEADER BAND */}
      <section className="px-6 md:px-10 lg:px-14 pt-10 md:pt-14 pb-16 md:pb-24">
        <Reveal>
          <div className="flex items-start gap-6 md:gap-10">
            <span className="num-mega text-adobe text-[120px] md:text-[200px] lg:text-[260px] leading-[0.85] -mt-2 md:-mt-4">
              {team.number}
            </span>
          </div>
        </Reveal>

        <div className="mt-2 md:-mt-4 grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-end">
          <Reveal delay={60} className="md:col-span-7">
            <h1 className="display-xl">{team.name}.</h1>
            <p className="mt-8 text-[18px] md:text-[22px] leading-snug text-white/80 max-w-[40ch]">
              {team.mission}
            </p>
          </Reveal>

          <Reveal delay={140} className="md:col-span-5 md:justify-self-end w-full">
            <div className="border-t border-white/15 pt-6">
              <div className="eyebrow text-white/50 mb-5">Cohort</div>
              <div className="flex items-baseline gap-4 mb-8">
                <span className="num-mega text-[56px] md:text-[72px]">
                  {String(team.members.length).padStart(2, "0")}
                </span>
                <span className="text-white/60 text-[14px]">members</span>
              </div>

              <div className="eyebrow text-white/50 mb-3">From</div>
              <ul className="space-y-2">
                {breakdown.map(([uni, count]) => (
                  <li
                    key={uni}
                    className="flex items-baseline justify-between gap-6 text-[14px] py-2 border-b border-white/10"
                  >
                    <span className="text-white/85">{uni}</span>
                    <span className="text-white/45 tabular-nums">
                      {String(count).padStart(2, "0")}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Section label */}
      <section className="px-6 md:px-10 lg:px-14 pt-6">
        <Reveal>
          <SectionLabelInline index="03" title="The Team" />
        </Reveal>
      </section>

      {/* MEMBER GRID */}
      <section className="px-6 md:px-10 lg:px-14 pt-10 md:pt-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 md:gap-x-8 md:gap-y-16">
          {team.members.map((m, i) => (
            <Reveal key={m.id} delay={i * 40}>
              <MemberCard
                member={m}
                team={team}
                onClick={() => onSelectMember(m.id)}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Marquee — team mantra */}
      <section className="border-y border-white/10 py-6 md:py-8 mt-24">
        <Marquee
          items={[team.name.toUpperCase(), team.tagline, "DX 2026", "ADOBE"]}
          separator="·"
          itemClassName="font-display text-[28px] md:text-[36px] font-medium"
          separatorClassName="text-adobe"
        />
      </section>

      {/* Back link */}
      <section className="px-6 md:px-10 lg:px-14 pt-20 md:pt-28">
        <button
          onClick={onBack}
          className="group flex items-center gap-3 text-[14px] md:text-[15px]"
        >
          <span className="inline-flex items-center justify-center w-10 h-10 border border-white/20 rounded-full transition-colors group-hover:border-adobe group-hover:bg-adobe">
            <IconArrowLeft size={16} strokeWidth={1.5} />
          </span>
          <span className="ulink">Back to all teams</span>
        </button>
      </section>
    </main>
  );
};

const SectionLabelInline = ({ index, title }) => (
  <div className="flex items-baseline gap-4 md:gap-6 border-t border-white/15 pt-5">
    <span className="text-adobe num-mega text-[14px] tracking-normal">
      {index}
    </span>
    <span className="eyebrow text-white/70">{title}</span>
  </div>
);

const MemberCard = ({ member, team, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="group text-left w-full focus:outline-none"
      aria-label={`Open profile for ${member.name}`}
    >
      <div className="relative aspect-square overflow-hidden bg-elevated">
        <img
          src={portraitUrl(member.avatar)}
          alt={member.name}
          loading="lazy"
          className="portrait-img absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle index */}
        <div className="absolute top-3 left-3 eyebrow text-white/70 mix-blend-difference">
          {team.number}.{String(team.members.indexOf(member) + 1).padStart(2, "0")}
        </div>
      </div>

      <div className="mt-4">
        <div className="font-display font-semibold text-[20px] md:text-[22px] leading-tight">
          <span className="name-underline">{member.name}</span>
        </div>
        <div className="mt-1 text-[14px] text-white/70">{member.role}</div>
        <div className="mt-2 text-[12px] eyebrow text-white/45">
          {member.program} · {shortenUni(member.university)}
        </div>
      </div>
    </button>
  );
};

const shortenUni = (uni) => {
  if (uni.startsWith("CHRIST")) return "CHRIST University";
  return uni;
};

export default TeamDetail;
