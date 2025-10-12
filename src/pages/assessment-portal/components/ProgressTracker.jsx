import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressTracker = ({ 
  totalAssessments = 4, 
  completedAssessments = 1, 
  inProgressAssessments = 1,
  overallProgress = 35,
  milestones = []
}) => {
  const progressSteps = [
    { id: 1, title: 'ADHD Assessment', status: 'completed', icon: 'Brain' },
    { id: 2, title: 'Dyslexia Assessment', status: 'in-progress', icon: 'BookOpen' },
    { id: 3, title: 'Dyscalculia Assessment', status: 'pending', icon: 'Calculator' },
    { id: 4, title: 'Dysgraphia Assessment', status: 'pending', icon: 'PenTool' }
  ];

  const getStepStatus = (status) => {
    switch (status) {
      case 'completed':
        return {
          bgColor: 'bg-empowerment-green',
          textColor: 'text-white',
          borderColor: 'border-empowerment-green',
          icon: 'CheckCircle2'
        };
      case 'in-progress':
        return {
          bgColor: 'bg-illumination-gold',
          textColor: 'text-white',
          borderColor: 'border-illumination-gold',
          icon: 'Clock'
        };
      default:
        return {
          bgColor: 'bg-muted',
          textColor: 'text-muted-foreground',
          borderColor: 'border-muted',
          icon: 'Circle'
        };
    }
  };

  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Icon name="TrendingUp" size={24} className="text-primary" />
            <span>Assessment Progress</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Track your learning disability screening journey
          </p>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-primary">{overallProgress}%</div>
          <div className="text-xs text-muted-foreground">Overall Progress</div>
        </div>
      </div>
      {/* Overall Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Overall Completion</span>
          <span className="text-sm text-muted-foreground">
            {completedAssessments + inProgressAssessments}/{totalAssessments} assessments
          </span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-slow progress-illumination"
            style={{ width: `${overallProgress}%` }}
          />
        </div>
      </div>
      {/* Progress Steps */}
      <div className="space-y-4 mb-6">
        {progressSteps?.map((step, index) => {
          const status = getStepStatus(step?.status);
          const isLast = index === progressSteps?.length - 1;
          
          return (
            <div key={step?.id} className="relative">
              <div className="flex items-center space-x-4">
                {/* Step Icon */}
                <div className={`relative w-10 h-10 rounded-full border-2 ${status?.borderColor} ${status?.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <Icon name={status?.icon} size={16} className={status?.textColor} />
                </div>
                
                {/* Step Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className={`text-sm font-medium ${
                      step?.status === 'completed' ? 'text-foreground' : 
                      step?.status === 'in-progress' ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {step?.title}
                    </h3>
                    
                    {step?.status === 'completed' && (
                      <span className="text-xs text-empowerment-green font-medium">Completed</span>
                    )}
                    {step?.status === 'in-progress' && (
                      <span className="text-xs text-illumination-gold font-medium">In Progress</span>
                    )}
                  </div>
                  
                  {step?.status === 'in-progress' && (
                    <div className="mt-2">
                      <div className="w-full bg-muted rounded-full h-1.5">
                        <div className="w-3/5 h-full bg-illumination-gold rounded-full" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">60% complete</p>
                    </div>
                  )}
                </div>
              </div>
              {/* Connecting Line */}
              {!isLast && (
                <div className="absolute left-5 top-10 w-0.5 h-6 bg-border" />
              )}
            </div>
          );
        })}
      </div>
      {/* Achievement Milestones */}
      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Award" size={16} className="text-illumination-gold" />
          <span>Recent Achievements</span>
        </h3>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-3 p-2 bg-empowerment-green/5 rounded-lg">
            <div className="w-6 h-6 bg-empowerment-green rounded-full flex items-center justify-center">
              <Icon name="Trophy" size={12} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">First Assessment Complete!</p>
              <p className="text-xs text-muted-foreground">Completed ADHD screening assessment</p>
            </div>
            <span className="text-xs text-muted-foreground">2 days ago</span>
          </div>
          
          <div className="flex items-center space-x-3 p-2 bg-illumination-gold/5 rounded-lg">
            <div className="w-6 h-6 bg-illumination-gold rounded-full flex items-center justify-center">
              <Icon name="Star" size={12} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-foreground">Assessment Streak</p>
              <p className="text-xs text-muted-foreground">3 days of consistent progress</p>
            </div>
            <span className="text-xs text-muted-foreground">Today</span>
          </div>
        </div>
      </div>
      {/* Next Steps */}
      <div className="mt-4 p-3 bg-surface rounded-lg border border-border">
        <div className="flex items-center space-x-2 mb-2">
          <Icon name="ArrowRight" size={16} className="text-primary" />
          <span className="text-sm font-medium text-foreground">Next Steps</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Continue with your Dyslexia assessment to maintain your progress streak and unlock new insights.
        </p>
      </div>
    </div>
  );
};

export default ProgressTracker;