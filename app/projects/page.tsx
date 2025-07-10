'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { projects } from '@/data/projects';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';

export default function ProjectsPage() {
  const [filter, setFilter] = useState('all');
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.category === filter);
  
  const categories = [
    { value: 'all', label: 'All Projects' },
    { value: 'web', label: 'Web Development' },
    { value: 'other', label: 'Other' },
  ];
  
  return (
    <div className="min-h-screen py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeIn('up')} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">My Projects</h1>
          <p className="text-muted-foreground">
            Browse my portfolio of work across various technologies and project types.
            Each project represents unique challenges and solutions.
          </p>
        </motion.div>
        
        <motion.div variants={fadeIn('up', 0.2)} className="mb-12">
          <Tabs 
            defaultValue="all" 
            value={filter}
            onValueChange={setFilter}
            className="w-full"
          >
            <div className="flex justify-center">
              <TabsList className="mb-8">
                {categories.map(category => (
                  <TabsTrigger 
                    key={category.value} 
                    value={category.value}
                    className="px-4 py-2"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </Tabs>
          <ProjectGrid projects={filteredProjects} />
        </motion.div>
      </motion.div>
    </div>
  );
}

function ProjectGrid({ projects }: { projects: typeof import('@/data/projects').projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          variants={fadeIn('up', index * 0.1)}
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          <Card className="overflow-hidden h-full flex flex-col">
            <div className="relative aspect-video overflow-hidden">
              <Image 
                src={project.imageUrl} 
                alt={project.title} 
                width={500} 
                height={300}
                className="object-cover w-full h-full transition-transform duration-500 hover:scale-105"
              />
            </div>
            
            <CardContent className="p-6 flex flex-col flex-grow">
              <div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.technologies.slice(0, 3).map(tech => (
                    <Badge key={tech} variant="secondary">{tech}</Badge>
                  ))}
                  {project.technologies.length > 3 && (
                    <Badge variant="outline">+{project.technologies.length - 3}</Badge>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
              </div>
              
              <div className="flex items-center gap-4 mt-auto">
                {project.githubUrl && (
                  <Button variant="outline" size="icon" asChild>
                    <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                
                {project.liveUrl && (
                  <Button variant="outline" size="icon" asChild>
                    <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                )}
                
                <Link
                  href={`/projects/${project.id}`}
                  className="ml-auto inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  View Details <ArrowUpRight className="ml-1 h-3 w-3" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}