import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ activities = [], onViewAll }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'assessment_started': return 'Play';
      case 'assessment_completed': return 'CheckCircle2';
      case 'assessment_paused': return 'Pause';
      case 'report_generated': return 'FileText';
      case 'milestone_achieved': return 'Award';
      default: return 'Activity';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'assessment_started': return 'text-primary bg-primary/10';
      case 'assessment_completed': return 'text-empowerment-green bg-empowerment-green/10';
      case 'assessment_paused': return 'text-illumination-gold bg-illumination-gold/10';
      case 'report_generated': return 'text-authority-purple bg-authority-purple/10';
      case 'milestone_achieved': return 'text-illumination-gold bg-illumination-gold/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const mockActivities = [
    {
      id: 1,
      type: 'assessment_completed',
      title: 'ADHD Assessment Completed',
      description: 'Successfully completed comprehensive ADHD screening with 85% accuracy score',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      metadata: { score: 85, duration: '25 minutes' }
    },
    {
      id: 2,
      type: 'milestone_achieved',
      title: 'First Assessment Milestone',
      description: 'Congratulations! You have completed your first learning disability assessment',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      metadata: { badge: 'First Steps' }
    },
    {
      id: 3,
      type: 'assessment_started',
      title: 'Dyslexia Assessment Started',
      description: 'Began comprehensive dyslexia screening assessment',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      metadata: { progress: 60 }
    },
    {
      id: 4,
      type: 'report_generated',
      title: 'Assessment Report Generated',
      description: 'Detailed ADHD assessment report with recommendations is now available',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      metadata: { reportType: 'ADHD Comprehensive' }
    },
    {
      id: 5,
      type: 'assessment_paused',
      title: 'Assessment Session Paused',
      description: 'Dyscalculia assessment paused at question 15 of 30',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      metadata: { progress: 50, questionsCompleted: 15 }
    }
  ];

  const displayActivities = activities?.length > 0 ? activities : mockActivities;

  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Icon name="Activity" size={24} className="text-primary" />
            <span>Recent Activity</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your latest assessment activities and achievements
          </p>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onViewAll}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>
      {/* Activity Timeline */}
      <div className="space-y-4">
        {displayActivities?.slice(0, 5)?.map((activity, index) => {
          const isLast = index === displayActivities?.slice(0, 5)?.length - 1;
          
          return (
            <div key={activity?.id} className="relative">
              <div className="flex items-start space-x-4">
                {/* Activity Icon */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getActivityColor(activity?.type)}`}>
                  <Icon name={getActivityIcon(activity?.type)} size={16} />
                </div>
                
                {/* Activity Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-foreground">
                        {activity?.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                        {activity?.description}
                      </p>
                      
                      {/* Activity Metadata */}
                      {activity?.metadata && (
                        <div className="flex items-center space-x-4 mt-2">
                          {activity?.metadata?.score && (
                            <span className="text-xs text-empowerment-green font-medium">
                              Score: {activity?.metadata?.score}%
                            </span>
                          )}
                          {activity?.metadata?.duration && (
                            <span className="text-xs text-muted-foreground">
                              Duration: {activity?.metadata?.duration}
                            </span>
                          )}
                          {activity?.metadata?.progress && (
                            <span className="text-xs text-illumination-gold font-medium">
                              Progress: {activity?.metadata?.progress}%
                            </span>
                          )}
                          {activity?.metadata?.badge && (
                            <span className="inline-flex items-center space-x-1 px-2 py-1 bg-illumination-gold/10 text-illumination-gold rounded-full text-xs font-medium">
                              <Icon name="Award" size={12} />
                              <span>{activity?.metadata?.badge}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>
                    
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-4">
                      {formatTimeAgo(activity?.timestamp)}
                    </span>
                  </div>
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
      {/* Empty State */}
      {displayActivities?.length === 0 && (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">No Recent Activity</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start your first assessment to see your activity timeline here.
          </p>
          <Button variant="default" size="sm">
            Start Assessment
          </Button>
        </div>
      )}
      {/* Activity Summary */}
      {displayActivities?.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-lg font-semibold text-empowerment-green">
                {displayActivities?.filter(a => a?.type === 'assessment_completed')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-illumination-gold">
                {displayActivities?.filter(a => a?.type === 'assessment_started' || a?.type === 'assessment_paused')?.length}
              </div>
              <div className="text-xs text-muted-foreground">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-primary">
                {displayActivities?.filter(a => a?.type === 'milestone_achieved')?.length}
              </div>
              <div className="text-xs text-muted-foreground">Achievements</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;