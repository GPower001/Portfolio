'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { skills } from '@/data/skills';
import { experiences } from '@/data/experience';
import { fadeIn, staggerContainer } from '@/lib/animations';
import { Code, Server, PenTool, Briefcase, Wrench } from 'lucide-react';

export default function SkillsPage() {
  const [activeTab, setActiveTab] = useState('skills');
  
  const frontendSkills = skills.filter(skill => skill.category === 'frontend');
  const backendSkills = skills.filter(skill => skill.category === 'backend');
  const toolsSkills = skills.filter(skill => skill.category === 'tools');
  
  return (
    <div className="min-h-screen py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeIn('up')} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Skills & Experience</h1>
          <p className="text-muted-foreground">
            A comprehensive overview of my technical skills and professional experience.
          </p>
        </motion.div>
        
        <motion.div variants={fadeIn('up', 0.2)} className="mb-12">
          <Tabs 
            defaultValue="skills" 
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <div className="flex justify-center">
              <TabsList className="mb-8">
                <TabsTrigger value="skills" className="flex items-center gap-2">
                  <Code className="h-4 w-4" />
                  <span>Skills</span>
                </TabsTrigger>
                <TabsTrigger value="experience" className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4" />
                  <span>Experience</span>
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="skills" className="mt-0">
              <div className="max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <motion.div variants={fadeIn('up', 0.3)}>
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                          <Code className="mr-2 h-5 w-5" />
                          Frontend Development
                        </h2>
                        
                        <div className="space-y-6">
                          {frontendSkills.map((skill) => (
                            <div key={skill.name}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={fadeIn('up', 0.4)}>
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                          <Server className="mr-2 h-5 w-5" />
                          Backend Development
                        </h2>
                        
                        <div className="space-y-6">
                          {backendSkills.map((skill) => (
                            <div key={skill.name}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <motion.div variants={fadeIn('up', 0.6)}>
                    <Card>
                      <CardContent className="pt-6">
                        <h2 className="text-xl font-semibold mb-6 flex items-center">
                          <Wrench className="mr-2 h-5 w-5" />
                          Tools & Workflow
                        </h2>
                        
                        <div className="space-y-6">
                          {toolsSkills.map((skill) => (
                            <div key={skill.name}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="font-medium">{skill.name}</span>
                                <span className="text-sm text-muted-foreground">{skill.level}%</span>
                              </div>
                              <Progress value={skill.level} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="experience" className="mt-0">
              <div className="max-w-4xl mx-auto">
                <motion.div variants={fadeIn('up', 0.3)}>
                  <div className="relative border-l border-muted pl-6">
                    {experiences.map((exp) => (
                      <div 
                        key={exp.id} 
                        className="mb-12 relative"
                      >
                        <div className="absolute -left-9 mt-1.5 w-4 h-4 rounded-full border-4 border-background bg-primary" />
                        
                        <div className="mb-1 text-sm font-medium text-muted-foreground">
                          {exp.period}
                        </div>
                        
                        <h3 className="text-xl font-semibold">{exp.position}</h3>
                        <h4 className="text-lg text-muted-foreground mb-4">{exp.company}</h4>
                        
                        <p className="mb-4">{exp.description}</p>
                        
                        <div className="flex flex-wrap gap-2">
                          {exp.technologies.map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-muted rounded-full text-sm">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}