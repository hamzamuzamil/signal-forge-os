
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, TrendingDown, Eye, Bookmark, X } from 'lucide-react';

interface Signal {
  id: string;
  content: string;
  signalType: 'signal' | 'noise';
  score: number;
  summary: string;
  suggestedAction: 'read' | 'save' | 'ignore';
  category: string;
}

interface SignalCardProps {
  signal: Signal;
}

const SignalCard = ({ signal }: SignalCardProps) => {
  const isSignal = signal.signalType === 'signal';
  const { toast } = useToast();
  
  const handleAction = (action: string) => {
    switch (action) {
      case 'read':
        toast({
          title: "Marked as Read",
          description: "This signal has been marked as read and saved.",
        });
        break;
      case 'save':
        toast({
          title: "Saved",
          description: "This signal has been saved for later review.",
        });
        break;
      case 'ignore':
        toast({
          title: "Ignored",
          description: "This signal has been marked as ignored.",
        });
        break;
    }
  };
  
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'read': return <Eye className="w-4 h-4" />;
      case 'save': return <Bookmark className="w-4 h-4" />;
      case 'ignore': return <X className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'read': return 'from-blue-500 to-cyan-500';
      case 'save': return 'from-green-500 to-emerald-500';
      case 'ignore': return 'from-red-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className={`backdrop-blur-xl border rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
      isSignal 
        ? 'bg-cyan-500/5 border-cyan-500/30 shadow-cyan-500/10' 
        : 'bg-red-500/5 border-red-500/30 shadow-red-500/10'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {isSignal ? (
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          ) : (
            <TrendingDown className="w-5 h-5 text-red-400" />
          )}
          <Badge variant={isSignal ? "default" : "destructive"} className="text-xs">
            {isSignal ? 'SIGNAL' : 'NOISE'}
          </Badge>
          <Badge variant="outline" className="text-xs border-white/20 text-gray-300">
            {signal.category}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className={`text-2xl font-bold ${getScoreColor(signal.score)}`}>
            {signal.score}
          </span>
          <span className="text-gray-400 text-sm">/100</span>
        </div>
      </div>

      <div className="space-y-4">
        <p className="text-gray-300 text-sm leading-relaxed">
          {signal.content.length > 200 ? `${signal.content.substring(0, 200)}...` : signal.content}
        </p>
        
        <div className="p-3 bg-white/5 rounded-lg border border-white/10">
          <p className="text-white font-medium text-sm">{signal.summary}</p>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-xs">
            AI Recommendation
          </span>
          <Button
            size="sm"
            onClick={() => handleAction(signal.suggestedAction)}
            className={`bg-gradient-to-r ${getActionColor(signal.suggestedAction)} text-white text-xs px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105`}
          >
            {getActionIcon(signal.suggestedAction)}
            <span className="ml-2 capitalize">{signal.suggestedAction}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignalCard;
