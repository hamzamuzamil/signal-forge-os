
import { useState } from 'react';
import Header from './dashboard/Header';
import FeedDump from './dashboard/FeedDump';
import InboxSignalizer from './dashboard/InboxSignalizer';
import ClarityCompass from './dashboard/ClarityCompass';
import FocusAlerts from './dashboard/FocusAlerts';
import BlindSpotScanner from './dashboard/BlindSpotScanner';

interface User {
  id: number;
  email: string;
  fullName: string;
}

interface Session {
  user: User;
  token: string;
}

interface DashboardProps {
  session: Session;
}

type TabType = 'feed' | 'inbox' | 'clarity' | 'focus' | 'blindspot';

const Dashboard = ({ session }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState<TabType>('feed');

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <FeedDump />;
      case 'inbox':
        return <InboxSignalizer />;
      case 'clarity':
        return <ClarityCompass />;
      case 'focus':
        return <FocusAlerts />;
      case 'blindspot':
        return <BlindSpotScanner />;
      default:
        return <FeedDump />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      <Header session={session} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="pt-20 pb-8 px-4 max-w-7xl mx-auto">
        {renderContent()}
      </main>
    </div>
  );
};

export default Dashboard;
