import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import ReportCard from './components/ReportCard';
import ReportFilters from './components/ReportFilters';
import AnalyticsOverview from './components/AnalyticsOverview';
import ReportTemplates from './components/ReportTemplates';
import ReportViewer from './components/ReportViewer';
import ShareModal from './components/ShareModal';

const ReportAnalytics = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareReport, setShareReport] = useState(null);
  const [activeTab, setActiveTab] = useState('reports');
  const [filters, setFilters] = useState({
    search: '',
    assessmentType: 'all',
    status: 'all',
    timeRange: 'all'
  });

  // Mock data for analytics overview
  const analyticsData = {
    totalReports: '2,847',
    completedThisMonth: '342',
    avgProcessingTime: '2.3 hours',
    stakeholderEngagement: '94%'
  };

  // Mock data for reports
  const mockReports = [
    {
      id: 1,
      studentName: 'Amara Wanjiku',
      assessmentType: 'ADHD',
      assessmentDate: '15/09/2025',
      generatedDate: '16/09/2025',
      status: 'completed',
      keyFindings: ['Attention challenges', 'Hyperactivity patterns', 'Executive function'],
      stakeholders: 4,
      strengths: 8,
      challenges: 3,
      confidence: 87,
      summary: `Amara demonstrates significant strengths in creative thinking and verbal communication. The assessment indicates attention regulation challenges that respond well to structured environments. Recommended interventions focus on executive function support and movement-based learning strategies.`,
      assessmentScores: [
        { category: 'Attention Span', description: 'Sustained focus duration', score: 45 },
        { category: 'Impulse Control', description: 'Self-regulation abilities', score: 38 },
        { category: 'Working Memory', description: 'Information processing', score: 62 },
        { category: 'Processing Speed', description: 'Task completion rate', score: 71 }
      ],
      aiAnalysis: `Advanced pattern recognition algorithms identified consistent attention regulation patterns across multiple assessment domains. The student shows remarkable resilience and adaptive strategies, particularly in creative problem-solving contexts. Neuroplasticity indicators suggest high potential for improvement with targeted interventions.`,
      patterns: [
        'Improved focus during hands-on activities',
        'Difficulty with sustained reading tasks',
        'Strong performance in collaborative settings',
        'Enhanced attention with movement breaks'
      ],
      riskFactors: [
        'Academic performance decline without support',
        'Social interaction challenges in large groups',
        'Potential self-esteem impacts from repeated struggles'
      ],
      recommendations: [
        {
          title: 'Structured Learning Environment',
          description: 'Implement consistent routines with clear visual schedules and designated quiet spaces for focused work.',
          priority: 'high',
          timeline: '2-4 weeks'
        },
        {
          title: 'Movement Integration',
          description: 'Incorporate regular movement breaks and kinesthetic learning opportunities throughout the school day.',
          priority: 'high',
          timeline: '1-2 weeks'
        },
        {
          title: 'Executive Function Support',
          description: 'Provide organizational tools, time management strategies, and step-by-step task breakdowns.',
          priority: 'medium',
          timeline: '4-6 weeks'
        }
      ]
    },
    {
      id: 2,
      studentName: 'Kofi Asante',
      assessmentType: 'Dyscalculia',
      assessmentDate: '12/09/2025',
      generatedDate: '14/09/2025',
      status: 'completed',
      keyFindings: ['Number sense difficulties', 'Spatial reasoning strengths', 'Visual processing'],
      stakeholders: 3,
      strengths: 6,
      challenges: 5,
      confidence: 92,
      summary: `Kofi shows exceptional visual-spatial abilities and creative problem-solving skills. Mathematical concept understanding is enhanced through visual and manipulative approaches. The assessment reveals specific number processing challenges that benefit from multi-sensory instruction methods.`,
      assessmentScores: [
        { category: 'Number Recognition', description: 'Basic number identification', score: 34 },
        { category: 'Mathematical Operations', description: 'Calculation abilities', score: 28 },
        { category: 'Spatial Reasoning', description: 'Visual-spatial skills', score: 89 },
        { category: 'Problem Solving', description: 'Logical thinking', score: 76 }
      ],
      aiAnalysis: `Comprehensive analysis reveals a distinct learning profile with exceptional strengths in visual-spatial processing contrasted with specific numerical processing challenges. The assessment indicates strong potential for mathematical understanding through alternative instructional approaches.`,
      patterns: [
        'Excellent performance with visual math representations',
        'Struggles with abstract number concepts',
        'Strong geometric and spatial understanding',
        'Improved accuracy with manipulative materials'
      ],
      riskFactors: [
        'Mathematics anxiety development',
        'Avoidance of numerical tasks',
        'Potential impact on STEM subject confidence'
      ],
      recommendations: [
        {
          title: 'Multi-Sensory Math Instruction',
          description: 'Use visual aids, manipulatives, and hands-on activities to teach mathematical concepts.',
          priority: 'high',
          timeline: '2-3 weeks'
        },
        {
          title: 'Technology Integration',
          description: 'Implement math apps and software that provide visual representations of numerical concepts.',
          priority: 'medium',
          timeline: '3-4 weeks'
        }
      ]
    },
    {
      id: 3,
      studentName: 'Zara Ochieng',
      assessmentType: 'Dyslexia',
      assessmentDate: '10/09/2025',
      generatedDate: '12/09/2025',
      status: 'processing',
      keyFindings: ['Phonological awareness', 'Reading fluency', 'Comprehension strengths'],
      stakeholders: 5,
      strengths: 9,
      challenges: 4,
      confidence: 89,
      summary: `Zara demonstrates exceptional oral comprehension and critical thinking abilities. Reading challenges are primarily related to phonological processing, with strong potential for improvement through structured literacy approaches.`,
      assessmentScores: [
        { category: 'Phonological Awareness', description: 'Sound recognition skills', score: 42 },
        { category: 'Reading Fluency', description: 'Reading speed and accuracy', score: 35 },
        { category: 'Reading Comprehension', description: 'Text understanding', score: 78 },
        { category: 'Vocabulary', description: 'Word knowledge', score: 85 }
      ],
      aiAnalysis: `Assessment data indicates a classic dyslexia profile with strong comprehension abilities masked by decoding difficulties. The student shows excellent potential for reading improvement with evidence-based interventions.`,
      patterns: [
        'Strong listening comprehension abilities',
        'Difficulty with phonetic decoding',
        'Excellent vocabulary and general knowledge',
        'Improved performance with extended time'
      ],
      riskFactors: [
        'Reading avoidance behaviors',
        'Academic confidence challenges',
        'Potential secondary writing difficulties'
      ],
      recommendations: [
        {
          title: 'Structured Literacy Program',
          description: 'Implement systematic phonics instruction with multisensory techniques.',
          priority: 'high',
          timeline: '6-8 weeks'
        },
        {
          title: 'Assistive Technology',
          description: 'Provide text-to-speech software and audiobook access for content learning.',
          priority: 'medium',
          timeline: '2-3 weeks'
        }
      ]
    },
    {
      id: 4,
      studentName: 'Jabari Kimani',
      assessmentType: 'Dysgraphia',
      assessmentDate: '08/09/2025',
      generatedDate: '10/09/2025',
      status: 'completed',
      keyFindings: ['Fine motor challenges', 'Excellent verbal expression', 'Creative thinking'],
      stakeholders: 3,
      strengths: 7,
      challenges: 4,
      confidence: 85,
      summary: `Jabari shows remarkable verbal communication skills and creative thinking abilities. Writing challenges are primarily motor-based, with strong potential for improvement through occupational therapy and assistive technology.`,
      assessmentScores: [
        { category: 'Handwriting Quality', description: 'Letter formation and legibility', score: 32 },
        { category: 'Writing Speed', description: 'Text production rate', score: 28 },
        { category: 'Written Expression', description: 'Content organization', score: 74 },
        { category: 'Verbal Expression', description: 'Oral communication', score: 91 }
      ],
      aiAnalysis: `Analysis reveals a significant discrepancy between verbal and written expression abilities, indicating motor-based writing difficulties rather than language processing challenges.`,
      patterns: [
        'Excellent oral storytelling abilities',
        'Fatigue during extended writing tasks',
        'Strong content ideas with poor execution',
        'Improved output with alternative methods'
      ],
      riskFactors: [
        'Writing task avoidance',
        'Academic performance underestimation',
        'Potential impact on assessment accuracy'
      ],
      recommendations: [
        {
          title: 'Occupational Therapy',
          description: 'Address fine motor skills and writing mechanics through targeted therapy.',
          priority: 'high',
          timeline: '8-12 weeks'
        },
        {
          title: 'Alternative Writing Methods',
          description: 'Introduce keyboard skills and voice-to-text technology for content creation.',
          priority: 'high',
          timeline: '2-4 weeks'
        }
      ]
    },
    {
      id: 5,
      studentName: 'Asha Mwangi',
      assessmentType: 'ADHD',
      assessmentDate: '05/09/2025',
      generatedDate: '07/09/2025',
      status: 'draft',
      keyFindings: ['Inattentive type', 'Strong analytical skills', 'Organization challenges'],
      stakeholders: 4,
      strengths: 8,
      challenges: 3,
      confidence: 91,
      summary: `Asha demonstrates exceptional analytical thinking and problem-solving abilities. Attention challenges are primarily inattentive type, responding well to environmental modifications and organizational support.`,
      assessmentScores: [
        { category: 'Sustained Attention', description: 'Focus maintenance', score: 41 },
        { category: 'Organization Skills', description: 'Task management', score: 35 },
        { category: 'Analytical Thinking', description: 'Problem-solving abilities', score: 88 },
        { category: 'Academic Performance', description: 'Subject mastery', score: 79 }
      ],
      aiAnalysis: `Assessment indicates inattentive ADHD presentation with significant cognitive strengths. The student benefits from structured environments and explicit organizational instruction.`,
      patterns: [
        'Deep focus on preferred subjects',
        'Difficulty with task transitions',
        'Strong performance with clear instructions',
        'Challenges with multi-step processes'
      ],
      riskFactors: [
        'Academic underachievement',
        'Self-organization difficulties',
        'Potential anxiety development'
      ],
      recommendations: [
        {
          title: 'Environmental Modifications',
          description: 'Create distraction-free learning spaces with clear visual organization systems.',
          priority: 'high',
          timeline: '1-2 weeks'
        },
        {
          title: 'Executive Function Training',
          description: 'Teach explicit organizational and time management strategies.',
          priority: 'medium',
          timeline: '4-6 weeks'
        }
      ]
    }
  ];

  // Mock data for report templates
  const mockTemplates = [
    {
      id: 1,
      name: 'Comprehensive Assessment Report',
      description: 'Detailed analysis with full recommendations',
      type: 'comprehensive',
      sections: 8,
      pages: '12-15',
      language: 'English/Swahili',
      rating: 5,
      usage: '2.3k',
      isPremium: false
    },
    {
      id: 2,
      name: 'Executive Summary',
      description: 'Concise overview for quick review',
      type: 'summary',
      sections: 4,
      pages: '3-5',
      language: 'English/Swahili',
      rating: 4,
      usage: '1.8k',
      isPremium: false
    },
    {
      id: 3,
      name: 'Parent-Friendly Report',
      description: 'Accessible language for families',
      type: 'parent',
      sections: 6,
      pages: '8-10',
      language: 'English/Swahili',
      rating: 5,
      usage: '3.1k',
      isPremium: false
    },
    {
      id: 4,
      name: 'Educator Collaboration Report',
      description: 'Classroom strategies and interventions',
      type: 'educator',
      sections: 7,
      pages: '10-12',
      language: 'English',
      rating: 4,
      usage: '1.5k',
      isPremium: true
    },
    {
      id: 5,
      name: 'Medical Professional Report',
      description: 'Clinical details for healthcare providers',
      type: 'medical',
      sections: 9,
      pages: '15-18',
      language: 'English',
      rating: 5,
      usage: '892',
      isPremium: true
    }
  ];

  const filteredReports = mockReports?.filter(report => {
    const matchesSearch = report?.studentName?.toLowerCase()?.includes(filters?.search?.toLowerCase()) ||
                         report?.assessmentType?.toLowerCase()?.includes(filters?.search?.toLowerCase());
    const matchesType = filters?.assessmentType === 'all' || report?.assessmentType === filters?.assessmentType;
    const matchesStatus = filters?.status === 'all' || report?.status === filters?.status;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      assessmentType: 'all',
      status: 'all',
      timeRange: 'all'
    });
  };

  const handleViewReport = (report) => {
    setSelectedReport(report);
  };

  const handleDownloadReport = (report) => {
    // Mock download functionality
    console.log('Downloading report for:', report?.studentName);
    // In real implementation, this would trigger PDF generation and download
  };

  const handleShareReport = (report) => {
    setShareReport(report);
    setShowShareModal(true);
  };

  const handleShare = (shareData) => {
    console.log('Sharing report:', shareData);
    // In real implementation, this would handle the sharing logic
    setShowShareModal(false);
    setShareReport(null);
  };

  const handleSelectTemplate = (template) => {
    console.log('Selected template:', template?.name);
    // In real implementation, this would open template customization
  };

  const handleCreateCustomTemplate = () => {
    console.log('Creating custom template');
    // In real implementation, this would open template builder
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-normal ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-16`}>
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Icon name="BarChart3" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Report Analytics</h1>
                <p className="text-muted-foreground">Comprehensive diagnostic reports with AI-powered insights</p>
              </div>
            </div>
            
            {/* Breadcrumb */}
            <nav className="flex items-center space-x-2 text-sm text-muted-foreground">
              <a href="/multi-role-dashboard" className="hover:text-foreground transition-colors duration-fast">Dashboard</a>
              <Icon name="ChevronRight" size={16} />
              <span className="text-foreground">Report Analytics</span>
            </nav>
          </div>

          {/* Analytics Overview */}
          <AnalyticsOverview analytics={analyticsData} />

          {/* Tab Navigation */}
          <div className="flex items-center space-x-1 mb-6 bg-white rounded-lg p-1 border border-border w-fit">
            <button
              onClick={() => setActiveTab('reports')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-fast ${
                activeTab === 'reports' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="FileText" size={16} className="mr-2 inline" />
              Generated Reports
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-fast ${
                activeTab === 'templates' ?'bg-primary text-primary-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name="Layout" size={16} className="mr-2 inline" />
              Report Templates
            </button>
          </div>

          {/* Content based on active tab */}
          {activeTab === 'reports' && (
            <>
              {/* Filters */}
              <ReportFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
              />

              {/* Reports Grid */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">Assessment Reports</h2>
                    <p className="text-sm text-muted-foreground">
                      Showing {filteredReports?.length} of {mockReports?.length} reports
                    </p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button variant="outline" size="sm">
                      <Icon name="Filter" size={16} className="mr-2" />
                      Advanced Filters
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="Download" size={16} className="mr-2" />
                      Export All
                    </Button>
                    <Button variant="default" size="sm" className="bg-gradient-primary">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Generate Report
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredReports?.map((report) => (
                    <ReportCard
                      key={report?.id}
                      report={report}
                      onView={handleViewReport}
                      onDownload={handleDownloadReport}
                      onShare={handleShareReport}
                    />
                  ))}
                </div>

                {filteredReports?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="FileX" size={48} className="text-muted mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No reports found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or generate a new assessment report.
                    </p>
                    <Button variant="outline" onClick={handleClearFilters}>
                      Clear Filters
                    </Button>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === 'templates' && (
            <ReportTemplates
              templates={mockTemplates}
              onSelectTemplate={handleSelectTemplate}
              onCreateCustom={handleCreateCustomTemplate}
            />
          )}
        </div>
      </main>
      {/* Report Viewer Modal */}
      {selectedReport && (
        <ReportViewer
          report={selectedReport}
          onClose={() => setSelectedReport(null)}
          onDownload={handleDownloadReport}
          onShare={handleShareReport}
        />
      )}
      {/* Share Modal */}
      {showShareModal && shareReport && (
        <ShareModal
          report={shareReport}
          onClose={() => {
            setShowShareModal(false);
            setShareReport(null);
          }}
          onShare={handleShare}
        />
      )}
    </div>
  );
};

export default ReportAnalytics;