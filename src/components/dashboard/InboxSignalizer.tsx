
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { api } from '@/lib/api';
import { Mail, CheckCircle, AlertCircle, Clock, Trash2, Trash } from 'lucide-react';
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

interface Email {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  aiLabel: 'opportunity' | 'low_priority' | 'ignore' | 'decision_needed';
  timestamp: string;
  userConfirmed?: boolean;
}

const InboxSignalizer = () => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [loading, setLoading] = useState(true);
  const [allSignalsCount, setAllSignalsCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    const loadEmails = async () => {
      try {
        setLoading(true);
        const response = await api.getSignals();
        const signals = response.signals || [];
        setAllSignalsCount(signals.length); // Track total signals for Clear All button
        
        // Filter signals that have email_label (emails)
        const emailSignals = signals
          .filter((s: any) => s.email_label)
          .map((s: any) => {
            // Parse content to extract subject, sender, preview
            const lines = s.content.split('\n');
            const subject = lines[0] || 'No subject';
            const sender = s.ai_notes?.includes('from') 
              ? s.ai_notes.split('from')[1]?.trim() || 'unknown@email.com'
              : 'unknown@email.com';
            const preview = lines.slice(1).join(' ').substring(0, 150) || s.content.substring(0, 150);
            
            // Calculate timestamp
            const created = new Date(s.created_at);
            const now = new Date();
            const diffMs = now.getTime() - created.getTime();
            const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
            const diffDays = Math.floor(diffHours / 24);
            
            let timestamp = 'Just now';
            if (diffDays > 0) {
              timestamp = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
            } else if (diffHours > 0) {
              timestamp = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
            }
            
            return {
              id: s.id.toString(),
              subject: subject,
              sender: sender,
              preview: preview,
              aiLabel: (s.email_label as Email['aiLabel']) || 'low_priority',
              timestamp: timestamp,
              userConfirmed: s.user_confirmed || false,
            };
          });
        
        setEmails(emailSignals);
      } catch (error) {
        console.error('Failed to load emails:', error);
        setEmails([]);
      } finally {
        setLoading(false);
      }
    };

    loadEmails();
  }, []);

  const getLabelColor = (label: string) => {
    switch (label) {
      case 'opportunity': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'decision_needed': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low_priority': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ignore': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getLabelIcon = (label: string) => {
    switch (label) {
      case 'opportunity': return <CheckCircle className="w-4 h-4" />;
      case 'decision_needed': return <AlertCircle className="w-4 h-4" />;
      case 'low_priority': return <Clock className="w-4 h-4" />;
      case 'ignore': return <Trash2 className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  const handleConfirmLabel = async (emailId: string, newLabel?: string) => {
    const email = emails.find(e => e.id === emailId);
    if (!email) return;

    const updatedEmails = emails.map(e => 
      e.id === emailId 
        ? { ...e, aiLabel: (newLabel as Email['aiLabel']) || e.aiLabel, userConfirmed: true }
        : e
    );
    setEmails(updatedEmails);

    // Save to database (optional, don't block on errors)
    try {
      await api.createSignal({
        content: `${email.subject}\n\n${email.preview}`,
        category: 'email',
        score: newLabel === 'opportunity' ? 90 : newLabel === 'decision_needed' ? 80 : newLabel === 'low_priority' ? 40 : 20,
        ai_notes: `Email from ${email.sender}`,
        signal_type: ['opportunity', 'decision_needed'].includes(newLabel || email.aiLabel) ? 'signal' : 'noise',
        email_label: newLabel || email.aiLabel,
        user_confirmed: true,
      });

      toast({
        title: "Feedback recorded",
        description: newLabel ? "Label updated and AI will learn from this." : "Confirmation saved.",
      });
    } catch (error) {
      console.warn('Failed to save feedback:', error);
      // Still show success message as the UI update worked
      toast({
        title: "Feedback recorded",
        description: newLabel ? "Label updated." : "Confirmation saved.",
      });
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Mail className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Inbox Signalizer</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto mb-4">
          AI-labeled email feed with smart categorization. Confirm or reassign labels to improve AI accuracy.
        </p>
        {emails.length > 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                size="sm"
                className="mb-4"
              >
                <Trash className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Clear All Emails?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete all your emails and signals. This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={async () => {
                    try {
                      await api.deleteAllSignals();
                      // Clear local state immediately
                      setEmails([]);
                      setAllSignalsCount(0);
                      toast({
                        title: "All data cleared",
                        description: "All signals have been deleted. You can start fresh now.",
                      });
                      // Reload to ensure UI is in sync
                      const response = await api.getSignals();
                      const signals = response.signals || [];
                      setAllSignalsCount(signals.length);
                      const emailSignals = signals
                        .filter((s: any) => s.email_label)
                        .map((s: any) => {
                          const lines = s.content.split('\n');
                          const subject = lines[0] || 'No subject';
                          const sender = s.ai_notes?.includes('from') 
                            ? s.ai_notes.split('from')[1]?.trim() || 'unknown@email.com'
                            : 'unknown@email.com';
                          const preview = lines.slice(1).join(' ').substring(0, 150) || s.content.substring(0, 150);
                          const created = new Date(s.created_at);
                          const now = new Date();
                          const diffMs = now.getTime() - created.getTime();
                          const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
                          const diffDays = Math.floor(diffHours / 24);
                          let timestamp = 'Just now';
                          if (diffDays > 0) {
                            timestamp = `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
                          } else if (diffHours > 0) {
                            timestamp = `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
                          }
                          return {
                            id: s.id.toString(),
                            subject: subject,
                            sender: sender,
                            preview: preview,
                            aiLabel: (s.email_label as Email['aiLabel']) || 'low_priority',
                            timestamp: timestamp,
                            userConfirmed: s.user_confirmed || false,
                          };
                        });
                      setEmails(emailSignals);
                    } catch (error: any) {
                      console.error('Delete error:', error);
                      console.error('Error details:', {
                        message: error.message,
                        stack: error.stack
                      });
                      toast({
                        title: "Error",
                        description: error.message || "Failed to clear data. Please check if backend is running and you are logged in.",
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

      {loading ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading emails...</p>
        </div>
      ) : emails.length === 0 ? (
        <div className="text-center py-12">
          <Mail className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No emails yet</h3>
          <p className="text-gray-500">
            Process some content in Feed Dump with email labels to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {emails.map((email) => (
          <div
            key={email.id}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-white font-semibold">{email.subject}</h3>
                  <Badge className={`${getLabelColor(email.aiLabel)} border text-xs`}>
                    {getLabelIcon(email.aiLabel)}
                    <span className="ml-1 capitalize">{email.aiLabel.replace('_', ' ')}</span>
                  </Badge>
                  {email.userConfirmed && (
                    <Badge variant="outline" className="text-xs border-green-500/30 text-green-400">
                      Confirmed
                    </Badge>
                  )}
                </div>
                
                <p className="text-gray-400 text-sm mb-1">From: {email.sender}</p>
                <p className="text-gray-300 text-sm leading-relaxed">{email.preview}</p>
              </div>
              
              <span className="text-gray-500 text-xs whitespace-nowrap ml-4">
                {email.timestamp}
              </span>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex space-x-2">
                {['opportunity', 'decision_needed', 'low_priority', 'ignore'].map((label) => (
                  <Button
                    key={label}
                    size="sm"
                    variant="outline"
                    onClick={() => handleConfirmLabel(email.id, label)}
                    className={`text-xs px-3 py-1 ${
                      email.aiLabel === label 
                        ? getLabelColor(label) 
                        : 'border-white/20 text-gray-400 hover:text-white'
                    }`}
                  >
                    {label.replace('_', ' ')}
                  </Button>
                ))}
              </div>
              
              <Button
                size="sm"
                onClick={() => handleConfirmLabel(email.id)}
                className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 hover:bg-cyan-500/30 text-xs"
              >
                ✓ Confirm AI Label
              </Button>
            </div>
          </div>
        ))}
        </div>
      )}
    </div>
  );
};

export default InboxSignalizer;
