import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CustomizableWidgets = ({ currentRole, onWidgetToggle }) => {
  const [availableWidgets] = useState(() => {
    switch (currentRole) {
      case 'student':
        return [
          {
            id: 'progress-chart',
            name: 'Progress Chart',
            description: 'Visual representation of your learning journey',
            icon: 'TrendingUp',
            enabled: true,
            category: 'Progress'
          },
          {
            id: 'achievements',
            name: 'Achievement Badges',
            description: 'Display your earned badges and rewards',
            icon: 'Trophy',
            enabled: true,
            category: 'Motivation'
          },
          {
            id: 'daily-goals',
            name: 'Daily Goals',
            description: 'Track your daily learning objectives',
            icon: 'Target',
            enabled: false,
            category: 'Goals'
          },
          {
            id: 'study-streak',
            name: 'Study Streak',
            description: 'Monitor your consecutive learning days',
            icon: 'Flame',
            enabled: true,
            category: 'Motivation'
          },
          {
            id: 'upcoming-assessments',
            name: 'Upcoming Assessments',
            description: 'See your scheduled evaluations',
            icon: 'Calendar',
            enabled: false,
            category: 'Schedule'
          },
          {
            id: 'learning-tips',
            name: 'Learning Tips',
            description: 'Personalized study suggestions',
            icon: 'Lightbulb',
            enabled: true,
            category: 'Resources'
          }
        ];
      case 'teacher':
        return [
          {
            id: 'class-overview',
            name: 'Class Overview',
            description: 'Quick snapshot of all your students',
            icon: 'Users',
            enabled: true,
            category: 'Students'
          },
          {
            id: 'recent-assessments',
            name: 'Recent Assessments',
            description: 'Latest student evaluation results',
            icon: 'FileText',
            enabled: true,
            category: 'Assessments'
          },
          {
            id: 'intervention-alerts',
            name: 'Intervention Alerts',
            description: 'Students requiring immediate attention',
            icon: 'AlertTriangle',
            enabled: true,
            category: 'Alerts'
          },
          {
            id: 'performance-analytics',
            name: 'Performance Analytics',
            description: 'Detailed class performance metrics',
            icon: 'BarChart3',
            enabled: false,
            category: 'Analytics'
          },
          {
            id: 'parent-communications',
            name: 'Parent Communications',
            description: 'Recent messages and meeting requests',
            icon: 'MessageCircle',
            enabled: false,
            category: 'Communication'
          },
          {
            id: 'resource-library',
            name: 'Resource Library',
            description: 'Quick access to teaching materials',
            icon: 'BookOpen',
            enabled: true,
            category: 'Resources'
          }
        ];
      case 'parent':
        return [
          {
            id: 'child-progress',
            name: 'Child Progress',
            description: 'Track your child\'s learning development',
            icon: 'TrendingUp',
            enabled: true,
            category: 'Progress'
          },
          {
            id: 'teacher-updates',
            name: 'Teacher Updates',
            description: 'Messages and feedback from teachers',
            icon: 'MessageCircle',
            enabled: true,
            category: 'Communication'
          },
          {
            id: 'home-activities',
            name: 'Home Activities',
            description: 'Recommended activities for home practice',
            icon: 'Home',
            enabled: false,
            category: 'Activities'
          },
          {
            id: 'appointment-calendar',
            name: 'Appointment Calendar',
            description: 'Upcoming meetings and assessments',
            icon: 'Calendar',
            enabled: true,
            category: 'Schedule'
          },
          {
            id: 'support-resources',
            name: 'Support Resources',
            description: 'Helpful guides and materials for parents',
            icon: 'Heart',
            enabled: false,
            category: 'Resources'
          },
          {
            id: 'milestone-tracker',
            name: 'Milestone Tracker',
            description: 'Important developmental milestones',
            icon: 'Flag',
            enabled: true,
            category: 'Progress'
          }
        ];
      default:
        return [];
    }
  });

  const [widgets, setWidgets] = useState(availableWidgets);
  const [showCustomization, setShowCustomization] = useState(false);

  const toggleWidget = (widgetId) => {
    setWidgets(prev => 
      prev?.map(widget => 
        widget?.id === widgetId 
          ? { ...widget, enabled: !widget?.enabled }
          : widget
      )
    );
    if (onWidgetToggle) {
      onWidgetToggle(widgetId);
    }
  };

  const enabledWidgets = widgets?.filter(w => w?.enabled);
  const categories = [...new Set(widgets.map(w => w.category))];

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Dashboard Widgets</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCustomization(!showCustomization)}
          iconName="Settings"
          iconPosition="left"
        >
          Customize
        </Button>
      </div>
      {!showCustomization ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {enabledWidgets?.map((widget) => (
              <div
                key={widget?.id}
                className="p-4 border border-border rounded-lg hover:border-primary/50 transition-colors duration-fast"
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name={widget?.icon} size={16} className="text-primary" />
                  </div>
                  <h4 className="font-medium text-foreground">{widget?.name}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{widget?.description}</p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {widget?.category}
                  </span>
                  <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
                </div>
              </div>
            ))}
          </div>
          
          {enabledWidgets?.length === 0 && (
            <div className="text-center py-8">
              <Icon name="Layout" size={48} className="text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No widgets enabled</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowCustomization(true)}
              >
                Add Widgets
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {categories?.map((category) => (
            <div key={category}>
              <h4 className="font-medium text-foreground mb-3 flex items-center">
                <Icon name="Folder" size={16} className="mr-2 text-muted-foreground" />
                {category}
              </h4>
              <div className="space-y-2 ml-6">
                {widgets?.filter(widget => widget?.category === category)?.map((widget) => (
                    <div
                      key={widget?.id}
                      className="flex items-center justify-between p-3 border border-border rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                          <Icon name={widget?.icon} size={16} className="text-muted-foreground" />
                        </div>
                        <div>
                          <h5 className="font-medium text-foreground">{widget?.name}</h5>
                          <p className="text-sm text-muted-foreground">{widget?.description}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => toggleWidget(widget?.id)}
                        className={`w-12 h-6 rounded-full transition-colors duration-fast ${
                          widget?.enabled 
                            ? 'bg-primary' :'bg-muted'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-fast ${
                            widget?.enabled ? 'translate-x-6' : 'translate-x-0.5'
                          }`}
                        ></div>
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          ))}
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => setShowCustomization(false)}
            >
              Done
            </Button>
            <Button
              variant="default"
              onClick={() => {
                // Reset to defaults
                setWidgets(availableWidgets);
                setShowCustomization(false);
              }}
            >
              Reset to Default
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizableWidgets;