import React from 'react';
import Icon from '../../../components/AppIcon';


const QuickActions = ({ currentRole, onActionClick }) => {
  const getQuickActions = () => {
    switch (currentRole) {
      case 'student':
        return [
          {
            id: 'start-assessment',
            title: 'Start Assessment',
            description: 'Begin a new learning evaluation',
            icon: 'Play',
            color: 'bg-blue-500',
            path: '/assessment-portal'
          },
          {
            id: 'view-progress',
            title: 'My Progress',
            description: 'See how you\'re improving',
            icon: 'TrendingUp',
            color: 'bg-emerald-500',
            path: '/progress-visualization'
          },
          {
            id: 'explore-resources',
            title: 'Learning Resources',
            description: 'Fun activities and games',
            icon: 'BookOpen',
            color: 'bg-amber-500',
            path: '/resource-center'
          },
          {
            id: 'achievements',
            title: 'Achievements',
            description: 'View your badges and rewards',
            icon: 'Trophy',
            color: 'bg-purple-500',
            path: '/progress-visualization'
          }
        ];
      case 'teacher':
        return [
          {
            id: 'create-assessment',
            title: 'Create Assessment',
            description: 'Design new evaluations',
            icon: 'Plus',
            color: 'bg-blue-500',
            path: '/assessment-portal'
          },
          {
            id: 'manage-students',
            title: 'Student Roster',
            description: 'Manage your students',
            icon: 'Users',
            color: 'bg-emerald-500',
            path: '/school-integration-hub'
          },
          {
            id: 'view-analytics',
            title: 'Class Analytics',
            description: 'Track class performance',
            icon: 'BarChart3',
            color: 'bg-amber-500',
            path: '/report-analytics'
          },
          {
            id: 'resources',
            title: 'Teaching Resources',
            description: 'Intervention strategies',
            icon: 'BookOpen',
            color: 'bg-purple-500',
            path: '/resource-center'
          }
        ];
      case 'parent':
        return [
          {
            id: 'child-progress',
            title: 'Child\'s Progress',
            description: 'Track learning journey',
            icon: 'TrendingUp',
            color: 'bg-blue-500',
            path: '/progress-visualization'
          },
          {
            id: 'schedule-assessment',
            title: 'Schedule Assessment',
            description: 'Book evaluation session',
            icon: 'Calendar',
            color: 'bg-emerald-500',
            path: '/assessment-portal'
          },
          {
            id: 'parent-resources',
            title: 'Parent Resources',
            description: 'Support strategies',
            icon: 'Heart',
            color: 'bg-amber-500',
            path: '/resource-center'
          },
          {
            id: 'connect-school',
            title: 'School Connection',
            description: 'Collaborate with teachers',
            icon: 'Building2',
            color: 'bg-purple-500',
            path: '/school-integration-hub'
          }
        ];
      default:
        return [];
    }
  };

  const actions = getQuickActions();

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
        <Icon name="Zap" size={20} className="text-amber-500" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onActionClick(action?.path)}
            className="group p-4 rounded-lg border border-border hover:border-primary/50 hover:shadow-soft transition-all duration-fast text-left empowerment-hover"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 ${action?.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-fast`}>
                <Icon name={action?.icon} size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors duration-fast">
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {action?.description}
                </p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-fast" 
              />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;