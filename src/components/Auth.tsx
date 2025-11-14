
import { useState } from 'react';
import { api, type AuthResponse } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

interface AuthProps {
  onAuthSuccess?: (response: AuthResponse) => void;
}

const Auth = ({ onAuthSuccess }: AuthProps) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);
  const { toast } = useToast();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (!email || !password || !fullName) {
        toast({
          title: "Missing Information",
          description: "Please enter your full name, email, and password.",
          variant: "destructive",
        });
        return;
      }
    } else {
      if (!email || !password) {
        toast({
          title: "Missing Information",
          description: "Please enter both email and password.",
          variant: "destructive",
        });
        return;
      }
    }

    setLoading(true);

    try {
      if (isSignUp) {
        const response = await api.signup({ email, password, fullName });
        toast({
          title: "Account created",
          description: `Welcome to SignalForge OS, ${response.user.fullName}!`,
        });
        // Update session state through callback instead of reloading
        if (onAuthSuccess) {
          onAuthSuccess(response);
        } else {
          // Fallback to reload if no callback provided
          window.location.reload();
        }
      } else {
        const response = await api.login({ email, password });
        toast({
          title: "Welcome back!",
          description: `Hello, ${response.user.fullName}!`,
        });
        // Update session state through callback instead of reloading
        if (onAuthSuccess) {
          onAuthSuccess(response);
        } else {
          // Fallback to reload if no callback provided
          window.location.reload();
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      
      let errorMessage = "An error occurred during authentication. Please try again.";
      
      if (error instanceof Error) {
        if (error.message.includes('already exists') || error.message.includes('User with this email')) {
          errorMessage = 'This email is already registered. Please sign in instead.';
        } else if (error.message.includes('Invalid email or password')) {
          errorMessage = 'Invalid email or password. Please try again.';
        } else if (error.message.includes('Network') || error.message.includes('fetch')) {
          errorMessage = 'Unable to connect to the server. Please make sure the backend is running on port 3001.';
        } else {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-2">
              SignalOS
            </h1>
            <p className="text-gray-400">AI noise filter for high-performing minds</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div className="space-y-4">
              {isSignUp && (
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required={isSignUp}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 transition-all duration-300"
                />
              )}
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 transition-all duration-300"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 transition-all duration-300"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              {loading ? 'Processing...' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-cyan-400 hover:text-cyan-300 transition-colors duration-300"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
