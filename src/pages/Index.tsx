
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Auth from '@/components/Auth';
import Dashboard from '@/components/Dashboard';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        toast({
          title: "Welcome to SignalOS",
          description: "Ready to filter the noise from your signals.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-cyan-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  if (!session) {
    return <Auth />;
  }

  return <Dashboard session={session} />;
};

export default Index;
