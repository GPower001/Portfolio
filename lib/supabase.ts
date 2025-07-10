import { createClient } from '@supabase/supabase-js';

// Store these in environment variables in a production environment
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Visitor {
  id: string;
  ip_address?: string;
  user_agent?: string;
  page_visited: string;
  visit_time: string;
  country?: string;
  city?: string;
  referrer?: string;
}

export interface PageView {
  page: string;
  count: number;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

export async function logVisit(pageVisited: string, referrer?: string) {
  try {
    const { data, error } = await supabase
      .from('visitors')
      .insert([
        { 
          page_visited: pageVisited,
          referrer: referrer || null,
          visit_time: new Date().toISOString()
        }
      ]);

    if (error) {
      console.error('Error logging visit:', error);
    }
    
    return { data, error };
  } catch (err) {
    console.error('Failed to log visit:', err);
    return { data: null, error: err };
  }
}

export async function getVisitors() {
  try {
    const { data, error } = await supabase
      .from('visitors')
      .select('*')
      .order('visit_time', { ascending: false });
      
    if (error) {
      console.error('Error fetching visitors:', error);
    }
    
    return { data, error };
  } catch (err) {
    console.error('Failed to fetch visitors:', err);
    return { data: null, error: err };
  }
}

export async function getPageViews() {
  try {
    const { data, error } = await supabase
      .from('visitors')
      .select('page_visited');
      
    if (error) {
      console.error('Error fetching page views:', error);
      return { data: null, error };
    }
    
    // Count occurrences of each page
    const pageViews: PageView[] = [];
    if (data) {
      const counts: Record<string, number> = {};
      
      data.forEach(({ page_visited }) => {
        counts[page_visited] = (counts[page_visited] || 0) + 1;
      });
      
      for (const [page, count] of Object.entries(counts)) {
        pageViews.push({ page, count });
      }
      
      // Sort by count descending
      pageViews.sort((a, b) => b.count - a.count);
    }
    
    return { data: pageViews, error: null };
  } catch (err) {
    console.error('Failed to fetch page views:', err);
    return { data: null, error: err };
  }
}

export async function submitContactForm(name: string, email: string, message: string) {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([
        { name, email, message, read: false }
      ]);
      
    if (error) {
      console.error('Error submitting contact form:', error);
    }
    
    return { data, error };
  } catch (err) {
    console.error('Failed to submit contact form:', err);
    return { data: null, error: err };
  }
}

export async function getContactMessages() {
  try {
    const { data, error } = await supabase
      .from('contact_messages')
      .select('*')
      .order('created_at', { ascending: false });
      
    if (error) {
      console.error('Error fetching contact messages:', error);
    }
    
    return { data, error };
  } catch (err) {
    console.error('Failed to fetch contact messages:', err);
    return { data: null, error: err };
  }
}