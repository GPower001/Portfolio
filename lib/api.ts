import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useVisitors() {
  const { data, error, isLoading } = useSWR('/api/visitors', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  });
  
  return {
    visitors: data,
    isLoading,
    isError: error,
  };
}

export async function logVisit(pageVisited: string, referrer?: string) {
  try {
    const response = await fetch('/api/visitors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pageVisited, referrer }),
    });
    
    if (!response.ok) throw new Error('Failed to log visit');
    
    return await response.json();
  } catch (error) {
    console.error('Error logging visit:', error);
    throw error;
  }
}

export async function submitContactForm(name: string, email: string, message: string) {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    });
    
    if (!response.ok) throw new Error('Failed to submit contact form');
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw error;
  }
}