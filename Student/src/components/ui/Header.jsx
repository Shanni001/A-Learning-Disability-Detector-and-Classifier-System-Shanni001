import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = ({ onMenuToggle, isMenuOpen = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigationItems = [
    { name: 'Dashboard', path: '/multi-role-dashboard', icon: 'LayoutDashboard' },
    { name: 'Assessment', path: '/assessment-portal', icon: 'ClipboardCheck' },
    { name: 'Progress', path: '/progress-visualization', icon: 'TrendingUp' },
    { name: 'Integration', path: '/school-integration-hub', icon: 'Building2' },
    { name: 'Resources', path: '/resource-center', icon: 'BookOpen' },
  ];

  const moreItems = [
    { name: 'Analytics', path: '/report-analytics', icon: 'BarChart3' },
    { name: 'Settings', path: '/settings', icon: 'Settings' },
    { name: 'Help', path: '/help', icon: 'HelpCircle' },
  ];

  const handleMobileMenuToggle = () => {
    setShowMobileMenu(!showMobileMenu);
    if (onMenuToggle) {
      onMenuToggle(!showMobileMenu);
    }
  };

  const isActivePath = (path) => location?.pathname === path;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-fast ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-sm shadow-soft border-b border-border' 
            : 'bg-white'
        }`}
      >
        <div className="w-full">
          <div className="flex items-center justify-between h-16 px-4 lg:px-6">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={handleMobileMenuToggle}
                className="lg:hidden p-2 rounded-md hover:bg-muted transition-colors duration-fast"
                aria-label="Toggle menu"
              >
                <Icon 
                  name={showMobileMenu ? "X" : "Menu"} 
                  size={24} 
                  className="text-foreground"
                />
              </button>
              
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center shadow-soft">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="text-white"
                    >
                      <path
                        d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"
                        fill="currentColor"
                        className="animate-pulse"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        fill="rgba(255,255,255,0.3)"
                        className="animate-breathe"
                      />
                    </svg>
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-empowerment-green rounded-full flex items-center justify-center">
                    <Icon name="Sparkles" size={10} className="text-white" />
                  </div>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-foreground tracking-tight">
                    Angaza<span className="text-empowerment-green">Learn</span>
                  </h1>
                  <p className="text-xs text-muted-foreground -mt-1">
                    Illuminating Every Child's Potential
                  </p>
                </div>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navigationItems?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-fast empowerment-hover ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.name}</span>
                </a>
              ))}
              
              {/* More Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-fast empowerment-hover">
                  <Icon name="MoreHorizontal" size={18} />
                  <span>More</span>
                </button>
                
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-fast z-50">
                  <div className="py-2">
                    {moreItems?.map((item) => (
                      <a
                        key={item?.path}
                        href={item?.path}
                        className="flex items-center space-x-3 px-4 py-2 text-sm text-popover-foreground hover:bg-muted transition-colors duration-fast"
                      >
                        <Icon name={item?.icon} size={16} />
                        <span>{item?.name}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </nav>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Notifications"
              >
                <Icon name="Bell" size={20} />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-action-red rounded-full"></span>
              </Button>
              
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center space-x-2"
              >
                <Icon name="User" size={16} />
                <span>Profile</span>
              </Button>
              
              <Button
                variant="default"
                size="sm"
                className="bg-gradient-primary hover:opacity-90 breathing-animation"
              >
                <Icon name="Plus" size={16} className="mr-2" />
                <span className="hidden sm:inline">New Assessment</span>
                <span className="sm:hidden">New</span>
              </Button>
            </div>
          </div>
        </div>
      </header>
      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={handleMobileMenuToggle}
          ></div>
          
          <div className="fixed top-16 left-0 right-0 bg-white border-b border-border shadow-elevated">
            <nav className="px-4 py-6 space-y-2">
              {[...navigationItems, ...moreItems]?.map((item) => (
                <a
                  key={item?.path}
                  href={item?.path}
                  onClick={handleMobileMenuToggle}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-fast touch-target ${
                    isActivePath(item?.path)
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.name}</span>
                </a>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;