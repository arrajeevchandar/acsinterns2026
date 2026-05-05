import React from "react";
import Nav from "./Nav.jsx";
import TeamsOverview from "./TeamsOverview.jsx";
import TeamDetail from "./TeamDetail.jsx";
import MemberModal from "./MemberModal.jsx";
import { TEAMS } from "./data.jsx";

const App = () => {
  const [view, setView] = React.useState("teams"); // 'teams' | 'team'
  const [selectedTeamSlug, setSelectedTeamSlug] = React.useState(null);
  const [selectedMemberId, setSelectedMemberId] = React.useState(null);

  const team = selectedTeamSlug
    ? TEAMS.find((t) => t.slug === selectedTeamSlug)
    : null;

  const member =
    team && selectedMemberId
      ? team.members.find((m) => m.id === selectedMemberId)
      : null;

  // When changing top-level view, scroll to top
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [view, selectedTeamSlug]);

  const goHome = () => {
    setView("teams");
    setSelectedTeamSlug(null);
    setSelectedMemberId(null);
  };

  const openTeam = (slug) => {
    setSelectedTeamSlug(slug);
    setView("team");
  };

  const openMember = (id) => setSelectedMemberId(id);
  const closeMember = () => setSelectedMemberId(null);

  return (
    <>
      <Nav onHome={goHome} />

      {view === "teams" && <TeamsOverview onSelectTeam={openTeam} />}
      {view === "team" && team && (
        <TeamDetail
          team={team}
          onBack={goHome}
          onSelectMember={openMember}
        />
      )}

      {member && team && (
        <MemberModal
          member={member}
          team={team}
          onClose={closeMember}
        />
      )}
    </>
  );
};

export default App;
