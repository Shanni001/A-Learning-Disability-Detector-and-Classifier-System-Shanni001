import React from 'react';
import Icon from '../../../components/AppIcon';

const IntegrationStatusCard = ({ title, value, change, icon, color = "primary" }) => {
  const getColorClasses = (colorType) => {
    const colors = {
      primary: {
        bg: 'bg-primary/10',
        text: 'text-primary',
        icon: 'text-primary'
      },
      secondary: {
        bg: 'bg-empowerment-green/10',
        text: 'text-empowerment-green',
        icon: 'text-empowerment-green'
      },
      warning: {
        bg: 'bg-illumination-gold/10',
        text: 'text-illumination-gold',
        icon: 'text-illumination-gold'
      },
      danger: {
        bg: 'bg-action-red/10',
        text: 'text-action-red',
        icon: 'text-action-red'
      }
    };
    return colors?.[colorType] || colors?.primary;
  };

  const colorClasses = getColorClasses(color);
  const isPositiveChange = change && change > 0;

  return (
    <div className="bg-card border border-border rounded-lg p-6 empowerment-hover">
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg ${colorClasses?.bg} flex items-center justify-center`}>
          <Icon name={icon} size={24} className={colorClasses?.icon} />
        </div>
        {change !== undefined && (
          <div className={`flex items-center space-x-1 text-sm ${
            isPositiveChange ? 'text-empowerment-green' : 'text-action-red'
          }`}>
            <Icon 
              name={isPositiveChange ? "TrendingUp" : "TrendingDown"} 
              size={16} 
            />
            <span>{Math.abs(change)}%</span>
          </div>
        )}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-foreground mb-1">{value}</h3>
        <p className="text-sm text-muted-foreground">{title}</p>
      </div>
    </div>
  );
};

export default IntegrationStatusCard;