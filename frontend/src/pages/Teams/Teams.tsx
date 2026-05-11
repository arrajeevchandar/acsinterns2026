import { useState } from 'react';
import { MEMBERS_BY_TEAM, TEAMS, type Member, type TeamId } from './data';
import TeamsOverview from './TeamsOverview';
import TeamDetail from './TeamDetail';
import MemberModal from './MemberModal';
import './teams.css';

type ViewState =
  | { name: 'overview' }
  | { name: 'detail'; teamId: TeamId };

export default function Teams() {
  const [view, setView] = useState<ViewState>({ name: 'overview' });
  const [modalMember, setModalMember] = useState<Member | null>(null);
  const [transitioning, setTransitioning] = useState(false);

  function goToTeam(teamId: TeamId) {
    setTransitioning(true);
    window.setTimeout(() => {
      setView({ name: 'detail', teamId });
      window.scrollTo(0, 0);
      setTransitioning(false);
    }, 300);
  }

  function goBack() {
    setTransitioning(true);
    window.setTimeout(() => {
      setView({ name: 'overview' });
      window.scrollTo(0, 0);
      setTransitioning(false);
    }, 300);
  }

  const modalTeam = modalMember
    ? TEAMS.find((team) => MEMBERS_BY_TEAM[team.id].some((member) => member.id === modalMember.id))
    : undefined;

  return (
    <>
      <main className={`view-stage${transitioning ? ' is-out' : ''}`}>
        {view.name === 'overview' ? (
          <TeamsOverview onSelectTeam={goToTeam} />
        ) : (
          <TeamDetail
            teamId={view.teamId}
            onBack={goBack}
            onSelectMember={setModalMember}
          />
        )}
      </main>

      {modalMember && modalTeam ? (
        <MemberModal
          member={modalMember}
          team={modalTeam}
          onClose={() => setModalMember(null)}
        />
      ) : null}
    </>
  );
}
