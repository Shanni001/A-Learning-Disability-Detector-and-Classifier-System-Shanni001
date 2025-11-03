import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SchoolCard = ({ school, onConnect, onViewDetails, isConnected = false }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-empowerment-green bg-empowerment-green/10';
      case 'Pending': return 'text-illumination-gold bg-illumination-gold/10';
      case 'Inactive': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-interactive transition-all duration-fast empowerment-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={school?.logo}
              alt={`${school?.name} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground mb-1 truncate">
              {school?.name}
            </h3>
            <p className="text-sm text-muted-foreground mb-2">
              {school?.location} • {school?.type}
            </p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <span className="flex items-center">
                <Icon name="Users" size={14} className="mr-1" />
                {school?.studentCount} students
              </span>
              <span className="flex items-center">
                <Icon name="GraduationCap" size={14} className="mr-1" />
                {school?.teacherCount} teachers
              </span>
            </div>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(school?.status)}`}>
          {school?.status}
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">Integration Level</span>
          <span className="font-medium text-foreground">{school?.integrationLevel}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-gradient-primary h-2 rounded-full transition-all duration-slow"
            style={{ width: `${school?.integrationLevel}%` }}
          ></div>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Available Features</h4>
        <div className="flex flex-wrap gap-2">
          {school?.features?.map((feature, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted text-xs text-muted-foreground rounded-md"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(school)}
          iconName="Eye"
          iconPosition="left"
        >
          View Details
        </Button>
        
        {isConnected ? (
          <Button
            variant="success"
            size="sm"
            iconName="Check"
            iconPosition="left"
          >
            Connected
          </Button>
        ) : (
          <Button
            variant="default"
            size="sm"
            onClick={() => onConnect(school)}
            iconName="Link"
            iconPosition="left"
          >
            Connect
          </Button>
        )}
      </div>
    </div>
  );
};

export default SchoolCard;