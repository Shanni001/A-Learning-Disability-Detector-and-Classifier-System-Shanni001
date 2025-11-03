import React from 'react';
import Icon from '../../../components/AppIcon';

const AssessmentStats = ({ 
  totalAssessments = 12,
  completedAssessments = 3,
  inProgressAssessments = 2,
  averageScore = 78,
  timeSpent = 145,
  streakDays = 5
}) => {
  const stats = [
    {
      id: 'total',
      title: 'Total Assessments',
      value: totalAssessments,
      icon: 'FileText',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      description: 'Available assessments'
    },
    {
      id: 'completed',
      title: 'Completed',
      value: completedAssessments,
      icon: 'CheckCircle2',
      color: 'text-empowerment-green',
      bgColor: 'bg-empowerment-green/10',
      description: 'Successfully finished'
    },
    {
      id: 'progress',
      title: 'In Progress',
      value: inProgressAssessments,
      icon: 'Clock',
      color: 'text-illumination-gold',
      bgColor: 'bg-illumination-gold/10',
      description: 'Currently working on'
    },
    {
      id: 'score',
      title: 'Average Score',
      value: `${averageScore}%`,
      icon: 'TrendingUp',
      color: 'text-authority-purple',
      bgColor: 'bg-authority-purple/10',
      description: 'Overall performance'
    },
    {
      id: 'time',
      title: 'Time Spent',
      value: `${timeSpent}m`,
      icon: 'Timer',
      color: 'text-action-red',
      bgColor: 'bg-action-red/10',
      description: 'Total assessment time'
    },
    {
      id: 'streak',
      title: 'Current Streak',
      value: `${streakDays} days`,
      icon: 'Flame',
      color: 'text-illumination-gold',
      bgColor: 'bg-illumination-gold/10',
      description: 'Consecutive active days'
    }
  ];

  const getCompletionRate = () => {
    return Math.round((completedAssessments / totalAssessments) * 100);
  };

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-empowerment-green';
    if (score >= 60) return 'text-illumination-gold';
    return 'text-action-red';
  };

  return (
    <div className="bg-white rounded-xl border border-border p-6 shadow-soft">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-foreground flex items-center space-x-2">
            <Icon name="BarChart3" size={24} className="text-primary" />
            <span>Assessment Statistics</span>
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Your learning assessment performance overview
          </p>
        </div>
        
        <div className="text-right">
          <div className={`text-2xl font-bold ${getScoreColor(getCompletionRate())}`}>
            {getCompletionRate()}%
          </div>
          <div className="text-xs text-muted-foreground">Completion Rate</div>
        </div>
      </div>
      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats?.map((stat) => (
          <div
            key={stat?.id}
            className="p-4 rounded-lg border border-border hover:shadow-soft transition-all duration-fast empowerment-hover"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat?.bgColor}`}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className={`text-xl font-bold ${stat?.color}`}>
                  {stat?.value}
                </div>
                <div className="text-xs text-muted-foreground truncate">
                  {stat?.title}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              {stat?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Progress Visualization */}
      <div className="space-y-4 mb-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Assessment Progress</span>
            <span className="text-sm text-muted-foreground">
              {completedAssessments + inProgressAssessments}/{totalAssessments}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div className="flex h-full">
              <div 
                className="bg-empowerment-green transition-all duration-slow"
                style={{ width: `${(completedAssessments / totalAssessments) * 100}%` }}
              />
              <div 
                className="bg-illumination-gold transition-all duration-slow"
                style={{ width: `${(inProgressAssessments / totalAssessments) * 100}%` }}
              />
            </div>
          </div>
          <div className="flex items-center justify-between mt-1 text-xs">
            <span className="text-empowerment-green">Completed: {completedAssessments}</span>
            <span className="text-illumination-gold">In Progress: {inProgressAssessments}</span>
            <span className="text-muted-foreground">
              Remaining: {totalAssessments - completedAssessments - inProgressAssessments}
            </span>
          </div>
        </div>

        {/* Performance Indicator */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Performance Level</span>
            <span className={`text-sm font-medium ${getScoreColor(averageScore)}`}>
              {averageScore >= 80 ? 'Excellent' : averageScore >= 60 ? 'Good' : 'Needs Improvement'}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className={`h-full transition-all duration-slow ${
                averageScore >= 80 ? 'bg-empowerment-green' : 
                averageScore >= 60 ? 'bg-illumination-gold' : 'bg-action-red'
              }`}
              style={{ width: `${averageScore}%` }}
            />
          </div>
        </div>
      </div>
      {/* Quick Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-3 bg-empowerment-green/5 rounded-lg border border-empowerment-green/20">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="TrendingUp" size={16} className="text-empowerment-green" />
            <span className="text-sm font-medium text-empowerment-green">Strength Area</span>
          </div>
          <p className="text-xs text-muted-foreground">
            ADHD assessments show consistent high performance with 85% average score
          </p>
        </div>
        
        <div className="p-3 bg-illumination-gold/5 rounded-lg border border-illumination-gold/20">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Target" size={16} className="text-illumination-gold" />
            <span className="text-sm font-medium text-illumination-gold">Focus Area</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Continue with Dyslexia assessment to maintain your learning streak
          </p>
        </div>
      </div>
      {/* Achievement Badge */}
      {streakDays >= 7 && (
        <div className="mt-4 p-3 bg-gradient-illumination rounded-lg text-white">
          <div className="flex items-center space-x-2">
            <Icon name="Award" size={20} />
            <div>
              <h4 className="font-semibold">Week Warrior!</h4>
              <p className="text-sm opacity-90">
                You've maintained a {streakDays}-day assessment streak. Keep it up!
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentStats;