
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import Auth from '@/components/Auth';
import Dashboard from '@/components/Dashboard';
import LandingPage from '@/components/LandingPage';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
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
          title: "Welcome to SignalForge OS",
          description: "Ready to filter the noise from your signals.",
        });
        setShowAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, [toast]);

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse">
          <div className="w-8 h-8 bg-cyan-500 rounded-full animate-bounce"></div>
        </div>
      </div>
    );
  }

  if (session) {
    return <Dashboard session={session} />;
  }

  if (showAuth) {
    return <Auth />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
