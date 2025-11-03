import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportViewer = ({ report, onClose, onDownload, onShare }) => {
  const [activeSection, setActiveSection] = useState('overview');
  const [viewMode, setViewMode] = useState('interactive');

  const sections = [
    { id: 'overview', name: 'Executive Summary', icon: 'FileText' },
    { id: 'assessment', name: 'Assessment Results', icon: 'ClipboardCheck' },
    { id: 'analysis', name: 'AI Analysis', icon: 'Brain' },
    { id: 'recommendations', name: 'Recommendations', icon: 'Lightbulb' },
    { id: 'progress', name: 'Progress Tracking', icon: 'TrendingUp' },
    { id: 'resources', name: 'Resources', icon: 'BookOpen' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
            <Icon name="User" size={24} className="text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">{report?.studentName}</h2>
            <p className="text-white/80">{report?.assessmentType} Assessment Report</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-white/80 text-sm">Assessment Date</p>
            <p className="font-semibold">{report?.assessmentDate}</p>
          </div>
          <div>
            <p className="text-white/80 text-sm">Report Generated</p>
            <p className="font-semibold">{report?.generatedDate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-empowerment-green/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="CheckCircle" size={20} className="text-empowerment-green" />
            <h3 className="font-semibold text-foreground">Strengths Identified</h3>
          </div>
          <p className="text-2xl font-bold text-empowerment-green mb-1">{report?.strengths}</p>
          <p className="text-sm text-muted-foreground">Areas of excellence</p>
        </div>

        <div className="bg-illumination-gold/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="AlertTriangle" size={20} className="text-illumination-gold" />
            <h3 className="font-semibold text-foreground">Areas for Support</h3>
          </div>
          <p className="text-2xl font-bold text-illumination-gold mb-1">{report?.challenges}</p>
          <p className="text-sm text-muted-foreground">Intervention opportunities</p>
        </div>

        <div className="bg-primary/10 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Target" size={20} className="text-primary" />
            <h3 className="font-semibold text-foreground">Confidence Level</h3>
          </div>
          <p className="text-2xl font-bold text-primary mb-1">{report?.confidence}%</p>
          <p className="text-sm text-muted-foreground">AI analysis accuracy</p>
        </div>
      </div>

      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Key Findings Summary</h3>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>{report?.summary}</p>
        </div>
      </div>
    </div>
  );

  const renderAssessment = () => (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-lg p-6">
        <h3 className="font-semibold text-foreground mb-4">Assessment Scores</h3>
        <div className="space-y-4">
          {report?.assessmentScores?.map((score, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{score?.category}</p>
                <p className="text-sm text-muted-foreground">{score?.description}</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-foreground">{score?.score}/100</p>
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      score?.score >= 70 ? 'bg-empowerment-green' : 
                      score?.score >= 40 ? 'bg-illumination-gold' : 'bg-action-red'
                    }`}
                    style={{ width: `${score?.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderAnalysis = () => (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Brain" size={20} className="text-primary" />
          <h3 className="font-semibold text-foreground">AI-Powered Analysis</h3>
        </div>
        <div className="prose prose-sm max-w-none text-muted-foreground">
          <p>{report?.aiAnalysis}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-3">Pattern Recognition</h4>
          <ul className="space-y-2">
            {report?.patterns?.map((pattern, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="ArrowRight" size={16} className="text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{pattern}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white border border-border rounded-lg p-6">
          <h4 className="font-semibold text-foreground mb-3">Risk Factors</h4>
          <ul className="space-y-2">
            {report?.riskFactors?.map((risk, index) => (
              <li key={index} className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className="text-illumination-gold mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderRecommendations = () => (
    <div className="space-y-6">
      <div className="bg-white border border-border rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Lightbulb" size={20} className="text-illumination-gold" />
          <h3 className="font-semibold text-foreground">Personalized Recommendations</h3>
        </div>
        <div className="space-y-4">
          {report?.recommendations?.map((rec, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{index + 1}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground mb-2">{rec?.title}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{rec?.description}</p>
                  <div className="flex items-center space-x-4 text-xs">
                    <span className={`px-2 py-1 rounded-full ${
                      rec?.priority === 'high' ? 'bg-action-red/10 text-action-red' :
                      rec?.priority === 'medium'? 'bg-illumination-gold/10 text-illumination-gold' : 'bg-empowerment-green/10 text-empowerment-green'
                    }`}>
                      {rec?.priority?.charAt(0)?.toUpperCase() + rec?.priority?.slice(1)} Priority
                    </span>
                    <span className="text-muted-foreground">Timeline: {rec?.timeline}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-elevated max-w-6xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">{report?.studentName} - {report?.assessmentType} Report</h2>
            <p className="text-sm text-muted-foreground">Generated on {report?.generatedDate}</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <button
                onClick={() => setViewMode('interactive')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-fast ${
                  viewMode === 'interactive' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                Interactive
              </button>
              <button
                onClick={() => setViewMode('pdf')}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-fast ${
                  viewMode === 'pdf' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                PDF Preview
              </button>
            </div>
            <Button variant="outline" size="sm" onClick={() => onShare(report)}>
              <Icon name="Share2" size={16} className="mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={() => onDownload(report)}>
              <Icon name="Download" size={16} className="mr-2" />
              Download
            </Button>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <Icon name="X" size={16} />
            </Button>
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Navigation */}
          <div className="w-64 border-r border-border p-4 overflow-y-auto">
            <nav className="space-y-1">
              {sections?.map((section) => (
                <button
                  key={section?.id}
                  onClick={() => setActiveSection(section?.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-fast ${
                    activeSection === section?.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={section?.icon} size={16} />
                  <span>{section?.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeSection === 'overview' && renderOverview()}
            {activeSection === 'assessment' && renderAssessment()}
            {activeSection === 'analysis' && renderAnalysis()}
            {activeSection === 'recommendations' && renderRecommendations()}
            {activeSection === 'progress' && (
              <div className="text-center py-12">
                <Icon name="TrendingUp" size={48} className="text-muted mx-auto mb-4" />
                <p className="text-muted-foreground">Progress tracking section coming soon</p>
              </div>
            )}
            {activeSection === 'resources' && (
              <div className="text-center py-12">
                <Icon name="BookOpen" size={48} className="text-muted mx-auto mb-4" />
                <p className="text-muted-foreground">Resources section coming soon</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportViewer;