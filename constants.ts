
import { Experience, Project, SkillData } from "./types";

export const RESUME_SUMMARY = `
Senior Frontend Developer | 6+ Years Exp.
Master of Science in Digital Media.
Specializing in React ecosystem, High-Performance UI, and Scalable Architecture.
Proven track record with Chevron, Netflix, and Amazon projects.
`;

export const SKILLS_DATA: SkillData[] = [
  { subject: 'React Stack', A: 150, fullMark: 150 }, // React, Redux, MSAL
  { subject: 'TypeScript', A: 145, fullMark: 150 },
  { subject: 'UI Systems', A: 140, fullMark: 150 }, // MUI, Tailwind, AntD
  { subject: 'Testing', A: 130, fullMark: 150 }, // Jest, RTL
  { subject: 'Visualization', A: 125, fullMark: 150 }, // D3, Three
  { subject: 'DevOps/Tools', A: 135, fullMark: 150 }, // CI/CD, Azure, Git
];

export const SKILL_LIST = [
  "React ^16", "Angular", "Vue.js", "TypeScript", "JavaScript", "HTML/CSS",
  "Redux Toolkit", "MobX", "NgRx Store", "MSAL React", "Context API",
  "Tailwind CSS", "MUI React", "Ant Design", "Shadcn UI", "Sass", "Emotion", "Styled Components",
  "Three.js", "D3.js", "Chart.js", "GreenSock",
  "Jest", "React Testing Library", "Storybook", "Unit Testing",
  "Azure", "CI/CD", "Git/Gitlab", "Bitbucket", "Agile/Scrum", "Jira",
  "OOP", "Functional Programming"
];

export const EXPERIENCE_DATA: Experience[] = [
  {
    id: '1',
    company: 'ATI LLP (Chevron)',
    role: 'Senior Frontend Developer (React)',
    period: '11/2023 - Current',
    details: [
      'Implemented inventory app for Chevron, one of the world’s most famous oil companies.',
      'Integrated Authorization and Authentication logic for the app, by using MSAL React.',
      'Created forms and tables with CRUD system for the Chevron equipment’s characteristics.',
      'Improved UI speed, fixed responsiveness of the app, created new design by using MUI React.',
      'Refactored project components.'
    ]
  },
  {
    id: '2',
    company: 'Akvelon',
    role: 'Senior Frontend Developer (React)',
    period: '08/2022 - 11/2023',
    details: [
      'Implemented the design and development of a worldwide global traveling platform.',
      'Created user interfaces of manually booking forms and ticketing logic of the platform for flights, hotels and cars.',
      'Made booking time faster and easier by implementing multiple passengers ticketing and automating price calculation depending on the passenger type.',
      'Decreased unexpected errors and bugs during the development process by Unit Testing with Jest and React Testing Library.',
      'Implemented multi city flights by separating the in between flight airlines depending on the cities which made flight booking details much cleaner to a passenger.'
    ]
  },
  {
    id: '3',
    company: 'Smart-X',
    role: 'Senior Frontend Developer (React)',
    period: '04/2021 - 08/2022',
    details: [
      'Designed and implemented a high load global video streaming platform with millions of users per day.',
      'Increased the number of high-quality broadcasters by implementing moderator applications from scratch for new broadcasters.',
      'Implemented blocking and banning logic of new broadcasters in case of violation by using WebSocket technology.',
      'Increased the readability of project code by refactoring and migrating from class-based components into functional components with hooks.',
      'Redesigned the main chat of the platform by making it much more user friendly and integrating online web games while chatting.'
    ]
  },
  {
    id: '4',
    company: 'MediaMonks',
    role: 'Senior Frontend Developer (React)',
    period: '01/2021 - 03/2022',
    details: [
      'Designed and implemented product-based applications of Netflix and Amazon by using the latest trends on UI animation and design.',
      'Completely optimized applications to be adaptive and responsive almost on all devices by using emulators and simulators including tablets and smartphones.',
      'Integrated smooth and trending animations on product-based applications by using GreenSock and Animate.css.'
    ]
  },
  {
    id: '5',
    company: 'Prime Source',
    role: 'Middle Frontend Developer (React)',
    period: '06/2019 - 12/2020',
    details: [
      'Designed and implemented enterprise fintech applications of Kazakhstan’s largest e-commerce platforms by using React, TypeScript, Redux.',
      'Migrated the whole project from the old version of React to the new version with hooks included.',
      'Configured linting and added type coverage, used immutable and functional coding approach.'
    ]
  },
  {
    id: '6',
    company: 'Chocofamily',
    role: 'Junior Frontend Developer (React/Vue)',
    period: '01/2019 - 04/2019',
    details: [
      'Created the main website of the company from scratch by using Vue.js.',
      'Increased dramatically the speed of the web site by using code splitting technology and decreasing the total bundle size of the SPA.',
      'Implemented company’s growth chart in years by using Chart.js.'
    ]
  }
];

export const PROJECTS_DATA: Project[] = [
  {
    id: 'p1',
    title: 'Chevron Inventory',
    role: 'Lead Developer',
    tech: ['React', 'MSAL', 'MUI'],
    description: 'Secure enterprise inventory system with complex CRUD operations and Azure AD authentication.',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p2',
    title: 'Global Travel Hub',
    role: 'Senior Dev',
    tech: ['React', 'Jest', 'Redux'],
    description: 'Worldwide booking platform for flights/hotels with automated multi-city ticketing logic.',
    image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop'
  },
  {
    id: 'p3',
    title: 'Smart-X Stream',
    role: 'Architect',
    tech: ['WebSockets', 'React', 'Node'],
    description: 'High-load video streaming platform with millions of daily users and live moderation tools.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: 'p4',
    title: 'Product Experience',
    role: 'Creative Dev',
    tech: ['GreenSock', 'React', 'Sass'],
    description: 'Interactive, high-end animated web applications for clients like Netflix and Amazon.',
    image: 'https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop'
  }
];
