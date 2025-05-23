
import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Bell, Filter, Calendar, TrendingUp, AlertCircle } from 'lucide-react';
import SignalCard from './SignalCard';

const FocusAlerts = () => {
  const [signalsOnly, setSignalsOnly] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [showLowValueAlert, setShowLowValueAlert] = useState(false);

  const mockSignals = [
    {
      id: '1',
      content: 'Investor meeting scheduled with Sequoia Capital for next Tuesday',
      signalType: 'signal' as const,
      score: 95,
      summary: 'High-priority investor meeting requiring preparation',
      suggestedAction: 'read' as const,
      category: 'Fundraising'
    },
    {
      id: '2',
      content: 'Weekly team standup notes and progress updates',
      signalType: 'noise' as const,
      score: 30,
      summary: 'Routine administrative communication',
      suggestedAction: 'ignore' as const,
      category: 'Internal'
    },
    {
      id: '3',
      content: 'Customer feedback indicating major product issue',
      signalType: 'signal' as const,
      score: 88,
      summary: 'Critical product feedback requiring immediate attention',
      suggestedAction: 'read' as const,
      category: 'Product'
    }
  ];

  const filteredSignals = signalsOnly 
    ? mockSignals.filter(signal => signal.signalType === 'signal')
    : mockSignals;

  const sortedSignals = [...filteredSignals].sort((a, b) => {
    switch (sortBy) {
      case 'score': return b.score - a.score;
      case 'urgency': return b.score - a.score; // Using score as proxy for urgency
      case 'topic': return a.category.localeCompare(b.category);
      default: return 0; // date - keeping original order for now
    }
  });

  const triggerLowValueAlert = () => {
    setShowLowValueAlert(true);
    setTimeout(() => setShowLowValueAlert(false), 5000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Bell className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Focus Alerts Engine</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Smart filtering and alerts to keep you focused on high-value signals only.
        </p>
      </div>

      {/* Controls */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={signalsOnly}
                onCheckedChange={setSignalsOnly}
                className="data-[state=checked]:bg-cyan-500"
              />
              <label className="text-white text-sm font-medium">Show signals only</label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-40 bg-white/5 border-white/20 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  <SelectItem value="date">Sort by Date</SelectItem>
                  <SelectItem value="score">Sort by Score</SelectItem>
                  <SelectItem value="urgency">Sort by Urgency</SelectItem>
                  <SelectItem value="topic">Sort by Topic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={triggerLowValueAlert}
            variant="outline"
            size="sm"
            className="border-yellow-500/30 text-yellow-400 hover:bg-yellow-500/10"
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Simulate Alert
          </Button>
        </div>
      </div>

      {/* Low Value Alert Modal */}
      {showLowValueAlert && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="backdrop-blur-xl bg-red-500/10 border border-red-500/30 rounded-2xl p-8 max-w-md mx-4 animate-pulse">
            <div className="text-center">
              <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Low-Value Browsing Detected</h3>
              <p className="text-gray-300 mb-6">
                You've been consuming low-signal content for 15 minutes. 
                Consider refocusing on high-priority tasks.
              </p>
              <Button
                onClick={() => setShowLowValueAlert(false)}
                className="bg-red-500 hover:bg-red-600 text-white"
              >
                Got it, refocus
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Signals Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">
            {signalsOnly ? 'High-Value Signals' : 'All Content'} ({sortedSignals.length})
          </h3>
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            <TrendingUp className="w-4 h-4" />
            <span>Sorted by {sortBy}</span>
          </div>
        </div>
        
        <div className="grid gap-4">
          {sortedSignals.map((signal) => (
            <SignalCard key={signal.id} signal={signal} />
          ))}
        </div>
      </div>

      {sortedSignals.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No signals found</h3>
          <p className="text-gray-500">
            {signalsOnly ? 'All content has been filtered as noise.' : 'No content to display.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default FocusAlerts;
