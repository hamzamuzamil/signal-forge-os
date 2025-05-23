
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Search, Target, Lightbulb, AlertTriangle, Plus, X } from 'lucide-react';

const BlindSpotScanner = () => {
  const [goals, setGoals] = useState<string[]>(['']);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const { toast } = useToast();

  const addGoal = () => {
    if (goals.length < 3) {
      setGoals([...goals, '']);
    }
  };

  const updateGoal = (index: number, value: string) => {
    const newGoals = [...goals];
    newGoals[index] = value;
    setGoals(newGoals);
  };

  const removeGoal = (index: number) => {
    if (goals.length > 1) {
      setGoals(goals.filter((_, i) => i !== index));
    }
  };

  const analyzeBlindSpots = async () => {
    const validGoals = goals.filter(goal => goal.trim());
    
    if (validGoals.length === 0) {
      toast({
        title: "No goals entered",
        description: "Please enter at least one goal to analyze.",
        variant: "destructive",
      });
      return;
    }

    setAnalyzing(true);
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockAnalysis = {
        goals: validGoals,
        missingAreas: [
          {
            title: "Competitive Intelligence",
            description: "Limited tracking of competitor product launches and pricing strategies",
            priority: "High",
            suggestedActions: [
              "Set up Google Alerts for key competitors",
              "Subscribe to industry newsletters",
              "Schedule quarterly competitor analysis"
            ]
          },
          {
            title: "Customer Success Metrics",
            description: "Insufficient monitoring of customer health scores and churn indicators",
            priority: "Medium",
            suggestedActions: [
              "Implement NPS tracking",
              "Create customer health dashboard",
              "Establish quarterly business reviews"
            ]
          },
          {
            title: "Technical Debt Assessment",
            description: "Lack of systematic evaluation of code quality and infrastructure scalability",
            priority: "Medium",
            suggestedActions: [
              "Schedule monthly technical reviews",
              "Implement automated code quality metrics",
              "Create infrastructure scaling roadmap"
            ]
          }
        ],
        recommendations: [
          "Allocate 20% of weekly research time to competitive analysis",
          "Implement automated alerts for customer health score changes",
          "Schedule monthly technical debt assessment meetings"
        ]
      };
      
      setAnalysis(mockAnalysis);
      setAnalyzing(false);
      
      toast({
        title: "Blind spot analysis complete",
        description: `Found ${mockAnalysis.missingAreas.length} potential information gaps.`,
      });
    }, 3000);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-green-400 bg-green-500/20 border-green-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Search className="w-8 h-8 text-cyan-400" />
          <h2 className="text-3xl font-bold text-white">Blind Spot Scanner</h2>
        </div>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Enter your key goals and let AI identify information gaps that might be hindering your progress.
        </p>
      </div>

      {/* Goal Input */}
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="flex items-center space-x-2 mb-6">
          <Target className="w-5 h-5 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Your Current Goals</h3>
        </div>

        <div className="space-y-4">
          {goals.map((goal, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="flex-1">
                <Input
                  placeholder={`Goal ${index + 1} (e.g., raise Series A, hire 5 engineers, launch v2.0)`}
                  value={goal}
                  onChange={(e) => updateGoal(index, e.target.value)}
                  className="bg-white/5 border-white/20 text-white placeholder:text-gray-400 focus:border-cyan-400"
                />
              </div>
              {goals.length > 1 && (
                <Button
                  onClick={() => removeGoal(index)}
                  variant="outline"
                  size="sm"
                  className="border-red-500/30 text-red-400 hover:bg-red-500/10"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}

          <div className="flex justify-between items-center pt-4">
            <Button
              onClick={addGoal}
              disabled={goals.length >= 3}
              variant="outline"
              size="sm"
              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Goal {goals.length < 3 && `(${3 - goals.length} remaining)`}
            </Button>

            <Button
              onClick={analyzeBlindSpots}
              disabled={analyzing || !goals.some(g => g.trim())}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white"
            >
              {analyzing ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                  <span>Scanning...</span>
                </div>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Analyze Blind Spots
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Analysis Results */}
      {analysis && (
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Analysis Results</h3>
            <p className="text-gray-400">
              Based on your goals, here are potential information blind spots:
            </p>
          </div>

          {/* Missing Information Areas */}
          <div className="grid gap-6">
            {analysis.missingAreas.map((area: any, index: number) => (
              <div key={index} className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <h4 className="text-lg font-semibold text-white">{area.title}</h4>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPriorityColor(area.priority)}`}>
                    {area.priority} Priority
                  </span>
                </div>

                <p className="text-gray-300 mb-4">{area.description}</p>

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-cyan-400 flex items-center">
                    <Lightbulb className="w-4 h-4 mr-2" />
                    Suggested Actions:
                  </h5>
                  <ul className="space-y-1 ml-6">
                    {area.suggestedActions.map((action: string, actionIndex: number) => (
                      <li key={actionIndex} className="text-gray-300 text-sm flex items-start">
                        <span className="w-1 h-1 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Overall Recommendations */}
          <div className="backdrop-blur-xl bg-cyan-500/10 border border-cyan-500/30 rounded-2xl p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Lightbulb className="w-5 h-5 text-cyan-400" />
              <h4 className="text-lg font-semibold text-white">AI Recommendations</h4>
            </div>
            <ul className="space-y-3">
              {analysis.recommendations.map((rec: string, index: number) => (
                <li key={index} className="text-cyan-300 flex items-start">
                  <span className="w-2 h-2 bg-cyan-400 rounded-full mt-1.5 mr-3 flex-shrink-0"></span>
                  {rec}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default BlindSpotScanner;
