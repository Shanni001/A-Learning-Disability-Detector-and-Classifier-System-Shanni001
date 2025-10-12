import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickStartSection = ({ onQuickStart, recentAssessments = [] }) => {
  const quickStartOptions = [
    {
      id: 'comprehensive',
      title: 'Comprehensive Screening',
      description: 'Complete assessment covering all four learning disabilities',
      icon: 'Brain',
      duration: '45-60 min',
      color: 'bg-gradient-primary',
      textColor: 'text-white'
    },
    {
      id: 'targeted',
      title: 'Targeted Assessment',
      description: 'Focus on specific learning challenges',
      icon: 'Target',
      duration: '15-25 min',
      color: 'bg-gradient-secondary',
      textColor: 'text-white'
    },
    {
      id: 'quick',
      title: 'Quick Screening',
      description: 'Brief initial assessment for early indicators',
      icon: 'Zap',
      duration: '5-10 min',
      color: 'bg-gradient-illumination',
      textColor: 'text-white'
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Rocket" size={24} className="text-primary" />
            <span>Quick Start</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Begin your assessment journey with our guided options
          </p>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Shield" size={16} className="text-empowerment-green" />
          <span>Secure & Private</span>
        </div>
      </div>
      {/* Quick Start Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {quickStartOptions?.map((option) => (
          <div
            key={option?.id}
            className={`${option?.color} rounded-lg p-4 cursor-pointer transition-all duration-fast empowerment-hover`}
            onClick={() => onQuickStart(option)}
          >
            <div className="flex items-center justify-between mb-3">
              <Icon name={option?.icon} size={24} className={option?.textColor} />
              <span className={`text-xs ${option?.textColor} opacity-80`}>
                {option?.duration}
              </span>
            </div>
            
            <h3 className={`font-semibold mb-2 ${option?.textColor}`}>
              {option?.title}
            </h3>
            
            <p className={`text-sm ${option?.textColor} opacity-90 mb-3`}>
              {option?.description}
            </p>
            
            <div className="flex items-center justify-end">
              <Icon name="ArrowRight" size={16} className={option?.textColor} />
            </div>
          </div>
        ))}
      </div>
      {/* Recent Assessments */}
      {recentAssessments?.length > 0 && (
        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
            <Icon name="History" size={16} />
            <span>Continue Recent</span>
          </h3>
          
          <div className="space-y-2">
            {recentAssessments?.slice(0, 2)?.map((assessment) => (
              <div
                key={assessment?.id}
                className="flex items-center justify-between p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-fast cursor-pointer"
                onClick={() => onQuickStart(assessment)}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-md flex items-center justify-center ${assessment?.bgColor}`}>
                    <Icon name={assessment?.icon} size={16} className={assessment?.iconColor} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{assessment?.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {assessment?.progress}% complete • {assessment?.lastAccessed}
                    </p>
                  </div>
                </div>
                
                <Button variant="ghost" size="sm" iconName="Play">
                  Continue
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Help Section */}
      <div className="mt-6 p-4 bg-surface rounded-lg border border-border">
        <div className="flex items-start space-x-3">
          <div className="w-8 h-8 bg-illumination-gold/10 rounded-full flex items-center justify-center flex-shrink-0">
            <Icon name="Lightbulb" size={16} className="text-illumination-gold" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-medium text-foreground mb-1">
              New to assessments?
            </h4>
            <p className="text-xs text-muted-foreground mb-2">
              Start with our Quick Screening to get familiar with the process, then move to more comprehensive assessments.
            </p>
            <Button variant="link" size="sm" className="p-0 h-auto text-xs">
              Learn more about our assessment process
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStartSection;