import { Project } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const projects: Project[] = [
  {
    id: uuidv4(),
    title: 'AI Task Manager',
    description: 'A smart task management app with AI-powered prioritization and scheduling.',
    longDescription: 'This intelligent task manager uses machine learning algorithms to analyze user behavior and optimize task prioritization. Built with React and Node.js, it features natural language processing for task input, automated scheduling suggestions, and integration with popular calendar applications.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    imageUrl: 'https://images.pexels.com/photos/7014337/pexels-photo-7014337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    githubUrl: 'https://github.com/yourusername/ai-task-manager',
    liveUrl: 'https://ai-taskmanager.com',
    featured: true,
    category: 'web',
    completed: '2023-08-20'
  },
  {
    id: uuidv4(),
    title: 'Inventory Management System',
    description: 'A web application for managing inventory and stock levels.',
    longDescription: 'A robust inventory management system built with React and Node.js. Features include real-time stock tracking, supplier management, purchase order creation, and sales reporting. The application provides an intuitive dashboard for monitoring inventory levels and generating reports.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express'],
    imageUrl: 'https://s3.ap-south-1.amazonaws.com/stage.radixweb.com/medium_Inventory_Management_System_Guide_371bf8be3a.jpg',
    githubUrl: 'https://github.com/GPower001/Inventory',
    liveUrl: 'https://inventory-sycr.onrender.com',
    featured: true,
    category: 'mobile',
    completed: '2025-05-10'
  },
  {
    id: uuidv4(),
    title: 'Real Estate Platform',
    description: 'A property listing platform with virtual tours and neighborhood analytics.',
    longDescription: 'A sophisticated real estate platform that combines property listings with advanced features like virtual 3D tours, neighborhood analytics, price history graphs, mortgage calculators, and agent messaging. Built with Node.js and Express.js, it provides a seamless experience for buyers, sellers, and agents.',
    technologies: ['Node.js', 'MongoDB', 'PostgreSQL', 'Express.js'],
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    githubUrl: 'https://github.com/yourusername/real-estate-platform',
    liveUrl: 'https://real-estate-platform.com',
    featured: false,
    category: 'web',
    completed: '2022-12-05'
  },
  {
    id: uuidv4(),
    title: 'Talk2Me - Social Network for Hobbyists',
    description: 'A niche social network app for connecting enthusiasts in specific hobbies.',
    longDescription: 'A specialized social networking platform designed to connect enthusiasts of specific hobbies and interests. Features include real-time chat, event organization, community forums, content sharing, and recommendation algorithms. Built with React, Node.js, and Socket.io for real-time functionality.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express'],
    imageUrl: 'https://images.pexels.com/photos/147413/twitter-facebook-together-exchange-of-information-147413.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    githubUrl: 'https://github.com/GPower001/Chat-App',
    liveUrl: 'https://talk2me-0bfq.onrender.com',
    featured: false,
    category: 'web',
    completed: '2022-06-30'
  }
];