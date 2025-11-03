import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const IntegrationDashboard = ({ onViewDetails }) => {
  const integrationStats = [
    {
      title: "Active Integrations",
      value: "12",
      change: 8.5,
      icon: "Link",
      color: "primary"
    },
    {
      title: "Data Sync Success",
      value: "98.7%",
      change: 2.1,
      icon: "RefreshCw",
      color: "secondary"
    },
    {
      title: "API Calls Today",
      value: "2,847",
      change: -5.2,
      icon: "Activity",
      color: "warning"
    },
    {
      title: "Error Rate",
      value: "0.3%",
      change: -12.8,
      icon: "AlertTriangle",
      color: "danger"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      type: "sync",
      school: "Nairobi Primary School",
      action: "Student data synchronized successfully",
      timestamp: "2 minutes ago",
      status: "success"
    },
    {
      id: 2,
      type: "connection",
      school: "Mombasa High School",
      action: "New integration established",
      timestamp: "15 minutes ago",
      status: "success"
    },
    {
      id: 3,
      type: "error",
      school: "Kisumu Academy",
      action: "API authentication failed",
      timestamp: "1 hour ago",
      status: "error"
    },
    {
      id: 4,
      type: "update",
      school: "Eldoret Secondary",
      action: "Assessment data updated",
      timestamp: "2 hours ago",
      status: "success"
    }
  ];

  const getActivityIcon = (type) => {
    switch (type) {
      case 'sync': return 'RefreshCw';
      case 'connection': return 'Link';
      case 'error': return 'AlertCircle';
      case 'update': return 'Edit';
      default: return 'Activity';
    }
  };

  const getActivityColor = (status) => {
    switch (status) {
      case 'success': return 'text-empowerment-green';
      case 'error': return 'text-action-red';
      case 'warning': return 'text-illumination-gold';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Actions */}
      <div className="bg-gradient-primary rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">Integration Dashboard</h2>
            <p className="text-white/80 mb-4">
              Monitor and manage all your school integrations from one place
            </p>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                iconName="Plus"
                iconPosition="left"
              >
                New Integration
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                iconName="Settings"
                iconPosition="left"
              >
                Settings
              </Button>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center">
              <Icon name="Building2" size={48} className="text-white/60" />
            </div>
          </div>
        </div>
      </div>
      {/* Integration Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {integrationStats?.map((stat, index) => (
          <div key={index} className="bg-card border border-border rounded-lg p-6 empowerment-hover">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat?.color === 'primary' ? 'bg-primary/10' :
                stat?.color === 'secondary' ? 'bg-empowerment-green/10' :
                stat?.color === 'warning'? 'bg-illumination-gold/10' : 'bg-action-red/10'
              }`}>
                <Icon 
                  name={stat?.icon} 
                  size={24} 
                  className={
                    stat?.color === 'primary' ? 'text-primary' :
                    stat?.color === 'secondary' ? 'text-empowerment-green' :
                    stat?.color === 'warning'? 'text-illumination-gold' : 'text-action-red'
                  }
                />
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat?.change > 0 ? 'text-empowerment-green' : 'text-action-red'
              }`}>
                <Icon 
                  name={stat?.change > 0 ? "TrendingUp" : "TrendingDown"} 
                  size={16} 
                />
                <span>{Math.abs(stat?.change)}%</span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
              <p className="text-sm text-muted-foreground">{stat?.title}</p>
            </div>
          </div>
        ))}
      </div>
      {/* Recent Activity */}
      <div className="bg-card border border-border rounded-lg">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <Button variant="outline" size="sm" iconName="ExternalLink">
            View All
          </Button>
        </div>
        
        <div className="divide-y divide-border">
          {recentActivity?.map((activity) => (
            <div key={activity?.id} className="p-6 hover:bg-muted/30 transition-colors duration-fast">
              <div className="flex items-start space-x-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity?.status === 'success' ? 'bg-empowerment-green/10' :
                  activity?.status === 'error'? 'bg-action-red/10' : 'bg-illumination-gold/10'
                }`}>
                  <Icon 
                    name={getActivityIcon(activity?.type)} 
                    size={20} 
                    className={getActivityColor(activity?.status)}
                  />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground truncate">
                      {activity?.school}
                    </p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {activity?.timestamp}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {activity?.action}
                  </p>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewDetails(activity)}
                  iconName="ChevronRight"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">System Health</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">API Response Time</span>
              <span className="text-sm font-medium text-empowerment-green">142ms</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-empowerment-green h-2 rounded-full w-3/4"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Database Connection</span>
              <span className="text-sm font-medium text-empowerment-green">Healthy</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-empowerment-green h-2 rounded-full w-full"></div>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Server Load</span>
              <span className="text-sm font-medium text-illumination-gold">Moderate</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-illumination-gold h-2 rounded-full w-2/3"></div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Integration Tips</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Icon name="Lightbulb" size={20} className="text-illumination-gold mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Optimize Sync Frequency</p>
                <p className="text-xs text-muted-foreground">
                  Reduce API calls by adjusting sync intervals based on data update patterns
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="Shield" size={20} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Security Best Practices</p>
                <p className="text-xs text-muted-foreground">
                  Regularly rotate API keys and monitor access logs for unusual activity
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3">
              <Icon name="Zap" size={20} className="text-empowerment-green mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Performance Monitoring</p>
                <p className="text-xs text-muted-foreground">
                  Set up alerts for response time degradation and error rate spikes
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntegrationDashboard;