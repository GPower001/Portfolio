import { Experience } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const experiences: Experience[] = [
  {
    id: uuidv4(),
    company: 'Freelance Projects (ongoing)',
    position: 'Full Stack Developer',
    period: 'June 2025 - Present',
    description: 'Developing responsive web applications with a focus on performance and user experience. Created a component library that increased development speed by 40%. Collaborated with UX designers to implement complex animations and interactive elements.',
    technologies: [ 'JavaScript', 'Node.js', 'Express.js', 'MongoDB', 'React', 'Tailwind CSS']
  },
  {
    id: uuidv4(),
    company: 'Exquitech',
    position: 'Intern Full Stack Developer',
    period: 'Aug 2024 - Feb 2025',
    description: 'Assisted in building and maintaining backend services for enterprise-level web applications. Contributed to designing and implementing a microservices architecture to improve backend scalability and performance. Supported the integration of automated backend testing tools, which helped reduce system bugs and improve reliability.',
    technologies: ['HTML','CSS','React', 'Node.js', 'JavaScript', 'Express.js', 'MongoDB', 'PostgreSQL']
  },
  
]