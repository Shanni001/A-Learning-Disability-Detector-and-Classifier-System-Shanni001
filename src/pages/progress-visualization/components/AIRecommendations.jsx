import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AIRecommendations = () => {
  const [activeTab, setActiveTab] = useState('interventions');

  const recommendations = {
    interventions: [
      {
        id: 1,
        title: "Enhanced Reading Comprehension Strategy",
        description: "Implement guided reading sessions with visual aids to improve text understanding and retention.",
        priority: "High",
        category: "Reading",
        icon: "BookOpen",
        estimatedTime: "2-3 weeks",
        successRate: "87%",
        resources: ["Visual Reading Cards", "Comprehension Worksheets", "Audio Books"],
        aiConfidence: 92
      },
      {
        id: 2,
        title: "Mathematical Problem-Solving Framework",
        description: "Use step-by-step visual problem breakdown to enhance mathematical reasoning skills.",
        priority: "Medium",
        category: "Mathematics",
        icon: "Calculator",
        estimatedTime: "3-4 weeks",
        successRate: "78%",
        resources: ["Visual Math Tools", "Problem-Solving Templates", "Interactive Games"],
        aiConfidence: 85
      },
      {
        id: 3,
        title: "Attention Focus Training Program",
        description: "Structured attention exercises with gradual complexity increase to improve concentration.",
        priority: "High",
        category: "Attention",
        icon: "Eye",
        estimatedTime: "4-6 weeks",
        successRate: "82%",
        resources: ["Focus Training Apps", "Mindfulness Exercises", "Attention Games"],
        aiConfidence: 89
      }
    ],
    resources: [
      {
        id: 1,
        title: "Interactive Reading Comprehension Toolkit",
        type: "Digital Resource",
        description: "Comprehensive collection of interactive reading exercises tailored for learning differences.",
        rating: 4.8,
        downloads: 1247,
        category: "Reading",
        icon: "Download",
        format: "PDF + Interactive"
      },
      {
        id: 2,
        title: "Visual Mathematics Learning Guide",
        type: "Educational Material",
        description: "Step-by-step visual guides for mathematical concepts with practical examples.",
        rating: 4.6,
        downloads: 892,
        category: "Mathematics",
        icon: "FileText",
        format: "PDF"
      },
      {
        id: 3,
        title: "Attention Training Video Series",
        type: "Video Content",
        description: "Professionally designed attention training exercises with progress tracking.",
        rating: 4.9,
        downloads: 2156,
        category: "Attention",
        icon: "Play",
        format: "Video"
      }
    ],
    insights: [
      {
        id: 1,
        title: "Learning Pattern Analysis",
        description: "Student shows strongest performance during morning hours with 23% better focus scores.",
        type: "Behavioral Insight",
        icon: "Brain",
        actionable: true,
        recommendation: "Schedule challenging tasks between 9-11 AM for optimal results."
      },
      {
        id: 2,
        title: "Intervention Effectiveness",
        description: "Visual learning strategies show 34% higher success rate compared to traditional methods.",
        type: "Strategy Insight",
        icon: "TrendingUp",
        actionable: true,
        recommendation: "Prioritize visual and interactive learning materials in lesson planning."
      },
      {
        id: 3,
        title: "Progress Acceleration",
        description: "Consistent daily practice sessions of 15-20 minutes show better results than longer weekly sessions.",
        type: "Practice Insight",
        icon: "Clock",
        actionable: true,
        recommendation: "Implement short, daily practice sessions rather than extended weekly sessions."
      }
    ]
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-action-red bg-action-red/10 border-action-red/20';
      case 'Medium': return 'text-illumination-gold bg-illumination-gold/10 border-illumination-gold/20';
      case 'Low': return 'text-empowerment-green bg-empowerment-green/10 border-empowerment-green/20';
      default: return 'text-muted-foreground bg-muted border-border';
    }
  };

  const tabs = [
    { key: 'interventions', label: 'AI Interventions', icon: 'Target', count: recommendations?.interventions?.length },
    { key: 'resources', label: 'Recommended Resources', icon: 'BookOpen', count: recommendations?.resources?.length },
    { key: 'insights', label: 'Learning Insights', icon: 'Lightbulb', count: recommendations?.insights?.length }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">AI-Powered Recommendations</h3>
          <p className="text-muted-foreground">Personalized strategies based on learning patterns and assessment data</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Sparkles" size={16} className="text-illumination-gold" />
            <span>AI Confidence: 89%</span>
          </div>
          <Button variant="outline" size="sm">
            <Icon name="RefreshCw" size={16} />
            Refresh
          </Button>
        </div>
      </div>
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-border">
        {tabs?.map((tab) => (
          <button
            key={tab?.key}
            onClick={() => setActiveTab(tab?.key)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-t-lg text-sm font-medium transition-all duration-fast ${
              activeTab === tab?.key
                ? 'bg-primary text-primary-foreground shadow-soft border-b-2 border-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon name={tab?.icon} size={16} />
            <span>{tab?.label}</span>
            <span className={`px-2 py-0.5 rounded-full text-xs ${
              activeTab === tab?.key ? 'bg-white/20' : 'bg-muted'
            }`}>
              {tab?.count}
            </span>
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div className="space-y-4">
        {activeTab === 'interventions' && (
          <div className="space-y-4">
            {recommendations?.interventions?.map((intervention) => (
              <div key={intervention?.id} className="p-5 rounded-lg border border-border hover:shadow-soft transition-all duration-fast">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon name={intervention?.icon} size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-semibold text-foreground">{intervention?.title}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(intervention?.priority)}`}>
                          {intervention?.priority}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-3">{intervention?.description}</p>
                      
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Timeline</p>
                          <p className="font-medium text-foreground">{intervention?.estimatedTime}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Success Rate</p>
                          <p className="font-medium text-empowerment-green">{intervention?.successRate}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Category</p>
                          <p className="font-medium text-foreground">{intervention?.category}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">AI Confidence</p>
                          <p className="font-medium text-illumination-gold">{intervention?.aiConfidence}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm font-medium text-foreground mb-2">Required Resources:</p>
                  <div className="flex flex-wrap gap-2">
                    {intervention?.resources?.map((resource, index) => (
                      <span key={index} className="px-3 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                        {resource}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button variant="default" size="sm">
                      <Icon name="Play" size={16} />
                      Start Intervention
                    </Button>
                    <Button variant="outline" size="sm">
                      <Icon name="BookOpen" size={16} />
                      Learn More
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Icon name="Bookmark" size={16} />
                    Save
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'resources' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {recommendations?.resources?.map((resource) => (
              <div key={resource?.id} className="p-5 rounded-lg border border-border hover:shadow-soft transition-all duration-fast">
                <div className="flex items-start space-x-4 mb-4">
                  <div className="w-12 h-12 bg-empowerment-green/10 rounded-lg flex items-center justify-center">
                    <Icon name={resource?.icon} size={24} className="text-empowerment-green" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-foreground mb-1">{resource?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">{resource?.type}</p>
                    <p className="text-sm text-muted-foreground">{resource?.description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className="flex items-center space-x-1">
                      <Icon name="Star" size={14} className="text-illumination-gold fill-current" />
                      <span className="font-medium">{resource?.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Icon name="Download" size={14} className="text-muted-foreground" />
                      <span>{resource?.downloads}</span>
                    </div>
                    <span className="px-2 py-1 bg-muted rounded-full text-xs">{resource?.format}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <Button variant="default" size="sm" className="flex-1 mr-2">
                    <Icon name="Download" size={16} />
                    Download Resource
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="ExternalLink" size={16} />
                    Preview
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'insights' && (
          <div className="space-y-4">
            {recommendations?.insights?.map((insight) => (
              <div key={insight?.id} className="p-5 rounded-lg border border-border hover:shadow-soft transition-all duration-fast">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-illumination-gold/10 rounded-lg flex items-center justify-center">
                    <Icon name={insight?.icon} size={24} className="text-illumination-gold" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">{insight?.title}</h4>
                      <span className="px-2 py-1 bg-muted rounded-full text-xs text-muted-foreground">
                        {insight?.type}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-3">{insight?.description}</p>
                    
                    {insight?.actionable && (
                      <div className="p-3 bg-empowerment-green/5 rounded-lg border border-empowerment-green/20">
                        <div className="flex items-start space-x-2">
                          <Icon name="Lightbulb" size={16} className="text-empowerment-green mt-0.5" />
                          <div>
                            <p className="text-sm font-medium text-empowerment-green mb-1">Actionable Recommendation:</p>
                            <p className="text-sm text-foreground">{insight?.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AIRecommendations;