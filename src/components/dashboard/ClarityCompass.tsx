
import { useState, useEffect } from 'react';
import { Compass, TrendingUp, Eye, AlertTriangle, Trash } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

const ClarityCompass = () => {
  const [loading, setLoading] = useState(true);
  const [topSignals, setTopSignals] = useState<any[]>([]);
  const [timeValueData, setTimeValueData] = useState([
    { name: 'High Value', value: 0, color: '#10B981' },
    { name: 'Medium Value', value: 0, color: '#F59E0B' },
    { name: 'Low Value', value: 0, color: '#EF4444' }
  ]);
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [missedBlindSpots, setMissedBlindSpots] = useState<string[]>([]);
  const [signalCount, setSignalCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const response = await api.getSignals();
        const signals = response.signals || [];
        setSignalCount(signals.length);
        
        // Get top 3 signals by score
        const top = signals
          .filter((s: any) => s.signal_type === 'signal')
          .sort((a: any, b: any) => b.score - a.score)
          .slice(0, 3)
          .map((s: any) => ({
            title: s.content.substring(0, 50) + (s.content.length > 50 ? '...' : ''),
            category: s.category || 'General',
            score: s.score,
            summary: s.ai_notes || 'No summary available'
          }));
        
        setTopSignals(top);
        
        // Calculate time/value distribution
        const highValue = signals.filter((s: any) => s.score >= 70).length;
        const mediumValue = signals.filter((s: any) => s.score >= 40 && s.score < 70).length;
        const lowValue = signals.filter((s: any) => s.score < 40).length;
        const total = signals.length || 1;
        
        setTimeValueData([
          { name: 'High Value', value: Math.round((highValue / total) * 100), color: '#10B981' },
          { name: 'Medium Value', value: Math.round((mediumValue / total) * 100), color: '#F59E0B' },
          { name: 'Low Value', value: Math.round((lowValue / total) * 100), color: '#EF4444' }
        ]);
        
        // Extract focus areas from categories
        const categories = [...new Set(signals.map((s: any) => s.category).filter(Boolean))];
        setFocusAreas(categories.slice(0, 3));
        
        // Generate missed blind spots based on low-score signals
        const missed = signals
          .filter((s: any) => s.score < 50 && s.signal_type === 'signal')
          .slice(0, 3)
          .map((s: any) => s.category || 'Uncategorized area');
        setMissedBlindSpots([...new Set(missed)]);
      } catch (error) {
        console.error('Failed to load clarity data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Compass className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Clarity Compass</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto mb-4">
          Your weekly signal summary with insights on focus areas and missed opportunities.
        </p>
        {signalCount > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="mb-4"
              >
                <Trash className="w-4 h-4 mr-2" />
                Clear All Data
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All Data?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your signals and data. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    try {
                      await api.deleteAllSignals();
                      // Reload data to ensure UI is in sync
                      const response = await api.getSignals();
                      const signals = response.signals || [];
                      setSignalCount(signals.length);
                      
                      const top = signals
                        .filter((s: any) => s.signal_type === 'signal')
                        .sort((a: any, b: any) => b.score - a.score)
                        .slice(0, 3)
                        .map((s: any) => ({
                          title: s.content.substring(0, 50) + (s.content.length > 50 ? '...' : ''),
                          category: s.category || 'General',
                          score: s.score,
                          summary: s.ai_notes || 'No summary available'
                        }));
                      
                      setTopSignals(top);
                      
                      const highValue = signals.filter((s: any) => s.score >= 70).length;
                      const mediumValue = signals.filter((s: any) => s.score >= 40 && s.score < 70).length;
                      const lowValue = signals.filter((s: any) => s.score < 40).length;
                      const total = signals.length || 1;
                      
                      setTimeValueData([
                        { name: 'High Value', value: Math.round((highValue / total) * 100), color: '#10B981' },
                        { name: 'Medium Value', value: Math.round((mediumValue / total) * 100), color: '#F59E0B' },
                        { name: 'Low Value', value: Math.round((lowValue / total) * 100), color: '#EF4444' }
                      ]);
                      
                      const categories = [...new Set(signals.map((s: any) => s.category).filter(Boolean))];
                      setFocusAreas(categories.slice(0, 3));
                      
                      const missed = signals
                        .filter((s: any) => s.score < 50 && s.signal_type === 'signal')
                        .slice(0, 3)
                        .map((s: any) => s.category || 'Uncategorized area');
                      setMissedBlindSpots([...new Set(missed)]);
                      
                      toast({
                        title: "All data cleared",
                        description: "All signals have been deleted. You can start fresh now.",
                      });
                    } catch (error: any) {
                      console.error('Delete error:', error);
                      toast({
                        title: "Error",
                        description: error.message || "Failed to clear data. Please try again.",
                        variant: "destructive",
                      });
                    }
                  }}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete All
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Top Signals */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <TrendingUp className="w-5 h-5 text-green-400" />
            <h3 className="text-xl font-semibold text-white">Top 3 High-Value Signals</h3>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
            </div>
          ) : topSignals.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No signals yet. Process some content in Feed Dump to see insights here.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {topSignals.map((signal, index) => (
              <div key={index} className="p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium text-sm">{signal.title}</h4>
                  <span className="text-green-400 font-bold text-lg">{signal.score}</span>
                </div>
                <p className="text-gray-400 text-xs mb-2">{signal.category}</p>
                <p className="text-gray-300 text-sm">{signal.summary}</p>
              </div>
              ))}
            </div>
          )}
        </div>

        {/* Time/Value Distribution */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Eye className="w-5 h-5 text-cyan-400" />
            <h3 className="text-xl font-semibold text-white">Time/Value Distribution</h3>
          </div>
          
          {loading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-2 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto"></div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={timeValueData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {timeValueData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Missed Blind Spots */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <AlertTriangle className="w-5 h-5 text-yellow-400" />
            <h3 className="text-xl font-semibold text-white">Missed Blind Spots</h3>
          </div>
          
          {missedBlindSpots.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No blind spots identified yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {missedBlindSpots.map((blindSpot, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                <span className="text-white text-sm">{blindSpot}</span>
              </div>
              ))}
            </div>
          )}
        </div>

        {/* Weekly Focus */}
        <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Compass className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-semibold text-white">Suggested Weekly Focus</h3>
          </div>
          
          {focusAreas.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400">No focus areas identified yet.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {focusAreas.map((area, index) => (
              <div key={index} className="p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                <span className="text-purple-300 font-medium">{area}</span>
              </div>
              ))}
            </div>
          )}
          
          {focusAreas.length > 0 && (
            <div className="mt-6 p-4 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <p className="text-cyan-300 text-sm">
                💡 <strong>AI Insight:</strong> Based on your signal patterns, focus on {focusAreas[0]} activities this week for maximum impact.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClarityCompass;
