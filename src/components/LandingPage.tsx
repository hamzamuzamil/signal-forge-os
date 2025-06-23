
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Brain, 
  Filter, 
  Zap, 
  Shield, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Signal,
  Inbox,
  Compass,
  AlertTriangle,
  Search
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Signal,
      title: "Feed Dump",
      description: "Instantly analyze and filter your content intake with AI-powered signal detection."
    },
    {
      icon: Inbox,
      title: "Inbox Signalizer", 
      description: "Smart email categorization with automated priority scoring and action recommendations."
    },
    {
      icon: Compass,
      title: "Clarity Compass",
      description: "Decision support system with pattern recognition and strategic insights."
    },
    {
      icon: AlertTriangle,
      title: "Focus Alerts",
      description: "Real-time signal monitoring with custom thresholds and priority notifications."
    },
    {
      icon: Search,
      title: "Blind Spot Scanner",
      description: "Identify gaps in your information flow and discover missed opportunities."
    }
  ];

  const benefits = [
    {
      icon: Brain,
      title: "AI-Powered Intelligence",
      description: "Advanced machine learning algorithms analyze your content in real-time"
    },
    {
      icon: Filter,
      title: "Noise Elimination",
      description: "Filter out irrelevant information and focus on what truly matters"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant processing with optimized performance for seamless workflows"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Enterprise-grade security with complete data privacy protection"
    },
    {
      icon: TrendingUp,
      title: "Productivity Boost",
      description: "Increase your decision-making speed by up to 10x with smart insights"
    },
    {
      icon: Clock,
      title: "Time Optimization",
      description: "Reclaim hours of your day by automating information processing"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-blue-500/10 animate-pulse"></div>
        
        <div className={`max-w-6xl mx-auto text-center z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-6 leading-tight">
              SignalForge OS
            </h1>
            <div className="h-1 w-32 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-8 rounded-full"></div>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            An intelligent signal processing platform that helps you filter through information noise and focus on what truly matters in your digital workspace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline"
              size="lg"
              className="border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 px-8 py-4 rounded-lg transition-all duration-300"
            >
              Watch Demo
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400 mb-2">10x</div>
              <div className="text-gray-400">Faster Decisions</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">90%</div>
              <div className="text-gray-400">Noise Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">5min</div>
              <div className="text-gray-400">Setup Time</div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-cyan-500/20 rounded-full blur-xl animate-bounce"></div>
        <div className="absolute bottom-20 right-10 w-16 h-16 bg-blue-500/20 rounded-full blur-xl animate-bounce delay-1000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Five specialized modules designed to transform how you process and act on information
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-gray-900/50 border-gray-700 hover:border-cyan-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm">
                <CardContent className="p-6">
                  <feature.icon className="h-12 w-12 text-cyan-400 mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-black/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Why SignalForge OS?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Built for professionals who need to process vast amounts of information efficiently
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center group">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Simple, powerful, and designed for immediate impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Input Your Data</h3>
              <p className="text-gray-400">Paste your content, emails, or feeds into SignalForge OS</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">AI Analysis</h3>
              <p className="text-gray-400">Our AI instantly processes and categorizes your information</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Get Insights</h3>
              <p className="text-gray-400">Receive actionable insights and filtered results immediately</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-600/20 via-blue-600/20 to-purple-600/20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have already revolutionized their information processing with SignalForge OS.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-2xl"
            >
              Start Free Today <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          <div className="flex justify-center items-center mt-8 space-x-6 text-gray-400">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              No Credit Card Required
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              5-Minute Setup
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              Instant Results
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              SignalForge OS
            </h3>
            <p className="text-gray-400 mt-2">Intelligent Signal Processing Platform</p>
          </div>
          
          <div className="text-gray-500 text-sm">
            © 2024 SignalForge OS. All rights reserved. Built with modern technology for the future of work.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
