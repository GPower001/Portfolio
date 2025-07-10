import { Service } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export const services: Service[] = [
  {
    id: uuidv4(),
    title: 'Web Development',
    description: 'Custom web applications built with modern technologies and frameworks. From responsive websites to complex web applications with advanced functionality.',
    icon: 'code'
  },
  {
    id: uuidv4(),
    title: 'E-commerce Solutions',
    description: 'Complete e-commerce platforms with secure payment gateways, inventory management, and optimized user journeys to maximize conversions.',
    icon: 'shopping-cart'
  },
  {
    id: uuidv4(),
    title: 'API Development',
    description: 'Robust and scalable API solutions that connect your services and applications. RESTful APIs with proper documentation and security.', 
    icon: 'server'
  },
  // {
  //   id: uuidv4(),
  //   title: 'Performance Optimization',
  //   description: 'Improve the speed and efficiency of your existing applications. Code auditing, refactoring, and implementation of best practices for optimal performance.',
  //   icon: 'zap'
  // }
];