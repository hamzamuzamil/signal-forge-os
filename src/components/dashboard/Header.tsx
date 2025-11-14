
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { LogOut, Brain, Inbox, Compass, Bell, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type TabType = 'feed' | 'inbox' | 'clarity' | 'focus' | 'blindspot';

interface Session {
  user: {
    id: number;
    email: string;
    fullName: string;
  };
  token: string;
}

interface HeaderProps {
  session: Session;
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Header = ({ session, activeTab, setActiveTab }: HeaderProps) => {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await api.logout();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error('Sign out error:', error);
      // Still navigate even if sign out fails
      navigate('/');
      window.location.reload();
    }
  };

  const handleLogoClick = () => {
    // Reset to Feed Dump tab when clicking Home/Logo
    setActiveTab('feed');
  };


  const tabs = [
    { id: 'feed' as TabType, icon: Brain, label: 'Feed Dump' },
    { id: 'inbox' as TabType, icon: Inbox, label: 'Inbox' },
    { id: 'clarity' as TabType, icon: Compass, label: 'Clarity' },
    { id: 'focus' as TabType, icon: Bell, label: 'Focus' },
    { id: 'blindspot' as TabType, icon: Search, label: 'Blind Spot' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/80 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <button
              onClick={handleLogoClick}
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent hover:from-cyan-300 hover:to-blue-400 transition-all duration-300 cursor-pointer"
            >
              SignalOS
            </button>
            
            <nav className="hidden md:flex items-center space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-400 text-sm hidden sm:block">
              {session.user.fullName || session.user.email}
            </span>
            <Button
              onClick={handleSignOut}
              variant="outline"
              size="sm"
              className="border-white/20 text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
