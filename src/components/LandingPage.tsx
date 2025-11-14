
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ScrollStack, { ScrollStackItem } from '@/components/ui/ScrollStack';
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
  Search,
  Menu,
  X,
  Linkedin,
  Mail,
  Github,
  Sparkles,
  CreditCard
} from 'lucide-react';

interface LandingPageProps {
  onGetStarted: () => void;
}

// Rotating Text Component
const RotatingText = () => {
  const words = ['Intelligence', 'Insights', 'Clarity', 'Focus', 'Excellence', 'Precision'];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative min-w-[200px] text-left">
      <span 
        className={`inline-block text-cyan-400 transition-all duration-300 ${
          isAnimating ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        {words[currentIndex]}
      </span>
    </span>
  );
};

const LandingPage = ({ onGetStarted }: LandingPageProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bubbleMenuOpen, setBubbleMenuOpen] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [expandedCardIndex, setExpandedCardIndex] = useState<number | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const scrollPositionRef = useRef<number>(0);
  const resumeScrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef<number>(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (resumeScrollTimeoutRef.current) {
        clearTimeout(resumeScrollTimeoutRef.current);
        resumeScrollTimeoutRef.current = null;
      }
    };
  }, []);

  // Handle scroll to show/hide menu
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show menu when at top of page
      if (currentScrollY < 50) {
        setIsMenuVisible(true);
      } else {
        // Hide when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down
          setIsMenuVisible(false);
        } else {
          // Scrolling up
          setIsMenuVisible(true);
        }
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Infinite auto-scroll with pause on hover
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scrollContent = container.querySelector('.animate-scroll') as HTMLElement;
    if (!scrollContent) return;

    const scrollSpeed = 0.5; // Increased speed for faster movement

    const scroll = () => {
      if (!container || !scrollContent) {
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
          animationFrameRef.current = null;
        }
        return;
      }

      if (isPaused) {
        animationFrameRef.current = requestAnimationFrame(scroll);
        return;
      }

      scrollPositionRef.current += scrollSpeed;
      const totalWidth = scrollContent.scrollWidth / 2; // Since we duplicate cards

      if (scrollPositionRef.current >= totalWidth) {
        scrollPositionRef.current = 0;
      }

      scrollContent.style.transform = `translateX(-${scrollPositionRef.current}px)`;
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    // Reset scroll position when effect runs
    scrollPositionRef.current = 0;
    animationFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [isPaused]);

  const handleCardClick = (index: number) => {
    const actualIndex = index % benefits.length;
    
    // Clear any existing timeout to prevent race conditions
    if (resumeScrollTimeoutRef.current) {
      clearTimeout(resumeScrollTimeoutRef.current);
      resumeScrollTimeoutRef.current = null;
    }
    
    if (expandedCardIndex === actualIndex) {
      // Collapsing the currently expanded card
      setExpandedCardIndex(null);
      // Resume scrolling after a short delay
      resumeScrollTimeoutRef.current = setTimeout(() => {
        setIsPaused(false);
        resumeScrollTimeoutRef.current = null;
      }, 500);
    } else {
      // Expanding a different card
      setExpandedCardIndex(actualIndex);
      setIsPaused(true);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setBubbleMenuOpen(false);
  };

  const features = [
    {
      icon: Signal,
      title: "Feed Dump",
      description: "Instantly analyze and filter your content intake with AI-powered signal detection.",
      color: "from-blue-500/20 to-cyan-500/20",
      borderColor: "border-blue-500/30",
      iconColor: "text-blue-400"
    },
    {
      icon: Inbox,
      title: "Inbox Signalizer", 
      description: "Smart email categorization with automated priority scoring and action recommendations.",
      color: "from-purple-500/20 to-pink-500/20",
      borderColor: "border-purple-500/30",
      iconColor: "text-purple-400"
    },
    {
      icon: Compass,
      title: "Clarity Compass",
      description: "Decision support system with pattern recognition and strategic insights.",
      color: "from-emerald-500/20 to-teal-500/20",
      borderColor: "border-emerald-500/30",
      iconColor: "text-emerald-400"
    },
    {
      icon: AlertTriangle,
      title: "Focus Alerts",
      description: "Real-time signal monitoring with custom thresholds and priority notifications.",
      color: "from-orange-500/20 to-red-500/20",
      borderColor: "border-orange-500/30",
      iconColor: "text-orange-400"
    },
    {
      icon: Search,
      title: "Blind Spot Scanner",
      description: "Identify gaps in your information flow and discover missed opportunities.",
      color: "from-indigo-500/20 to-violet-500/20",
      borderColor: "border-indigo-500/30",
      iconColor: "text-indigo-400"
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

  const menuItems = [
    { id: 'features', label: 'Features', icon: Signal },
    { id: 'benefits', label: 'Benefits', icon: TrendingUp },
    { id: 'how-it-works', label: 'How It Works', icon: Zap }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden relative">
      {/* Glassmorphism Background Overlay */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(6,182,212,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.08),transparent_50%)] pointer-events-none"></div>
      {/* Navigation Header */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center transition-transform duration-300 ${
          isMenuVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="w-full max-w-5xl mx-auto px-4 pt-3">
          {/* Glass Navigation Container - More Compact */}
          <div className="backdrop-blur-xl bg-slate-800/60 border border-white/10 rounded-xl shadow-2xl px-4 md:px-6 py-2 md:py-2.5">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="text-lg md:text-xl font-bold text-white flex-shrink-0">
                SignalOS
              </div>
              
              {/* Centered Navigation */}
              <nav className="hidden md:flex items-center space-x-6 flex-1 justify-center">
                {menuItems.map((item) => (
                  <button 
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm font-medium text-gray-300 hover:text-white transition-colors duration-300"
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Get Started Button - Hidden on mobile, shown on desktop */}
              <Button 
                onClick={onGetStarted}
                className="hidden md:flex bg-white hover:bg-gray-100 text-gray-900 font-semibold px-4 py-1.5 rounded-lg transition-all duration-300 text-sm flex-shrink-0"
              >
                Get Started
              </Button>

              {/* Mobile Menu Button - Shows on mobile */}
              <button
                onClick={() => setBubbleMenuOpen(!bubbleMenuOpen)}
                className="md:hidden w-8 h-8 flex items-center justify-center text-white hover:text-cyan-400 transition-colors"
              >
                {bubbleMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bubble Menu */}
      {bubbleMenuOpen && (
        <div className="md:hidden fixed bottom-6 right-6 z-40">
          <div className="absolute bottom-16 right-0 mb-2 space-y-2">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-12 h-12 bg-cyan-500/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110"
                  style={{ 
                    animationDelay: `${index * 0.1}s`,
                    animation: 'slideUp 0.3s ease-out forwards'
                  }}
                  title={item.label}
                >
                  <Icon className="h-5 w-5" />
                </button>
              );
            })}
            <button
              onClick={onGetStarted}
              className="block w-12 h-12 bg-cyan-500/90 backdrop-blur-md rounded-full flex items-center justify-center text-white shadow-lg hover:bg-cyan-600 transition-all duration-300 transform hover:scale-110"
              style={{ animationDelay: `${menuItems.length * 0.1}s` }}
              title="Get Started"
            >
              <Sparkles className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 pt-20 pb-20">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/30 via-transparent to-black/50"></div>
        
        <div className={`max-w-6xl mx-auto text-center z-10 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight pb-4">
              Signal <RotatingText />
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed py-2">
            An intelligent signal processing platform that helps you filter through information noise and focus on what truly matters in your digital workspace.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
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
      </section>

      {/* Features Section with Scroll Stack */}
      <section id="features" className="py-20 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white pb-2">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed py-2">
              Five specialized modules designed to transform how you process and act on information
            </p>
          </div>

          <ScrollStack
            useWindowScroll={true}
            itemDistance={150}
            itemScale={0.04}
            itemStackDistance={40}
            stackPosition="30%"
            scaleEndPosition="15%"
            baseScale={0.88}
            rotationAmount={2}
            blurAmount={2}
            className="scroll-stack-features"
          >
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <ScrollStackItem
                  key={index}
                  itemClassName={`bg-gradient-to-r ${feature.color} backdrop-blur-xl border ${feature.borderColor} shadow-2xl`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`${feature.iconColor} flex-shrink-0`}>
                      <Icon className="h-16 w-16" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-semibold text-white mb-3">{feature.title}</h3>
                      <p className="text-gray-300 leading-relaxed text-lg">{feature.description}</p>
                    </div>
                  </div>
                </ScrollStackItem>
              );
            })}
          </ScrollStack>
        </div>
      </section>

      {/* Benefits Section - Infinite Scroll Premium Cards */}
      <section id="benefits" className="py-20 px-4">
        <div className="max-w-7xl mx-auto w-full">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white pb-2">
              Why Signal Intelligence?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed py-2">
              Built for professionals who need to process vast amounts of information efficiently
            </p>
          </div>

          {/* Infinite Scroll Container */}
          <div 
            ref={containerRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => {
              if (expandedCardIndex === null) {
                setIsPaused(false);
              }
            }}
            className="overflow-x-hidden scrollbar-hide relative py-8"
          >
            <div className="flex gap-4 md:gap-6 animate-scroll items-center" style={{ willChange: 'transform' }}>
              {/* Duplicate cards for infinite scroll */}
              {[...benefits, ...benefits].map((benefit, index) => {
                const Icon = benefit.icon;
                const cardIndex = index % benefits.length;
                const isExpanded = expandedCardIndex === cardIndex;
                
                // Exact colors from reference: deep red, rose gold, dark blue, black, lighter blue
                const cardStyles = [
                  {
                    bg: '#8B0000', // Deep red
                    iconColor: '#FFFFFF',
                    glow: '0 0 40px rgba(139, 0, 0, 0.5)'
                  },
                  {
                    bg: '#E8B4B8', // Rose gold
                    iconColor: '#5C2E35',
                    glow: '0 0 40px rgba(232, 180, 184, 0.5)'
                  },
                  {
                    bg: '#1E3A8A', // Dark blue
                    iconColor: '#FFFFFF',
                    glow: '0 0 40px rgba(30, 58, 138, 0.5)'
                  },
                  {
                    bg: '#000000', // Black
                    iconColor: '#FFFFFF',
                    glow: '0 0 40px rgba(0, 0, 0, 0.6)'
                  },
                  {
                    bg: '#3B82F6', // Lighter blue
                    iconColor: '#FFFFFF',
                    glow: '0 0 40px rgba(59, 130, 246, 0.5)'
                  },
                  {
                    bg: '#7C3AED', // Purple (6th card)
                    iconColor: '#FFFFFF',
                    glow: '0 0 40px rgba(124, 58, 237, 0.5)'
                  }
                ];
                
                const style = cardStyles[cardIndex % cardStyles.length];
                
                return (
                  <div
                    key={index}
                    onClick={() => handleCardClick(index)}
                    className={`flex-shrink-0 rounded-2xl shadow-2xl transition-all duration-500 group cursor-pointer relative overflow-hidden ${
                      isExpanded ? 'z-50' : ''
                    }`}
                    style={{
                      backgroundColor: style.bg,
                      width: '224px', // w-56
                      height: isExpanded ? 'auto' : '336px', // Portrait orientation like credit cards
                      minHeight: isExpanded ? '500px' : '336px',
                      transform: isExpanded 
                        ? 'scale(1.15) translateY(-20px)' 
                        : 'scale(1)',
                      transition: 'all 0.5s ease',
                      boxShadow: isExpanded ? style.glow : '0 20px 40px -12px rgba(0, 0, 0, 0.4)'
                    }}
                    onMouseEnter={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.style.transform = 'scale(1.08) translateY(-10px)';
                        e.currentTarget.style.boxShadow = style.glow;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isExpanded) {
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.boxShadow = '0 20px 40px -12px rgba(0, 0, 0, 0.4)';
                      }
                    }}
                  >
                    {/* Metallic shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none rounded-2xl" />
                    
                    <div className="relative z-10 flex flex-col h-full p-6 md:p-8">
                      {/* Chip at top left */}
                      <div className="absolute top-4 left-4">
                        <div 
                          className="w-10 h-8 rounded-md flex items-center justify-center"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          <CreditCard className="h-5 w-5" style={{ color: style.iconColor }} />
                        </div>
                      </div>
                      
                      {/* Large centered icon/logo */}
                      <div className="flex-1 flex items-center justify-center">
                        <div 
                          className="w-24 h-24 md:w-28 md:h-28 rounded-full flex items-center justify-center"
                          style={{
                            backgroundColor: 'rgba(255, 255, 255, 0.15)',
                            backdropFilter: 'blur(10px)'
                          }}
                        >
                          <Icon className="h-14 w-14 md:h-16 md:w-16" style={{ color: style.iconColor }} />
                        </div>
                      </div>
                      
                      {/* Title at bottom */}
                      <div className="mt-auto">
                        {isExpanded ? (
                          <div className="space-y-3 animate-fadeIn">
                            <h3 
                              className="text-lg md:text-xl font-bold mb-2"
                              style={{ color: style.iconColor }}
                            >
                              {benefit.title}
                            </h3>
                            <p 
                              className="text-sm md:text-base leading-relaxed mb-3"
                              style={{ color: `${style.iconColor}DD` }}
                            >
                              {benefit.description}
                            </p>
                            <p 
                              className="text-xs italic"
                              style={{ color: `${style.iconColor}AA` }}
                            >
                              Click to collapse
                            </p>
                          </div>
                        ) : (
                          <>
                            <h3 
                              className="text-lg md:text-xl font-bold mb-2"
                              style={{ color: style.iconColor }}
                            >
                              {benefit.title}
                            </h3>
                            <p 
                              className="text-xs italic"
                              style={{ color: `${style.iconColor}AA` }}
                            >
                              Click to expand
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white pb-2">
              How It Works
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed py-2">
              Simple, powerful, and designed for immediate impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 mx-auto mb-4 bg-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Input Your Data</h3>
              <p className="text-gray-400">Paste your content, emails, or feeds into Signal Intelligence</p>
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
      <section className="py-20 px-4 bg-white/5 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white pb-2">
            Ready to Transform Your Workflow?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed py-2">
            Join thousands of professionals who have already revolutionized their information processing with Signal Intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg"
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
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-gray-400 text-sm">
              Built by <span className="text-cyan-400 font-semibold">Hamza</span> • © 2025
            </div>
            
            <div className="flex items-center gap-6">
              <a 
                href="https://www.linkedin.com/in/muhammad-hamza-bhutta/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:hamzamuzamil21@gmail.com"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                aria-label="Email"
              >
                <Mail className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com/hamzamuzamil" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                aria-label="GitHub"
              >
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
