import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const PROJECTS = [
  {
    title: 'Content Velocity Engine',
    team: 'AEM',
    desc: 'An AI-assisted pipeline concept for creating, optimizing, and distributing content across enterprise experience surfaces.',
    img: `${process.env.PUBLIC_URL}/images/innovation.png`,
    tags: ['AI/ML', 'React', 'Experience Manager'],
  },
  {
    title: 'Workflow Automation Suite',
    team: 'Workfront',
    desc: 'A focused automation layer for work intake, project handoffs, approval states, and operational visibility.',
    img: `${process.env.PUBLIC_URL}/images/hero-bg.png`,
    tags: ['TypeScript', 'GraphQL', 'Planning'],
  },
  {
    title: 'Experience Analytics Dashboard',
    team: 'Data',
    desc: 'A real-time analytics surface for turning product signals into crisp decisions for interns, mentors, and teams.',
    img: `${process.env.PUBLIC_URL}/images/innovation.png`,
    tags: ['Data', 'Dashboards', 'Insights'],
  },
];

const Showcase: React.FC = () => {
  const { ref, isVisible } = useIntersectionObserver({ threshold: 0.08 });

  return (
    <section id="projects" ref={ref} className="home-section home-section--band">
      <div className="home-wrap">
        <div className={`reveal ${isVisible ? 'is-visible' : ''}`}>
          <span className="section-kicker">Featured Work</span>
          <h2 className="section-heading">Projects should feel like a launch slate.</h2>
          <p className="section-copy">
            This section is ready to become the future project index: each row
            can open into details, intern profiles, GitHub links, mentor notes,
            and live demos.
          </p>
        </div>

        <div className={`showcase-reel ${isVisible ? 'is-visible' : ''}`}>
          {PROJECTS.map((project, index) => (
            <article className="project-row" key={project.title} style={{ transitionDelay: `${index * 100}ms` }}>
              <div className="project-row__image">
                <img src={project.img} alt={project.title} />
              </div>
              <div className="project-row__content">
                <div>
                  <span className="project-row__team">{project.team}</span>
                  <h3>{project.title}</h3>
                  <p>{project.desc}</p>
                </div>
                <div className="project-row__tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Showcase;
