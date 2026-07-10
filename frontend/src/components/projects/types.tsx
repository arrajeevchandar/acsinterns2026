export type ProjectStatus = 'In Progress' | 'Completed' | 'In Review';
export type ImpactLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface Project {
  id: string;
  name: string;
  author: string;
  role: string;
  tag: string;
  status: ProjectStatus;
  timeline: string;
  stack: string;
  impact: ImpactLevel;
  desc: string;
  link: string;
  tags: string[];
}

export interface Team {
  id: string;
  label: string;
  number: string;
  navLabel: string;
  projects: Project[];
}

export interface AvatarColor {
  bg: string;
  color: string;
}