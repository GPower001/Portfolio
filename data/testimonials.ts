import { Testimonial } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const testimonials: Testimonial[] = [
  {
    id: uuidv4(),
    name: 'Sarah Johnson',
    position: 'CEO',
    company: 'TechInnovate',
    text: 'Working with Oluwatomisin was a game-changer for our company. They delivered an exceptional e-commerce platform that exceeded our expectations in both functionality and design. Their attention to detail and problem-solving skills made the development process smooth and efficient.',
    avatarUrl: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: uuidv4(),
    name: 'Michael Chen',
    position: 'Product Manager',
    company: 'Nexus Labs',
    text: 'I\'ve worked with many developers over the years, but Mr Dede Godspower Oluwatomisin has truly stands out for their technical excellence and communication skills. They transformed our complex requirements into an intuitive app with impressive performance. The animations and transitions they implemented elevate the entire user experience.',
    avatarUrl: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: uuidv4(),
    name: 'Emma Wilson',
    position: 'Marketing Director',
    company: 'CreativeEdge',
    text: 'Our portfolio website needed a complete overhaul, and Mr Dede Godspower Oluwatomisin delivered beyond our wildest expectations. The site is not only visually stunning but also performs flawlessly. The interactive elements and animations they added have significantly increased user engagement and time spent on the site.',
    avatarUrl: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  },
  {
    id: uuidv4(),
    name: 'Alex Rodriguez',
    position: 'CTO',
    company: 'FinTech Solutions',
    text: 'We hired Mr Dede Godspower Oluwatomisin to create a complex dashboard for our financial platform, and they knocked it out of the park. Their expertise in data visualization and real-time updates made our application stand out in the industry. They\'re a true professional who delivers quality code on time and within budget.',
    avatarUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2'
  }
  
];