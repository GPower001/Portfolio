'use client';

import { motion } from 'framer-motion';
import { useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { projects } from '@/data/projects';

export default function FeaturedProjects() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const featuredProjects = projects.filter(project => project.featured);

  return (
    <section 
      id="featured-projects"
      ref={ref} 
      className="py-20 bg-background"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        className="container mx-auto px-4"
      >
        <motion.div 
          variants={fadeIn('up')}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground">
            A selection of my recent work, showcasing web applications and design projects that demonstrate my expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              inView={inView} 
            />
          ))}
        </div>

        <motion.div 
          variants={fadeIn('up', 0.4)}
          className="mt-16 text-center"
        >
          <Button variant="outline" size="lg" asChild>
            <Link href="/projects">
              View All Projects <ArrowUpRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}

function ProjectCard({ project, index, inView }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
  };

  const handleCardClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <motion.div 
      variants={fadeIn('up', 0.1 * index)}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      className="h-full cursor-pointer"
      onClick={handleCardClick}
    >
      <Card 
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="overflow-hidden h-full transition-all duration-300 bg-card hover:shadow-lg transform-gpu will-change-transform group-hover:border-primary/30"
      >
        <div className="relative aspect-video overflow-hidden">
          <Image 
            src={project.imageUrl} 
            alt={project.title} 
            width={500} 
            height={300}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
              {project.liveUrl && (
                <Button size="sm" asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Live Demo
                  </a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" size="sm" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                    GitHub
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <div className="flex flex-wrap gap-2 mb-3">
            {project.technologies.slice(0, 3).map(tech => (
              <Badge key={tech} variant="secondary">{tech}</Badge>
            ))}
            {project.technologies.length > 3 && (
              <Badge variant="outline">+{project.technologies.length - 3}</Badge>
            )}
          </div>

          <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
          <p className="text-muted-foreground mb-4 text-sm">
            {project.description}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
