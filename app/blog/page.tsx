'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, Calendar } from 'lucide-react';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { formatDate } from '@/lib/utils';

// Mock blog posts
const blogPosts = [
  {
    id: '1',
    title: 'Building Responsive Websites with Tailwind CSS',
    slug: 'building-responsive-websites-with-tailwind-css',
    excerpt: 'Learn how to create responsive and maintainable user interfaces using Tailwind CSS utility-first approach.',
    content: '',
    coverImage: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-08-15',
    tags: ['Web Development', 'CSS', 'Tailwind', 'Frontend']
  },
  {
    id: '2',
    title: 'Getting Started with Next.js 13 App Router',
    slug: 'getting-started-with-nextjs-13-app-router',
    excerpt: 'Explore the new features and improvements in Next.js 13, focusing on the revolutionary App Router.',
    content: '',
    coverImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-09-22',
    tags: ['Next.js', 'React', 'Web Development']
  },
  {
    id: '3',
    title: 'Creating Beautiful Animations with Framer Motion',
    slug: 'creating-beautiful-animations-with-framer-motion',
    excerpt: 'Learn how to add engaging animations and transitions to your React applications using Framer Motion.',
    content: '',
    coverImage: 'https://images.pexels.com/photos/7054528/pexels-photo-7054528.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-10-05',
    tags: ['Animations', 'React', 'Framer Motion', 'UI/UX']
  },
  {
    id: '4',
    title: 'Optimizing Database Performance in Node.js Applications',
    slug: 'optimizing-database-performance-in-nodejs-applications',
    excerpt: 'Strategies and best practices for improving database performance and efficiency in Node.js backend applications.',
    content: '',
    coverImage: 'https://images.pexels.com/photos/7989023/pexels-photo-7989023.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-11-14',
    tags: ['Node.js', 'Database', 'Performance', 'Backend']
  },
  {
    id: '5',
    title: 'Building Accessible Web Applications',
    slug: 'building-accessible-web-applications',
    excerpt: 'Essential techniques and guidelines for creating inclusive and accessible web experiences for all users.',
    content: '',
    coverImage: 'https://images.pexels.com/photos/196645/pexels-photo-196645.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2023-12-01',
    tags: ['Accessibility', 'Web Development', 'UI/UX', 'HTML']
  },
  {
    id: '6',
    title: 'Getting Started with TypeScript in React Projects',
    slug: 'getting-started-with-typescript-in-react-projects',
    excerpt: 'A beginner-friendly guide to integrating TypeScript into your React projects for type safety and better development experience.',
    content: '',
    coverImage: 'https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    publishedAt: '2024-01-10',
    tags: ['TypeScript', 'React', 'Web Development']
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeIn('up')} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Blog & Articles</h1>
          <p className="text-muted-foreground">
            Insights, tutorials, and thoughts on web development, design, and technology.
          </p>
        </motion.div>
        
        <motion.div variants={fadeIn('up', 0.2)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              variants={fadeIn('up', index * 0.1 + 0.3)}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="overflow-hidden h-full flex flex-col">
                <div className="relative aspect-video overflow-hidden">
                  <Image 
                    src={post.coverImage} 
                    alt={post.title} 
                    width={600} 
                    height={340}
                    className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
                  />
                </div>
                
                <CardContent className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar className="mr-2 h-4 w-4" />
                    <span>{formatDate(new Date(post.publishedAt))}</span>
                  </div>
                  
                  <h2 className="text-xl font-semibold mb-3">{post.title}</h2>
                  
                  <p className="text-muted-foreground mb-4 flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                  
                  <Link 
                    href={`/blog/${post.slug}`} 
                    className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-auto"
                  >
                    Read Article <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}