import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AssessmentCard from './components/AssessmentCard';
import QuickStartSection from './components/QuickStartSection';
import ProgressTracker from './components/ProgressTracker';
import AssessmentFilters from './components/AssessmentFilters';
import RecentActivity from './components/RecentActivity';
import AssessmentStats from './components/AssessmentStats';

const AssessmentPortal = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Mock assessment data
  const assessments = [
    {
      id: 'adhd-comprehensive',
      title: 'ADHD Comprehensive Assessment',
      category: 'ADHD',
      description: 'Complete evaluation for Attention Deficit Hyperactivity Disorder including attention span, hyperactivity, and impulsivity measures with adaptive questioning.',
      icon: 'Brain',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
      duration: '25-35 min',
      ageRange: '6-18 years',
      difficulty: 'Intermediate',
      features: ['Adaptive Questions', 'Real-time Analysis', 'Gamified Interface', 'Progress Tracking', 'Detailed Report'],
      isRecommended: true,
      completionRate: 0
    },
    {
      id: 'dyslexia-reading',
      title: 'Dyslexia Reading Assessment',
      category: 'Dyslexia',
      description: 'Specialized screening for reading difficulties, phonological awareness, and language processing challenges with interactive reading tasks.',
      icon: 'BookOpen',
      bgColor: 'bg-empowerment-green/10',
      iconColor: 'text-empowerment-green',
      duration: '20-30 min',
      ageRange: '7-16 years',
      difficulty: 'Beginner',
      features: ['Interactive Reading', 'Phonics Assessment', 'Comprehension Tests', 'Audio Support'],
      isRecommended: false,
      completionRate: 60
    },
    {
      id: 'dyscalculia-math',
      title: 'Dyscalculia Math Assessment',
      category: 'Dyscalculia',
      description: 'Comprehensive evaluation of mathematical learning difficulties including number sense, calculation skills, and mathematical reasoning.',
      icon: 'Calculator',
      bgColor: 'bg-illumination-gold/10',
      iconColor: 'text-illumination-gold',
      duration: '30-40 min',
      ageRange: '8-18 years',
      difficulty: 'Advanced',
      features: ['Number Recognition', 'Calculation Tests', 'Problem Solving', 'Visual Math'],
      isRecommended: true,
      completionRate: 0
    },
    {
      id: 'dysgraphia-writing',
      title: 'Dysgraphia Writing Assessment',
      category: 'Dysgraphia',
      description: 'Detailed evaluation of writing difficulties including fine motor skills, handwriting quality, and written expression abilities.',
      icon: 'PenTool',
      bgColor: 'bg-authority-purple/10',
      iconColor: 'text-authority-purple',
      duration: '25-35 min',
      ageRange: '6-16 years',
      difficulty: 'Intermediate',
      features: ['Handwriting Analysis', 'Motor Skills Test', 'Writing Speed', 'Expression Evaluation'],
      isRecommended: false,
      completionRate: 0
    },
    {
      id: 'adhd-quick',
      title: 'ADHD Quick Screening',
      category: 'ADHD',
      description: 'Brief initial screening for ADHD symptoms to identify potential attention and hyperactivity concerns quickly.',
      icon: 'Zap',
      bgColor: 'bg-action-red/10',
      iconColor: 'text-action-red',
      duration: '10-15 min',
      ageRange: '6-18 years',
      difficulty: 'Beginner',
      features: ['Quick Results', 'Parent Input', 'Teacher Feedback', 'Behavioral Checklist'],
      isRecommended: false,
      completionRate: 100
    },
    {
      id: 'comprehensive-screening',
      title: 'Multi-Disability Screening',
      category: 'Comprehensive',
      description: 'Complete assessment covering all four learning disabilities with AI-powered analysis and personalized recommendations.',
      icon: 'Sparkles',
      bgColor: 'bg-gradient-primary',
      iconColor: 'text-white',
      duration: '60-75 min',
      ageRange: '6-18 years',
      difficulty: 'Advanced',
      features: ['AI Analysis', 'Complete Coverage', 'Detailed Insights', 'Professional Report', 'Intervention Plans'],
      isRecommended: true,
      completionRate: 0
    }
  ];

  const recentAssessments = [
    {
      id: 'adhd-comprehensive',
      title: 'ADHD Assessment',
      icon: 'Brain',
      bgColor: 'bg-primary/10',
      iconColor: 'text-primary',
      progress: 100,
      lastAccessed: '2 hours ago'
    },
    {
      id: 'dyslexia-reading',
      title: 'Dyslexia Assessment',
      icon: 'BookOpen',
      bgColor: 'bg-empowerment-green/10',
      iconColor: 'text-empowerment-green',
      progress: 60,
      lastAccessed: '1 day ago'
    }
  ];

  // Filter assessments based on active filters and search
  const filteredAssessments = assessments?.filter(assessment => {
    // Search filter
    if (searchQuery && !assessment?.title?.toLowerCase()?.includes(searchQuery?.toLowerCase()) &&
        !assessment?.description?.toLowerCase()?.includes(searchQuery?.toLowerCase())) {
      return false;
    }

    // Category filter
    if (activeFilters?.category && activeFilters?.category !== 'all' && 
        assessment?.category?.toLowerCase() !== activeFilters?.category) {
      return false;
    }

    // Difficulty filter
    if (activeFilters?.difficulty && activeFilters?.difficulty !== 'all' && 
        assessment?.difficulty?.toLowerCase() !== activeFilters?.difficulty) {
      return false;
    }

    // Status filter
    if (activeFilters?.status && activeFilters?.status !== 'all') {
      if (activeFilters?.status === 'completed' && assessment?.completionRate !== 100) return false;
      if (activeFilters?.status === 'in-progress' && (assessment?.completionRate === 0 || assessment?.completionRate === 100)) return false;
      if (activeFilters?.status === 'not-started' && assessment?.completionRate !== 0) return false;
    }

    // Recommended filter
    if (activeFilters?.recommended && !assessment?.isRecommended) {
      return false;
    }

    return true;
  });

  const handleStartAssessment = (assessment) => {
    console.log('Starting assessment:', assessment?.id);
    // Navigate to assessment interface
  };

  const handleViewDetails = (assessment) => {
    console.log('Viewing details for:', assessment?.id);
    // Show assessment details modal or navigate to details page
  };

  const handleQuickStart = (option) => {
    console.log('Quick start option:', option?.id);
    // Handle quick start navigation
  };

  const handleViewAllActivity = () => {
    console.log('View all activity');
    // Navigate to activity history page
  };

  useEffect(() => {
    // Auto-save functionality simulation
    const autoSaveInterval = setInterval(() => {
      // Auto-save user progress every 30 seconds
      console.log('Auto-saving progress...');
    }, 30000);

    return () => clearInterval(autoSaveInterval);
  }, []);

  return (
    <>
      <Helmet>
        <title>Assessment Portal - AngazaLearn | AI-Powered Learning Disability Screening</title>
        <meta name="description" content="Interactive testing environment with gamified elements for student engagement. Complete AI-powered assessments for ADHD, Dyslexia, Dyscalculia, and Dysgraphia with comprehensive analytics." />
        <meta name="keywords" content="learning disability assessment, ADHD screening, dyslexia test, dyscalculia evaluation, dysgraphia assessment, AI education, Kenya learning support" />
      </Helmet>
      <div className="min-h-screen bg-background">
        <Header onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />

        <main className={`transition-all duration-normal ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-64'
        } pt-16`}>
          <div className="p-6 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center shadow-soft">
                      <Icon name="ClipboardCheck" size={28} className="text-white" />
                    </div>
                    <span>Assessment Portal</span>
                  </h1>
                  <p className="text-muted-foreground mt-2 text-lg">
                    AI-powered learning disability screening with gamified, engaging experiences
                  </p>
                </div>

                
              </div>

              
            </div>

            {/* Quick Start Section */}
            <div className="mb-8">
              <QuickStartSection 
                onQuickStart={handleQuickStart}
                recentAssessments={recentAssessments}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 mb-8">
              {/* Left Column - Assessments */}
              <div className="xl:col-span-3 space-y-6">
                {/* Filters */}
                <AssessmentFilters
                  onFilterChange={setActiveFilters}
                  activeFilters={activeFilters}
                  assessmentCount={filteredAssessments?.length}
                />

                {/* Assessment Categories */}
                <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-foreground">
                      Assessment Categories
                    </h2>
                    <span className="text-sm text-muted-foreground">
                      {filteredAssessments?.length} assessments
                    </span>
                  </div>

                  {/* Category Tabs */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {['all', 'adhd', 'dyslexia', 'dyscalculia', 'dysgraphia']?.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-fast empowerment-hover ${
                          selectedCategory === category
                            ? 'bg-primary text-primary-foreground shadow-soft'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground'
                        }`}
                      >
                        {category === 'all' ? 'All Categories' : category?.toUpperCase()}
                      </button>
                    ))}
                  </div>

                  {/* Assessments Grid/List */}
                  <div className={`${
                    viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 gap-6' :'space-y-4'
                  }`}>
                    {filteredAssessments?.map((assessment) => (
                      <AssessmentCard
                        key={assessment?.id}
                        assessment={assessment}
                        onStart={handleStartAssessment}
                        onViewDetails={handleViewDetails}
                        isRecommended={assessment?.isRecommended}
                        completionRate={assessment?.completionRate}
                      />
                    ))}
                  </div>

                  {/* Empty State */}
                  {filteredAssessments?.length === 0 && (
                    <div className="text-center py-12">
                      <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon name="Search" size={32} className="text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        No Assessments Found
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Try adjusting your filters or search terms to find assessments.
                      </p>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setActiveFilters({});
                          setSearchQuery('');
                        }}
                      >
                        Clear Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Sidebar Content */}
              <div className="space-y-6">
                <ProgressTracker />
                <AssessmentStats />
                <RecentActivity onViewAll={handleViewAllActivity} />
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-gradient-illumination rounded-xl p-6 text-white cultural-pattern">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Icon name="HelpCircle" size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-2">Need Help Getting Started?</h3>
                  <p className="text-white/90 mb-4">
                    Our assessment portal is designed to be intuitive and engaging. Each assessment adapts to your responses, 
                    ensuring accurate results while maintaining a positive experience.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button variant="secondary" size="sm">
                      Watch Tutorial
                    </Button>
                    <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10">
                      Contact Support
                    </Button>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      View FAQ
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default AssessmentPortal;