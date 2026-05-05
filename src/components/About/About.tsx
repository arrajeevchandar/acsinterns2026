import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const FEATURES = [
  {
    title: 'People',
    text: 'Profiles, mentors, squads, socials, and everything that helps the cohort know each other faster.',
  },
  {
    title: 'Projects',
    text: 'A living showcase for intern work across AEM, Workfront, Data, UI, and DACOE.',
  },
  {
    title: 'Moments',
    text: 'Onboarding, food runs, runathons, demos, team photos, and the small rituals that become the summer.',
  },
  {
    title: 'Playbook',
    text: 'FAQs, do and dont guides, timelines, core values, and practical context for every intern.',
  },
];

const About: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.14 });

  return (
    <section id="about" ref={ref} className="home-section home-section--dark">
      <div className="home-wrap cohort">
        <div className={`cohort__media reveal ${isVisible ? 'is-visible' : ''}`}>
          <img src={`${process.env.PUBLIC_URL}/images/team-collab.png`} alt="ACS interns collaborating" />
          <div className="cohort__tag">A portal for the people behind the summer.</div>
        </div>

        <div className={`cohort__panel reveal ${isVisible ? 'is-visible' : ''}`}>
          <div>
            <span className="section-kicker">The Cohort</span>
            <h2 className="section-heading">Built by interns. Made for the whole ACS floor.</h2>
            <p className="section-copy">
              This is not a brochure page. It is the operating home for the
              internship: who is here, what they are building, what team they
              belong to, and how the whole experience unfolds.
            </p>
          </div>

          <div className="cohort__feature-grid">
            {FEATURES.map((feature) => (
              <article className="cohort__feature" key={feature.title}>
                <strong>{feature.title}</strong>
                <span>{feature.text}</span>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
