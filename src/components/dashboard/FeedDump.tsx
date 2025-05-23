
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Brain, Sparkles } from 'lucide-react';
import SignalCard from './SignalCard';

interface FilteredSignal {
  id: string;
  content: string;
  signalType: 'signal' | 'noise';
  score: number;
  summary: string;
  suggestedAction: 'read' | 'save' | 'ignore';
  category: string;
}

const FeedDump = () => {
  const [feedContent, setFeedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredSignals, setFilteredSignals] = useState<FilteredSignal[]>([]);
  const { toast } = useToast();

  const handleFilterFeed = async () => {
    if (!feedContent.trim()) {
      toast({
        title: "No content to filter",
        description: "Please paste some content to analyze.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('filter-signals', {
        body: { content: feedContent }
      });

      if (error) throw error;

      setFilteredSignals(data.signals);
      
      // Save signals to database
      for (const signal of data.signals) {
        await supabase.from('signals').insert({
          user_id: (await supabase.auth.getUser()).data.user?.id,
          content: signal.content,
          category: signal.category,
          score: signal.score,
          ai_notes: signal.summary,
          signal_type: signal.signalType,
          suggested_action: signal.suggestedAction,
        });
      }

      toast({
        title: "Feed filtered successfully",
        description: `Found ${data.signals.filter((s: any) => s.signalType === 'signal').length} high-value signals.`,
      });
    } catch (error: any) {
      toast({
        title: "Error filtering feed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Brain className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Feed Dump</h2>
          <Sparkles className="w-6 h-6 text-yellow-400" />
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Paste your daily content intake - emails, tweets, articles, notifications. 
          Our AI will filter the noise and highlight high-signal items.
        </p>
      </div>

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-8 shadow-2xl">
        <div className="space-y-6">
          <Textarea
            placeholder="Paste your feed content here... (emails, tweets, articles, etc.)"
            value={feedContent}
            onChange={(e) => setFeedContent(e.target.value)}
            className="min-h-[200px] bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400 transition-all duration-300 resize-none"
          />
          
          <Button
            onClick={handleFilterFeed}
            disabled={loading || !feedContent.trim()}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                <span>Filtering Your Feed...</span>
              </div>
            ) : (
              'Filter My Feed'
            )}
          </Button>
        </div>
      </div>

      {filteredSignals.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-white mb-4">Filtered Results</h3>
          <div className="grid gap-4">
            {filteredSignals.map((signal) => (
              <SignalCard key={signal.id} signal={signal} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedDump;
