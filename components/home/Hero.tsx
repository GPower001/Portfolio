'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { staggerContainer, fadeIn, textVariant } from '@/lib/animations';

export default function Hero() {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('featured-projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-background to-background" />
      
      <div className="container mx-auto px-4 py-24 md:py-32">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={textVariant()}
            className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight"
          >
            Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Dede Godspower Oluwatomisn</span>
          </motion.h1>
          
          <motion.h2 
            variants={textVariant(0.2)}
            className="mt-3 text-3xl md:text-4xl lg:text-6xl font-semibold"
          >
            Web Developer
          </motion.h2>
          
          <motion.div 
            variants={fadeIn('up', 0.4)}
            className="mt-6 text-lg text-muted-foreground max-w-2xl"
          >
            <p>
              Crafting exceptional digital experiences with modern technologies.
              Specializing in Express, Node.js, React.js and building complete web solutions
              from concept to deployment.
            </p>
          </motion.div>
          
          <motion.div 
            variants={fadeIn('up', 0.6)}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button size="lg" asChild>
              <Link href="/contact">
                Work with me <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/projects">View Projects</Link>
            </Button>
          </motion.div>
          
          <motion.div
            variants={fadeIn('up', 0.8)}
            className="hidden md:flex justify-center mt-24"
          >
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={scrollToProjects}
              className="animate-bounce"
              aria-label="Scroll down"
            >
              <ChevronDown className="h-6 w-6" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Animated gradient blobs */}
      <div className="absolute top-1/3 -left-24 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob" />
      <div className="absolute top-2/3 -right-24 w-72 h-72 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000" />
    </section>
  );
}