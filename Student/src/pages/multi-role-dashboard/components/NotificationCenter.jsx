import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = ({ currentRole }) => {
  const [notifications, setNotifications] = useState(() => {
    switch (currentRole) {
      case 'student':
        return [
          {
            id: 1,
            type: 'achievement',
            title: 'New Badge Earned!',
            message: 'You\'ve earned the "Persistent Learner" badge for completing 5 assessments.',
            timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
            read: false,
            priority: 'high'
          },
          {
            id: 2,
            type: 'reminder',
            title: 'Assessment Reminder',
            message: 'Don\'t forget to complete your weekly math assessment.',
            timestamp: new Date(Date.now() - 7200000), // 2 hours ago
            read: false,
            priority: 'medium'
          },
          {
            id: 3,
            type: 'resource',
            title: 'New Learning Game',
            message: 'Check out the new "Word Builder" game in your resources!',
            timestamp: new Date(Date.now() - 86400000), // 1 day ago
            read: true,
            priority: 'low'
          }
        ];
      case 'teacher':
        return [
          {
            id: 1,
            type: 'student',
            title: 'Student Needs Attention',
            message: 'Michael\'s assessment results suggest additional support may be needed.',
            timestamp: new Date(Date.now() - 3600000), // 1 hour ago
            read: false,
            priority: 'high'
          },
          {
            id: 2,
            type: 'system',
            title: 'New Assessment Template',
            message: 'Updated Dysgraphia assessment template is now available.',
            timestamp: new Date(Date.now() - 10800000), // 3 hours ago
            read: false,
            priority: 'medium'
          },
          {
            id: 3,
            type: 'meeting',
            title: 'Parent Meeting Tomorrow',
            message: 'Scheduled meeting with Sarah\'s parents at 2:00 PM.',
            timestamp: new Date(Date.now() - 172800000), // 2 days ago
            read: true,
            priority: 'medium'
          }
        ];
      case 'parent':
        return [
          {
            id: 1,
            type: 'progress',
            title: 'Weekly Progress Report',
            message: 'Emma\'s reading comprehension improved by 12% this week!',
            timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
            read: false,
            priority: 'high'
          },
          {
            id: 2,
            type: 'teacher',
            title: 'Message from Teacher',
            message: 'Ms. Johnson shared new home activities for Emma.',
            timestamp: new Date(Date.now() - 14400000), // 4 hours ago
            read: false,
            priority: 'medium'
          },
          {
            id: 3,
            type: 'appointment',
            title: 'Assessment Scheduled',
            message: 'Monthly evaluation appointment confirmed for next Tuesday.',
            timestamp: new Date(Date.now() - 259200000), // 3 days ago
            read: true,
            priority: 'medium'
          }
        ];
      default:
        return [];
    }
  });

  const [showAll, setShowAll] = useState(false);

  const unreadCount = notifications?.filter(n => !n?.read)?.length;
  const displayedNotifications = showAll ? notifications : notifications?.slice(0, 3);

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev?.map(notification => 
        notification?.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev?.map(notification => ({ ...notification, read: true }))
    );
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'achievement': return 'Trophy';
      case 'reminder': return 'Clock';
      case 'resource': return 'BookOpen';
      case 'student': return 'User';
      case 'system': return 'Settings';
      case 'meeting': return 'Calendar';
      case 'progress': return 'TrendingUp';
      case 'teacher': return 'MessageCircle';
      case 'appointment': return 'CalendarCheck';
      default: return 'Bell';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-amber-600 bg-amber-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
            >
              Mark all read
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
          >
            <Icon name="Settings" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {displayedNotifications?.map((notification) => (
          <div
            key={notification?.id}
            className={`p-4 rounded-lg border transition-all duration-fast cursor-pointer ${
              notification?.read 
                ? 'border-border bg-muted/30' :'border-primary/20 bg-primary/5 hover:bg-primary/10'
            }`}
            onClick={() => markAsRead(notification?.id)}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${getPriorityColor(notification?.priority)}`}>
                <Icon name={getNotificationIcon(notification?.type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <h4 className={`font-medium ${notification?.read ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {notification?.title}
                  </h4>
                  <span className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                    {formatTimestamp(notification?.timestamp)}
                  </span>
                </div>
                <p className={`text-sm mt-1 ${notification?.read ? 'text-muted-foreground' : 'text-foreground/80'}`}>
                  {notification?.message}
                </p>
                {!notification?.read && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {notifications?.length > 3 && (
        <div className="mt-4 text-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAll(!showAll)}
            iconName={showAll ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showAll ? 'Show Less' : `Show ${notifications?.length - 3} More`}
          </Button>
        </div>
      )}
      {notifications?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No notifications yet</p>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;