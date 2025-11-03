import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RoleSelector = ({ currentRole, onRoleChange, userProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const roles = [
    {
      id: 'student',
      name: 'Student',
      icon: 'GraduationCap',
      description: 'Access assessments and track progress',
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      id: 'teacher',
      name: 'Teacher',
      icon: 'Users',
      description: 'Manage students and create assessments',
      color: 'bg-emerald-500',
      gradient: 'from-emerald-500 to-emerald-600'
    },
    {
      id: 'parent',
      name: 'Parent',
      icon: 'Heart',
      description: 'Monitor child progress and resources',
      color: 'bg-amber-500',
      gradient: 'from-amber-500 to-amber-600'
    }
  ];

  const currentRoleData = roles?.find(role => role?.id === currentRole);

  return (
    <div className="relative">
      <div className="bg-white rounded-xl shadow-soft border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Your Role</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            Switch
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${currentRoleData?.gradient} flex items-center justify-center shadow-soft`}>
            <Icon name={currentRoleData?.icon} size={24} className="text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-foreground">{currentRoleData?.name}</h4>
            <p className="text-sm text-muted-foreground">{currentRoleData?.description}</p>
          </div>
        </div>

        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border space-y-2">
            {roles?.filter(role => role?.id !== currentRole)?.map((role) => (
              <button
                key={role?.id}
                onClick={() => {
                  onRoleChange(role?.id);
                  setIsExpanded(false);
                }}
                className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-fast text-left"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${role?.gradient} flex items-center justify-center`}>
                  <Icon name={role?.icon} size={16} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{role?.name}</p>
                  <p className="text-xs text-muted-foreground">{role?.description}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RoleSelector;