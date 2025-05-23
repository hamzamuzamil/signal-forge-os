
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Mail, CheckCircle, AlertCircle, Clock, Trash2 } from 'lucide-react';

interface MockEmail {
  id: string;
  subject: string;
  sender: string;
  preview: string;
  aiLabel: 'opportunity' | 'low_priority' | 'ignore' | 'decision_needed';
  timestamp: string;
  userConfirmed?: boolean;
}

const mockEmails: MockEmail[] = [
  {
    id: '1',
    subject: 'Series A Follow-up from Andreessen Horowitz',
    sender: 'sarah@a16z.com',
    preview: 'Hi there! Following up on our conversation about your startup. We\'d love to schedule a deeper dive...',
    aiLabel: 'opportunity',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    subject: 'Newsletter: The weekly startup digest',
    sender: 'digest@startupnews.com',
    preview: 'This week in startup land: funding rounds, exits, and market trends...',
    aiLabel: 'low_priority',
    timestamp: '5 hours ago'
  },
  {
    id: '3',
    subject: 'Re: Contract terms discussion',
    sender: 'legal@bigcorp.com',
    preview: 'We\'ve reviewed the proposed changes and need your decision by end of week...',
    aiLabel: 'decision_needed',
    timestamp: '1 day ago'
  },
  {
    id: '4',
    subject: 'Webinar: Growth hacking tactics',
    sender: 'events@growthco.com',
    preview: 'Join us for an exclusive webinar on scaling your startup with proven tactics...',
    aiLabel: 'ignore',
    timestamp: '2 days ago'
  }
];

const InboxSignalizer = () => {
  const [emails, setEmails] = useState<MockEmail[]>(mockEmails);
  const { toast } = useToast();

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
        ? { ...e, aiLabel: newLabel as any || e.aiLabel, userConfirmed: true }
        : e
    );
    setEmails(updatedEmails);

    // Save to database
    try {
      await supabase.from('signals').insert({
        user_id: (await supabase.auth.getUser()).data.user?.id,
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
    } catch (error: any) {
      toast({
        title: "Error saving feedback",
        description: error.message,
        variant: "destructive",
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
        <p className="text-gray-400 max-w-2xl mx-auto">
          AI-labeled email feed with smart categorization. Confirm or reassign labels to improve AI accuracy.
        </p>
      </div>

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
    </div>
  );
};

export default InboxSignalizer;
