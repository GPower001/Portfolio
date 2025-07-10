'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useVisitors } from '@/lib/api';
import { fadeIn, staggerContainer } from '@/lib/animations';

interface Visitor {
  id: string;
  visitTime: string;
  pageVisited?: string;
  referrer?: string;
}

interface ChartData {
  name: string;
  value: number;
}

interface VisitorChartData {
  date: string;
  visitors: number;
}

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const { visitors, isLoading, isError } = useVisitors();
  
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });
  
  // Process data for charts
  const pageViews = visitors ? visitors.reduce((acc: Record<string, number>, visitor: Visitor) => {
    const page = visitor.pageVisited || '/';
    acc[page] = (acc[page] || 0) + 1;
    return acc;
  }, {}) : {};
  
  const pageViewChartData: ChartData[] = Object.entries(pageViews).map(([name, value]) => ({
    name: name.replace('/', '') || 'Home',
    value: value as number
  }));
  
  // Count visitors by date
  const visitorsByDate = visitors ? visitors.reduce((acc: Record<string, number>, visitor: Visitor) => {
    const date = new Date(visitor.visitTime).toLocaleDateString();
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {}) : {};
  
  const visitorChartData: VisitorChartData[] = Object.entries(visitorsByDate).map(([date, count]) => ({
    date,
    visitors: count as number
  }));
  
  // Sort visitor chart data by date
  const sortedVisitorChartData = [...visitorChartData].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Pie chart colors
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82ca9d'];
  
  return (
    <div className="min-h-screen py-32">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <motion.div variants={fadeIn('up')} className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track and analyze website visitor data and engagement metrics.
          </p>
        </motion.div>
        
        <motion.div variants={fadeIn('up', 0.2)} className="mb-8">
          <Tabs defaultValue="overview" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="visitors">Visitor Log</TabsTrigger>
            </TabsList>
            
            <div className="mt-8">
              <TabsContent value="overview" className="space-y-8">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" />
                    <p className="mt-4">Loading analytics data...</p>
                  </div>
                ) : isError ? (
                  <div className="text-center py-12 text-destructive">
                    <p>Failed to load analytics data. Please try again later.</p>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Total Visitors
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{visitors?.length || 0}</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Pages Visited
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{Object.keys(pageViews).length}</div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium">
                            Most Popular Page
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-xl font-bold">
                            {pageViewChartData.length > 0 
                              ? pageViewChartData[0].name
                              : 'N/A'}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="col-span-1">
                        <CardHeader>
                          <CardTitle>Page Views</CardTitle>
                          <CardDescription>
                            Distribution of views across different pages
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pageViewChartData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                              >
                                {pageViewChartData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                      
                      <Card className="col-span-1">
                        <CardHeader>
                          <CardTitle>Visitors Over Time</CardTitle>
                          <CardDescription>
                            Number of visitors by date
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="h-80">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={sortedVisitorChartData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Bar dataKey="visitors" fill="hsl(var(--chart-1))" />
                            </BarChart>
                          </ResponsiveContainer>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </TabsContent>
              
              <TabsContent value="visitors">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]" />
                    <p className="mt-4">Loading visitor data...</p>
                  </div>
                ) : isError ? (
                  <div className="text-center py-12 text-destructive">
                    <p>Failed to load visitor data. Please try again later.</p>
                  </div>
                ) : (
                  <Card>
                    <CardHeader>
                      <CardTitle>Visitor Log</CardTitle>
                      <CardDescription>
                        Detailed record of all site visitors
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Page Visited</TableHead>
                            <TableHead>Referrer</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {visitors && visitors.length > 0 ? (
                            visitors.map((visitor: Visitor) => (
                              <TableRow key={visitor.id}>
                                <TableCell>
                                  {new Date(visitor.visitTime).toLocaleString()}
                                </TableCell>
                                <TableCell>
                                  <Badge variant="outline">
                                    {visitor.pageVisited || '/'}
                                  </Badge>
                                </TableCell>
                                <TableCell>
                                  {visitor.referrer || 'Direct Visit'}
                                </TableCell>
                              </TableRow>
                            ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={3} className="text-center">
                                No visitor data available yet.
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </div>
          </Tabs>
        </motion.div>
      </motion.div>
    </div>
  );
}