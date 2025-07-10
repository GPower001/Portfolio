'use client';

import { useEffect, useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, Github, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { projects } from '@/data/projects';
import { formatDate } from '@/lib/utils';
import { fadeIn, staggerContainer } from '@/lib/animations';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(projects.find(p => p.id === id));
  
  useEffect(() => {
    if (!project) {
      notFound();
    }
  }, [project]);
  
  if (!project) {
    return null;
  }
  
  return (
    <div className="min-h-screen py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <div className="flex flex-col max-w-4xl mx-auto">
          <motion.div variants={fadeIn('up')}>
            <Link href="/projects" className="inline-flex items-center text-muted-foreground hover:text-primary mb-6">
              <ChevronLeft className="mr-1 h-4 w-4" />
              Back to Projects
            </Link>
          </motion.div>
          
          <motion.div variants={fadeIn('up', 0.1)}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.technologies.map(tech => (
                <Badge key={tech}>{tech}</Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{project.title}</h1>
            
            <div className="flex items-center text-muted-foreground mb-8">
              <Calendar className="mr-2 h-4 w-4" />
              <span>Completed: {formatDate(new Date(project.completed))}</span>
            </div>
          </motion.div>
          
          <motion.div 
            variants={fadeIn('up', 0.2)}
            className="rounded-lg overflow-hidden mb-8"
          >
            <Image 
              src={project.imageUrl} 
              alt={project.title} 
              width={1000} 
              height={600}
              className="w-full h-auto object-cover"
            />
          </motion.div>
          
          <motion.div variants={fadeIn('up', 0.3)} className="mb-8">
            <div className="flex gap-4 mb-8">
              {project.liveUrl && (
                <Button asChild>
                  <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visit Website
                  </Link>
                </Button>
              )}
              
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    View Code
                  </Link>
                </Button>
              )}
            </div>
            
            <h2 className="text-2xl font-semibold mb-4">Project Overview</h2>
            <p className="text-muted-foreground mb-6">
              {project.longDescription || project.description}
            </p>
            
            <Separator className="my-8" />
            
            <h2 className="text-2xl font-semibold mb-4">Technologies Used</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
              {project.technologies.map(tech => (
                <div key={tech} className="flex items-center p-3 bg-muted rounded-md">
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}