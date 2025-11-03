import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalyticsOverview = ({ analytics }) => {
  const cards = [
    {
      title: 'Total Reports',
      value: analytics?.totalReports,
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'bg-gradient-primary'
    },
    {
      title: 'Completed This Month',
      value: analytics?.completedThisMonth,
      change: '+8%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'bg-gradient-secondary'
    },
    {
      title: 'Average Processing Time',
      value: analytics?.avgProcessingTime,
      change: '-15%',
      changeType: 'positive',
      icon: 'Clock',
      color: 'bg-gradient-illumination'
    },
    {
      title: 'Stakeholder Engagement',
      value: analytics?.stakeholderEngagement,
      change: '+23%',
      changeType: 'positive',
      icon: 'Users',
      color: 'bg-authority-purple'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards?.map((card, index) => (
        <div key={index} className="bg-white rounded-lg border border-border p-6 empowerment-hover">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${card?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={card?.icon} size={24} className="text-white" />
            </div>
            <span className={`text-sm font-medium ${
              card?.changeType === 'positive' ? 'text-empowerment-green' : 'text-action-red'
            }`}>
              {card?.change}
            </span>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{card?.value}</h3>
            <p className="text-sm text-muted-foreground">{card?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsOverview;