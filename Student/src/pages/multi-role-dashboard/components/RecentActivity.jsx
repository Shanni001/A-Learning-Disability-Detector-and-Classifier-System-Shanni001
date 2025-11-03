import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentActivity = ({ currentRole }) => {
  const getRecentActivities = () => {
    switch (currentRole) {
      case 'student':
        return [
          {
            id: 1,
            type: 'assessment',
            title: 'Completed Dyslexia Assessment',
            description: 'Great job! You scored 85% on reading comprehension.',
            timestamp: '2 hours ago',
            icon: 'CheckCircle',
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50'
          },
          {
            id: 2,
            type: 'achievement',
            title: 'Earned "Reading Champion" Badge',
            description: 'You\'ve completed 5 reading assessments this month!',
            timestamp: '1 day ago',
            icon: 'Trophy',
            color: 'text-amber-600',
            bgColor: 'bg-amber-50'
          },
          {
            id: 3,
            type: 'resource',
            title: 'New Learning Game Available',
            description: 'Try the new "Math Adventure" game in your resources.',
            timestamp: '2 days ago',
            icon: 'Gamepad2',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
          },
          {
            id: 4,
            type: 'progress',
            title: 'Weekly Progress Report',
            description: 'Your learning streak is now 7 days! Keep it up!',
            timestamp: '3 days ago',
            icon: 'TrendingUp',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
          }
        ];
      case 'teacher':
        return [
          {
            id: 1,
            type: 'student',
            title: 'Sarah completed ADHD assessment',
            description: 'Results show significant improvement in attention span.',
            timestamp: '1 hour ago',
            icon: 'User',
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50'
          },
          {
            id: 2,
            type: 'assessment',
            title: 'Created new Dyscalculia assessment',
            description: 'Assessment "Number Patterns" is ready for student use.',
            timestamp: '4 hours ago',
            icon: 'FileText',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
          },
          {
            id: 3,
            type: 'analytics',
            title: 'Class performance report generated',
            description: 'Monthly analytics show 23% improvement across all students.',
            timestamp: '1 day ago',
            icon: 'BarChart3',
            color: 'text-amber-600',
            bgColor: 'bg-amber-50'
          },
          {
            id: 4,
            type: 'collaboration',
            title: 'Parent meeting scheduled',
            description: 'Meeting with John\'s parents set for Friday 2 PM.',
            timestamp: '2 days ago',
            icon: 'Calendar',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
          }
        ];
      case 'parent':
        return [
          {
            id: 1,
            type: 'progress',
            title: 'Emma\'s weekly progress update',
            description: 'Significant improvement in reading comprehension (78% → 85%).',
            timestamp: '3 hours ago',
            icon: 'TrendingUp',
            color: 'text-emerald-600',
            bgColor: 'bg-emerald-50'
          },
          {
            id: 2,
            type: 'teacher',
            title: 'Message from Ms. Johnson',
            description: 'Emma showed great focus during today\'s math session.',
            timestamp: '1 day ago',
            icon: 'MessageCircle',
            color: 'text-blue-600',
            bgColor: 'bg-blue-50'
          },
          {
            id: 3,
            type: 'resource',
            title: 'New home activity recommended',
            description: 'Try the "Pattern Recognition" exercises this weekend.',
            timestamp: '2 days ago',
            icon: 'BookOpen',
            color: 'text-amber-600',
            bgColor: 'bg-amber-50'
          },
          {
            id: 4,
            type: 'assessment',
            title: 'Assessment reminder',
            description: 'Monthly evaluation scheduled for next Tuesday.',
            timestamp: '3 days ago',
            icon: 'Clock',
            color: 'text-purple-600',
            bgColor: 'bg-purple-50'
          }
        ];
      default:
        return [];
    }
  };

  const activities = getRecentActivities();

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
        <Button
          variant="ghost"
          size="sm"
          iconName="MoreHorizontal"
        >
          View All
        </Button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-fast">
            <div className={`w-10 h-10 ${activity?.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
              <Icon name={activity?.icon} size={20} className={activity?.color} />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground mb-1">{activity?.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{activity?.description}</p>
              <div className="flex items-center space-x-2">
                <Icon name="Clock" size={12} className="text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{activity?.timestamp}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity duration-fast"
            >
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        ))}
      </div>
      {activities?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No recent activity to show</p>
        </div>
      )}
    </div>
  );
};

export default RecentActivity;