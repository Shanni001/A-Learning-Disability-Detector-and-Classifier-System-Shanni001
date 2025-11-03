import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AssessmentCard = ({ 
  assessment, 
  onStart, 
  onViewDetails, 
  isRecommended = false,
  completionRate = 0 
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'text-empowerment-green bg-empowerment-green/10';
      case 'Intermediate': return 'text-illumination-gold bg-illumination-gold/10';
      case 'Advanced': return 'text-action-red bg-action-red/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusIcon = () => {
    if (completionRate === 100) return 'CheckCircle2';
    if (completionRate > 0) return 'Clock';
    return 'Play';
  };

  const getStatusColor = () => {
    if (completionRate === 100) return 'text-empowerment-green';
    if (completionRate > 0) return 'text-illumination-gold';
    return 'text-primary';
  };

  return (
    <div className={`relative bg-white rounded-xl border-2 transition-all duration-fast empowerment-hover ${
      isRecommended 
        ? 'border-empowerment-green shadow-soft glow-secondary' 
        : 'border-border hover:border-primary/30'
    }`}>
      {/* Recommended Badge */}
      {isRecommended && (
        <div className="absolute -top-3 left-4 bg-empowerment-green text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center space-x-1">
          <Icon name="Sparkles" size={12} />
          <span>Recommended</span>
        </div>
      )}
      {/* Progress Bar */}
      {completionRate > 0 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-muted rounded-t-xl overflow-hidden">
          <div 
            className="h-full bg-gradient-primary transition-all duration-slow"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      )}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${assessment?.bgColor}`}>
              <Icon name={assessment?.icon} size={24} className={assessment?.iconColor} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">{assessment?.title}</h3>
              <p className="text-sm text-muted-foreground">{assessment?.category}</p>
            </div>
          </div>
          
          <div className={`flex items-center space-x-1 ${getStatusColor()}`}>
            <Icon name={getStatusIcon()} size={16} />
            <span className="text-xs font-medium">
              {completionRate === 100 ? 'Complete' : completionRate > 0 ? 'In Progress' : 'Start'}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {assessment?.description}
        </p>

        {/* Metadata */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Clock" size={14} />
              <span>{assessment?.duration}</span>
            </div>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground">
              <Icon name="Users" size={14} />
              <span>{assessment?.ageRange}</span>
            </div>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(assessment?.difficulty)}`}>
            {assessment?.difficulty}
          </span>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {assessment?.features?.slice(0, 3)?.map((feature, index) => (
            <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
              <Icon name="Check" size={12} />
              <span>{feature}</span>
            </span>
          ))}
          {assessment?.features?.length > 3 && (
            <span className="px-2 py-1 bg-muted rounded-md text-xs text-muted-foreground">
              +{assessment?.features?.length - 3} more
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button
            variant="default"
            size="sm"
            onClick={() => onStart(assessment)}
            className="flex-1 bg-gradient-primary breathing-animation"
            iconName={completionRate > 0 ? "Play" : "ArrowRight"}
            iconPosition="right"
          >
            {completionRate === 100 ? 'Retake' : completionRate > 0 ? 'Continue' : 'Start Assessment'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => onViewDetails(assessment)}
            iconName="Info"
          >
            Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentCard;