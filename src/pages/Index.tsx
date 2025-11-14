import { useState, useEffect } from 'react';
import { api, type User } from '@/lib/api';
import Auth from '@/components/Auth';
import Dashboard from '@/components/Dashboard';
import LandingPage from '@/components/LandingPage';
import { useToast } from '@/hooks/use-toast';

interface Session {
  user: User;
  token: string;
}

const Index = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth_token');
        if (!token) {
          if (mounted) {
            setLoading(false);
          }
          return;
        }

        const response = await api.getCurrentUser();
        if (mounted) {
          setSession({
            user: response.user,
            token: token
          });
          setLoading(false);
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear invalid token
        localStorage.removeItem('auth_token');
        if (mounted) {
          setLoading(false);
        }
      }
    };

    checkAuth();
  }, []);

  const handleGetStarted = () => {
    setShowAuth(true);
  };

  const handleAuthSuccess = async (response: { user: User; token: string }) => {
    // Update session state without reloading
    setSession({
      user: response.user,
      token: response.token
    });
    setShowAuth(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading SignalForge OS...</p>
        </div>
      </div>
    );
  }

  if (session) {
    return <Dashboard session={session} />;
  }

  if (showAuth) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
};

export default Index;
