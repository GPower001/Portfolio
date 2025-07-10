'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { services } from '@/data/services';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { DivideIcon as LucideIcon } from 'lucide-react';
import dynamic from 'next/dynamic';

const icons = {
  code: dynamic(() => import('lucide-react').then((mod) => mod.Code)),
  smartphone: dynamic(() => import('lucide-react').then((mod) => mod.Smartphone)),
  palette: dynamic(() => import('lucide-react').then((mod) => mod.Palette)),
  'shopping-cart': dynamic(() => import('lucide-react').then((mod) => mod.ShoppingCart)),
  server: dynamic(() => import('lucide-react').then((mod) => mod.Server)),
  zap: dynamic(() => import('lucide-react').then((mod) => mod.Zap)),
};

export default function Services() {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  return (
    <section ref={ref} className="py-20 bg-muted/30">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Services I Offer</h2>
          <p className="text-muted-foreground">
            Specialized services to help businesses and individuals achieve their digital goals with high-quality solutions.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const IconComponent = icons[service.icon as keyof typeof icons];
            
            return (
              <motion.div
                key={service.id}
                variants={fadeIn('up', index * 0.1)}
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {IconComponent && <IconComponent size={24} />}
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-muted-foreground">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}