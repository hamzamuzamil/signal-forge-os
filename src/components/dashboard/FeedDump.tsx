
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { Brain } from 'lucide-react';
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

interface ProcessedSignal extends FilteredSignal {
  emailLabel?: string;
  fullContent: string; // Store full content before truncation
}

// Process content and extract signals
const processContent = (content: string): ProcessedSignal[] => {
  const lines = content.split('\n').filter(line => line.trim().length > 0);
  const signals: ProcessedSignal[] = [];
  
  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;
    
    // Check for email indicators on ORIGINAL content BEFORE truncation
    const contentLower = trimmedLine.toLowerCase();
    const isEmail = contentLower.includes('📧 email from') || 
                   contentLower.includes('email from') ||
                   contentLower.startsWith('subject:') ||
                   (contentLower.includes('subject:') && contentLower.includes('@'));
    
    // Determine email label based on full content (before truncation)
    let emailLabel: string | undefined;
    if (isEmail) {
      // Auto-label based on full content
      if (contentLower.includes('investor') || contentLower.includes('funding') || contentLower.includes('series')) {
        emailLabel = 'opportunity';
      } else if (contentLower.includes('urgent') || contentLower.includes('deadline') || contentLower.includes('decision')) {
        emailLabel = 'decision_needed';
      } else if (contentLower.includes('newsletter') || contentLower.includes('digest') || contentLower.includes('webinar')) {
        emailLabel = 'low_priority';
      } else {
        emailLabel = 'opportunity'; // Default
      }
    }
    
    // Analyze content to determine if it's a signal
    const isSignal = contentLower.includes('funding') || 
                     contentLower.includes('investor') ||
                     contentLower.includes('opportunity') ||
                     contentLower.includes('urgent') ||
                     contentLower.includes('important') ||
                     contentLower.includes('meeting') ||
                     contentLower.includes('deadline') ||
                     contentLower.includes('contract');
    
    // Calculate score based on keywords and content length
    let score = 50; // Base score
    if (isSignal) score += 30;
    if (trimmedLine.length > 100) score += 10;
    if (contentLower.includes('urgent') || contentLower.includes('asap')) score += 15;
    score = Math.min(100, Math.max(20, score));
    
    signals.push({
      id: `signal-${Date.now()}-${index}`,
      content: trimmedLine.substring(0, 200), // Truncate for display
      fullContent: trimmedLine, // Store full content for database
      signalType: isSignal ? 'signal' : 'noise',
      score: score,
      summary: isSignal 
        ? 'High-value content requiring attention' 
        : 'Low-priority content, can be reviewed later',
      suggestedAction: isSignal ? 'read' : 'ignore',
      category: isSignal ? 'Important' : 'General',
      emailLabel: emailLabel, // Store email label determined from full content
    });
  });
  
  return signals;
};

const FeedDump = () => {
  const [feedContent, setFeedContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [filteredSignals, setFilteredSignals] = useState<ProcessedSignal[]>([]);
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
      // Process the content to extract signals
      const signals = processContent(feedContent);
      setFilteredSignals(signals);
      
      // Save signals to database (optional, don't block on errors)
      try {
        if (signals.length > 0) {
          for (const signal of signals) {
            // Use emailLabel that was determined from full content before truncation
            // Save fullContent to database, not the truncated display version
            await api.createSignal({
              content: signal.fullContent, // Save full content, not truncated
              category: signal.category,
              score: signal.score,
              ai_notes: signal.summary,
              signal_type: signal.signalType,
              suggested_action: signal.suggestedAction,
              email_label: signal.emailLabel, // Use pre-determined email label from full content
            });
          }
        }
      } catch (dbError) {
        console.warn('Failed to save signals to database:', dbError);
        // Don't show error to user as the main functionality still works
      }

      toast({
        title: "Feed filtered successfully",
        description: `Found ${signals.filter((s) => s.signalType === 'signal').length} high-value signals.`,
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred while filtering the feed.";
      toast({
        title: "Error filtering feed",
        description: errorMessage,
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
