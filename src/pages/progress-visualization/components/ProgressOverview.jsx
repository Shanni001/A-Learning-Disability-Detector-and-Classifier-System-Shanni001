import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ studentData, selectedTimeframe }) => {
  const overviewStats = [
    {
      title: "Overall Progress",
      value: "78%",
      change: "+12%",
      trend: "up",
      icon: "TrendingUp",
      color: "text-empowerment-green",
      bgColor: "bg-empowerment-green/10"
    },
    {
      title: "Assessment Completion",
      value: "24/30",
      change: "+3",
      trend: "up",
      icon: "ClipboardCheck",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      title: "Learning Areas",
      value: "4 Active",
      change: "2 Improved",
      trend: "up",
      icon: "BookOpen",
      color: "text-illumination-gold",
      bgColor: "bg-illumination-gold/10"
    },
    {
      title: "Intervention Success",
      value: "85%",
      change: "+8%",
      trend: "up",
      icon: "Target",
      color: "text-authority-purple",
      bgColor: "bg-authority-purple/10"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {overviewStats?.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-xl p-6 shadow-soft border border-border empowerment-hover"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className="flex items-center space-x-1 text-sm">
              <Icon 
                name={stat?.trend === 'up' ? 'ArrowUp' : 'ArrowDown'} 
                size={16} 
                className="text-empowerment-green" 
              />
              <span className="text-empowerment-green font-medium">{stat?.change}</span>
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressOverview;