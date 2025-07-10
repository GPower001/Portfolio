'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { fadeIn } from '@/lib/animations';

export default function ContactCTA() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <section ref={ref} className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
      </div>
      
      <motion.div
        initial="hidden"
        animate={inView ? "show" : "hidden"}
        variants={{
          hidden: { opacity: 0 },
          show: { 
            opacity: 1,
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
        className="container mx-auto px-4 text-center"
      >
        <motion.h2 
          variants={fadeIn('up')}
          className="text-3xl md:text-4xl font-bold mb-4"
        >
          Ready to Work Together?
        </motion.h2>
        
        <motion.p 
          variants={fadeIn('up', 0.1)}
          className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8"
        >
          Let's discuss your project and create something amazing together.
          I'm currently available for freelance work and new opportunities.
        </motion.p>
        
        <motion.div 
          variants={fadeIn('up', 0.2)}
        >
          <Button 
            size="lg" 
            variant="secondary" 
            asChild 
            className="text-base font-medium"
          >
            <Link href="/contact">
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </section>
  );
}