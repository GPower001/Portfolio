'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { skills } from '@/data/skills';
import { Code, Server, PenTool as Tool } from 'lucide-react';
import { PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Skills() {
  const [activeTab, setActiveTab] = useState('frontend');
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const toolsSkills = skills.filter(skill => skill.category === 'tools');
  
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Skills & Expertise</h2>
          <p className="text-muted-foreground">
            A comprehensive overview of my technical skills and proficiency levels across various technologies and tools.
          </p>
        </motion.div>
        
        <motion.div
          variants={fadeIn('up', 0.2)}
          className="max-w-4xl mx-auto"
        >
          <Tabs defaultValue="frontend" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full h-auto mb-8">
              <TabsTrigger 
                value="frontend" 
                className="flex items-center gap-2 py-3"
                data-state={activeTab === 'frontend' ? 'active' : ''}
              >
                <Code className="h-4 w-4" />
                <span className="hidden sm:inline">Frontend</span>
              </TabsTrigger>
              <TabsTrigger 
                value="backend" 
                className="flex items-center gap-2 py-3"
                data-state={activeTab === 'backend' ? 'active' : ''}
              >
                <Server className="h-4 w-4" />
                <span className="hidden sm:inline">Backend</span>
              </TabsTrigger>
              <TabsTrigger 
                value="tools" 
                className="flex items-center gap-2 py-3"
                data-state={activeTab === 'tools' ? 'active' : ''}
              >
                <Tool className="h-4 w-4" />
                <span className="hidden sm:inline">Tools</span>
              </TabsTrigger>
            </TabsList>
            
            <Card>
              <CardContent className="pt-6">
                <TabsContent value="frontend" className="mt-0">
                  <SkillList skills={frontendSkills} inView={inView} />
                </TabsContent>
                <TabsContent value="backend" className="mt-0">
                  <SkillList skills={backendSkills} inView={inView} />
                </TabsContent> 
                <TabsContent value="tools" className="mt-0">
                  <SkillList skills={toolsSkills} inView={inView} />
                </TabsContent>
              </CardContent>
            </Card>
          </Tabs>
        </motion.div>
      </motion.div>
    </section>
  );
}

interface SkillListProps {
  skills: typeof skills;
  inView: boolean;
}

function SkillList({ skills, inView }: SkillListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {skills.map((skill, index) => (
        <motion.div 
          key={skill.name}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: 0.5, 
            delay: index * 0.1,
            ease: 'easeOut'
          }}
        >
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="font-medium">{skill.name}</span>
            </div>
            <span className="text-sm text-muted-foreground">{skill.level}%</span>
          </div>
          <Progress 
            value={skill.level} 
            className="h-2"
          />
        </motion.div>
      ))}
    </div>
  );
}