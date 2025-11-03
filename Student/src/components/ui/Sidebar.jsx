import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Sidebar = ({ isCollapsed = false, onToggle }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const location = useLocation();

  const navigationItems = [
    {
      name: 'Dashboard',
      path: '/multi-role-dashboard',
      icon: 'LayoutDashboard',
      description: 'Overview & insights',
      badge: null,
    },
    {
      name: 'Assessment Portal',
      path: '/assessment-portal',
      icon: 'ClipboardCheck',
      description: 'AI-powered diagnostics',
      badge: 'New',
      submenu: [
        { name: 'Start Assessment', path: '/assessment-portal/start', icon: 'Play' },
        { name: 'Assessment History', path: '/assessment-portal/history', icon: 'History' },
        { name: 'Templates', path: '/assessment-portal/templates', icon: 'FileText' },
      ],
    },
    {
      name: 'Progress Visualization',
      path: '/progress-visualization',
      icon: 'TrendingUp',
      description: 'Track learning growth',
      badge: null,
      submenu: [
        { name: 'Student Progress', path: '/progress-visualization/students', icon: 'Users' },
        { name: 'Class Overview', path: '/progress-visualization/classes', icon: 'School' },
        { name: 'Reports', path: '/progress-visualization/reports', icon: 'FileBarChart' },
      ],
    },
    {
      name: 'School Integration',
      path: '/school-integration-hub',
      icon: 'Building2',
      description: 'Connect with institutions',
      badge: null,
    },
    {
      name: 'Resource Center',
      path: '/resource-center',
      icon: 'BookOpen',
      description: 'Learning materials',
      badge: '12',
    },
    {
      name: 'Analytics',
      path: '/report-analytics',
      icon: 'BarChart3',
      description: 'Detailed insights',
      badge: null,
    },
  ];

  const bottomItems = [
    { name: 'Settings', path: '/settings', icon: 'Settings', description: 'Preferences' },
    { name: 'Help & Support', path: '/help', icon: 'HelpCircle', description: 'Get assistance' },
  ];

  const isActivePath = (path) => location?.pathname === path || location?.pathname?.startsWith(path + '/');
  const shouldShowExpanded = isCollapsed ? isHovered : true;

  const handleSubmenuToggle = (index) => {
    if (isCollapsed && !isHovered) return;
    setActiveSubmenu(activeSubmenu === index ? null : index);
  };

  return (
    <aside
      className={`fixed left-0 top-16 bottom-0 z-30 bg-white border-r border-border transition-all duration-normal shadow-soft ${
        isCollapsed ? 'w-16 hover:w-64' : 'w-64'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        if (isCollapsed) setActiveSubmenu(null);
      }}
    >
      <div className="flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {shouldShowExpanded && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-secondary rounded-lg flex items-center justify-center">
                <Icon name="Sparkles" size={16} className="text-white" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-foreground">Learning Hub</h2>
                <p className="text-xs text-muted-foreground">Empowering Growth</p>
              </div>
            </div>
          )}
          
          {!isCollapsed && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
              aria-label="Collapse sidebar"
            >
              <Icon name="PanelLeftClose" size={16} />
            </Button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <div className="space-y-1 px-3">
            {navigationItems?.map((item, index) => (
              <div key={item?.path}>
                <div className="relative group">
                  <a
                    href={item?.path}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-fast empowerment-hover ${
                      isActivePath(item?.path)
                        ? 'bg-primary text-primary-foreground shadow-soft'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={item?.icon} size={20} className="flex-shrink-0" />
                    
                    {shouldShowExpanded && (
                      <>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="truncate">{item?.name}</span>
                            {item?.badge && (
                              <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
                                item?.badge === 'New' ?'bg-empowerment-green text-white' :'bg-muted text-muted-foreground'
                              }`}>
                                {item?.badge}
                              </span>
                            )}
                          </div>
                          {item?.description && (
                            <p className="text-xs text-muted-foreground mt-0.5 truncate">
                              {item?.description}
                            </p>
                          )}
                        </div>
                        
                        {item?.submenu && (
                          <button
                            onClick={(e) => {
                              e?.preventDefault();
                              handleSubmenuToggle(index);
                            }}
                            className="flex-shrink-0 p-1 rounded hover:bg-white/20 transition-colors duration-fast"
                          >
                            <Icon 
                              name="ChevronDown" 
                              size={16} 
                              className={`transition-transform duration-fast ${
                                activeSubmenu === index ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        )}
                      </>
                    )}
                  </a>

                  {/* Tooltip for collapsed state */}
                  {isCollapsed && !isHovered && (
                    <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-fast whitespace-nowrap z-50">
                      {item?.name}
                      <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                    </div>
                  )}
                </div>

                {/* Submenu */}
                {item?.submenu && shouldShowExpanded && activeSubmenu === index && (
                  <div className="mt-1 ml-6 space-y-1 border-l-2 border-muted pl-4">
                    {item?.submenu?.map((subItem) => (
                      <a
                        key={subItem?.path}
                        href={subItem?.path}
                        className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-all duration-fast ${
                          isActivePath(subItem?.path)
                            ? 'bg-muted text-foreground font-medium'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                        }`}
                      >
                        <Icon name={subItem?.icon} size={16} />
                        <span>{subItem?.name}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Divider */}
          <div className="my-4 mx-3 border-t border-border"></div>

          {/* Quick Actions */}
          {shouldShowExpanded && (
            <div className="px-3 mb-4">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full justify-start breathing-animation"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  New Assessment
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start"
                >
                  <Icon name="Upload" size={16} className="mr-2" />
                  Import Data
                </Button>
              </div>
            </div>
          )}
        </nav>

        {/* Bottom Section */}
        <div className="border-t border-border p-3">
          <div className="space-y-1">
            {bottomItems?.map((item) => (
              <div key={item?.path} className="relative group">
                <a
                  href={item?.path}
                  className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-fast empowerment-hover ${
                    isActivePath(item?.path)
                      ? 'bg-muted text-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} className="flex-shrink-0" />
                  
                  {shouldShowExpanded && (
                    <div className="flex-1 min-w-0">
                      <span className="truncate">{item?.name}</span>
                      {item?.description && (
                        <p className="text-xs text-muted-foreground mt-0.5 truncate">
                          {item?.description}
                        </p>
                      )}
                    </div>
                  )}
                </a>

                {/* Tooltip for collapsed state */}
                {isCollapsed && !isHovered && (
                  <div className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-fast whitespace-nowrap z-50">
                    {item?.name}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-gray-900"></div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* User Profile */}
          {shouldShowExpanded && (
            <div className="mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-muted transition-colors duration-fast cursor-pointer">
                <div className="w-8 h-8 bg-gradient-illumination rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">Sarah Johnson</p>
                  <p className="text-xs text-muted-foreground truncate">Educator</p>
                </div>
                <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;