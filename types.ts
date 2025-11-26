export interface Project {
  id: string;
  title: string;
  role: string;
  tech: string[];
  description: string;
  image: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  details: string[];
}

export interface SkillData {
  subject: string;
  A: number;
  fullMark: number;
}

export enum Section {
  HERO = 'HERO',
  ABOUT = 'ABOUT',
  STATS = 'STATS',
  PROJECTS = 'PROJECTS',
  CHAT = 'CHAT'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  isTyping?: boolean;
}
