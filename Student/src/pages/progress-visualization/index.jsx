import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ProgressOverview from './components/ProgressOverview';
import ProgressChart from './components/ProgressChart';
import LearningAreasBreakdown from './components/LearningAreasBreakdown';
import AIRecommendations from './components/AIRecommendations';
import MilestoneTracker from './components/MilestoneTracker';
import ComparisonView from './components/ComparisonView';

const ProgressVisualization = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');
  const [selectedMetric, setSelectedMetric] = useState('reading');
  const [viewType, setViewType] = useState('pie');
  const [activeView, setActiveView] = useState('overview');
  const location = useLocation();

  useEffect(() => {
    document.title = 'Progress Visualization - AngazaLearn';
  }, []);

  const timeframes = [
    { key: '1month', label: '1 Month', icon: 'Calendar' },
    { key: '3months', label: '3 Months', icon: 'Calendar' },
    { key: '6months', label: '6 Months', icon: 'Calendar' },
    { key: '1year', label: '1 Year', icon: 'Calendar' }
  ];

  const viewOptions = [
    { key: 'overview', label: 'Overview', icon: 'LayoutDashboard', description: 'Complete progress summary' },
    { key: 'detailed', label: 'Detailed Analysis', icon: 'BarChart3', description: 'In-depth performance metrics' },
    { key: 'milestones', label: 'Milestones', icon: 'Trophy', description: 'Achievement tracking' },
    { key: 'comparison', label: 'Comparison', icon: 'Users', description: 'Peer and benchmark analysis' }
  ];

  const studentData = {
    name: "Sarah Johnson",
    grade: "Grade 5",
    school: "Nairobi Primary School",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
    overallProgress: 78,
    assessmentsCompleted: 24,
    totalAssessments: 30,
    learningAreas: 4,
    interventionSuccess: 85
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <main className={`transition-all duration-normal ${sidebarCollapsed ? 'ml-16' : 'ml-64'} pt-16`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <div className="flex items-center space-x-2 text-sm text-muted-foreground mb-2">
                  <a href="/multi-role-dashboard" className="hover:text-foreground transition-colors">Dashboard</a>
                  <Icon name="ChevronRight" size={16} />
                  <span>Progress Visualization</span>
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-2">Progress Visualization</h1>
                <p className="text-muted-foreground">Track learning growth with AI-powered insights and dynamic visualizations</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <select
                  value={selectedTimeframe}
                  onChange={(e) => setSelectedTimeframe(e?.target?.value)}
                  className="px-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                >
                  {timeframes?.map((timeframe) => (
                    <option key={timeframe?.key} value={timeframe?.key}>
                      {timeframe?.label}
                    </option>
                  ))}
                </select>
                <Button variant="outline">
                  <Icon name="Download" size={16} />
                  Export Report
                </Button>
                <Button variant="default" className="bg-gradient-primary">
                  <Icon name="RefreshCw" size={16} />
                  Refresh Data
                </Button>
              </div>
            </div>
          </div>

          {/* Student Info Card */}
          <div className="bg-white rounded-xl p-6 shadow-soft border border-border mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <img
                    src={studentData?.avatar}
                    alt={studentData?.name}
                    className="w-16 h-16 rounded-full object-cover border-4 border-empowerment-green/20"
                  />
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-empowerment-green rounded-full flex items-center justify-center">
                    <Icon name="CheckCircle" size={14} className="text-white" />
                  </div>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-foreground">{studentData?.name}</h2>
                  <p className="text-muted-foreground">{studentData?.grade} • {studentData?.school}</p>
                  <div className="flex items-center space-x-4 mt-2 text-sm">
                    <div className="flex items-center space-x-1 text-empowerment-green">
                      <Icon name="TrendingUp" size={14} />
                      <span>Overall Progress: {studentData?.overallProgress}%</span>
                    </div>
                    <div className="flex items-center space-x-1 text-primary">
                      <Icon name="ClipboardCheck" size={14} />
                      <span>{studentData?.assessmentsCompleted}/{studentData?.totalAssessments} Assessments</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Icon name="MessageCircle" size={16} />
                  Contact Teacher
                </Button>
                <Button variant="outline" size="sm">
                  <Icon name="Share" size={16} />
                  Share Progress
                </Button>
              </div>
            </div>
          </div>

          {/* View Navigation */}
          <div className="flex flex-wrap gap-2 mb-8">
            {viewOptions?.map((option) => (
              <button
                key={option?.key}
                onClick={() => setActiveView(option?.key)}
                className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-fast empowerment-hover ${
                  activeView === option?.key
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'bg-white text-muted-foreground hover:text-foreground hover:bg-muted border border-border'
                }`}
              >
                <Icon name={option?.icon} size={16} />
                <div className="text-left">
                  <div>{option?.label}</div>
                  <div className="text-xs opacity-80">{option?.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Content Based on Active View */}
          <div className="space-y-8">
            {activeView === 'overview' && (
              <>
                <ProgressOverview 
                  studentData={studentData} 
                  selectedTimeframe={selectedTimeframe} 
                />
                <ProgressChart 
                  selectedMetric={selectedMetric}
                  onMetricChange={setSelectedMetric}
                  data={studentData}
                />
                <LearningAreasBreakdown 
                  viewType={viewType}
                  onViewTypeChange={setViewType}
                />
              </>
            )}

            {activeView === 'detailed' && (
              <>
                <ProgressChart 
                  selectedMetric={selectedMetric}
                  onMetricChange={setSelectedMetric}
                  data={studentData}
                />
                <LearningAreasBreakdown 
                  viewType={viewType}
                  onViewTypeChange={setViewType}
                />
                <AIRecommendations />
              </>
            )}

            {activeView === 'milestones' && (
              <>
                <MilestoneTracker />
                <ProgressOverview 
                  studentData={studentData} 
                  selectedTimeframe={selectedTimeframe} 
                />
              </>
            )}

            {activeView === 'comparison' && (
              <>
                <ComparisonView />
                <AIRecommendations />
              </>
            )}
          </div>

          {/* Quick Actions Panel */}
          <div className="mt-8 bg-gradient-illumination rounded-xl p-6 text-white">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-4 lg:mb-0">
                <h3 className="text-xl font-bold mb-2">Ready to Take Action?</h3>
                <p className="opacity-90">Use these insights to create personalized learning interventions and track continued progress.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Icon name="Target" size={16} />
                  Create Intervention Plan
                </Button>
                <Button variant="outline" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
                  <Icon name="Calendar" size={16} />
                  Schedule Assessment
                </Button>
                <Button variant="default" className="bg-white text-primary hover:bg-white/90">
                  <Icon name="BookOpen" size={16} />
                  Access Resources
                </Button>
              </div>
            </div>
          </div>

          {/* Footer Navigation */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <a 
              href="/assessment-portal"
              className="p-6 bg-white rounded-xl border border-border hover:shadow-soft transition-all duration-fast empowerment-hover group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon name="ClipboardCheck" size={24} className="text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Assessment Portal</h4>
                  <p className="text-sm text-muted-foreground">Take new assessments to track progress</p>
                </div>
              </div>
            </a>

            <a 
              href="/resource-center"
              className="p-6 bg-white rounded-xl border border-border hover:shadow-soft transition-all duration-fast empowerment-hover group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-empowerment-green/10 rounded-lg flex items-center justify-center group-hover:bg-empowerment-green/20 transition-colors">
                  <Icon name="BookOpen" size={24} className="text-empowerment-green" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Resource Center</h4>
                  <p className="text-sm text-muted-foreground">Access learning materials and interventions</p>
                </div>
              </div>
            </a>

            <a 
              href="/report-analytics"
              className="p-6 bg-white rounded-xl border border-border hover:shadow-soft transition-all duration-fast empowerment-hover group"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-illumination-gold/10 rounded-lg flex items-center justify-center group-hover:bg-illumination-gold/20 transition-colors">
                  <Icon name="BarChart3" size={24} className="text-illumination-gold" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Detailed Reports</h4>
                  <p className="text-sm text-muted-foreground">Generate comprehensive analytics reports</p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProgressVisualization;