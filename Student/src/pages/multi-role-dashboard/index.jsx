import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Sidebar from '../../components/ui/Sidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

// Import all components
import RoleSelector from './components/RoleSelector';
import WelcomeCard from './components/WelcomeCard';
import QuickActions from './components/QuickActions';
import ProgressOverview from './components/ProgressOverview';
import RecentActivity from './components/RecentActivity';
import { useAuth } from "../../contexts/AuthContext";
import CustomizableWidgets from './components/CustomizableWidgets';

const MultiRoleDashboard = () => {
  const navigate = useNavigate();
  const [currentRole, setCurrentRole] = useState('student');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
const { user } = useAuth();   // <-- real user from Supabase

const [userProfile, setUserProfile] = useState(null);

useEffect(() => {
  if (user) {
    setUserProfile({
      full_name: user.full_name,
      email: user.email,
      school: user.school,
      
    });
  }
}, [user]);

// 🔥 Load preferences
  useEffect(() => {
    const savedRole = localStorage.getItem("angazalearn-role");
    if (savedRole) setCurrentRole(savedRole);
  }, []);

  useEffect(() => {
    localStorage.setItem("angazalearn-role", currentRole);
  }, [currentRole]);

// 🚨 PREVENT CRASH: Show loading page until userProfile is set
  if (!userProfile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl">
        Loading your profile...
      </div>
    );
  }

  // Load saved preferences
  /*useEffect(() => {
    const savedRole = localStorage.getItem('angazalearn-role');
    const savedTheme = localStorage.getItem('angazalearn-theme');
    const savedSidebar = localStorage.getItem('angazalearn-sidebar');

    if (savedRole) setCurrentRole(savedRole);
    if (savedTheme) setIsDarkMode(savedTheme === 'dark');
    if (savedSidebar) setSidebarCollapsed(savedSidebar === 'collapsed');
  }, []);*/

  // Save preferences
 /* useEffect(() => {
    localStorage.setItem('angazalearn-role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    localStorage.setItem('angazalearn-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem('angazalearn-sidebar', sidebarCollapsed ? 'collapsed' : 'expanded');
  }, [sidebarCollapsed]);*/

  const handleRoleChange = (newRole) => {
    setCurrentRole(newRole);
    // Update user profile based on role
    
  };

  const handleQuickAction = (path) => {
    navigate(path);
  };

  const handleWidgetToggle = (widgetId) => {
    console.log('Widget toggled:', widgetId);
    // Handle widget customization logic here
  };

  const getRoleBasedGreeting = () => {
    const hour = new Date()?.getHours();
    const timeOfDay = hour < 12 ? 'morning' : hour < 18 ? 'afternoon' : 'evening';
    
    switch (currentRole) {
      case 'student':
        return `Good ${timeOfDay}! Ready to explore and learn something amazing today?`;
      case 'teacher':
        return `Good ${timeOfDay}! Let's inspire young minds and make a difference today.`;
      case 'parent':
        return `Good ${timeOfDay}! Supporting your child's learning journey every step of the way.`;
      default:
        return `Good ${timeOfDay}! Welcome to AngazaLearn.`;
    }
  };

  return (
    <div className={`min-h-screen bg-background ${isDarkMode ? 'dark' : ''}`}>
      <Header onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={`transition-all duration-normal ${
        sidebarCollapsed ? 'ml-16' : 'ml-64'
      } pt-16`}>
        <div className="p-6 max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Dashboard
              </h1>
              <p className="text-muted-foreground">
                {getRoleBasedGreeting()}
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Theme Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="relative"
              >
                <Icon 
                  name={isDarkMode ? "Sun" : "Moon"} 
                  size={20} 
                  className="transition-transform duration-fast" 
                />
              </Button>
              
              {/* Sidebar Toggle for Desktop */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                className="hidden lg:flex"
              >
                <Icon 
                  name={sidebarCollapsed ? "PanelLeftOpen" : "PanelLeftClose"} 
                  size={20} 
                />
              </Button>
              
              {/* Profile Menu */}
              
            </div>
          </div>

          {/* Main Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-8 space-y-6">
              {/* Welcome Card */}
              <WelcomeCard 
                userProfile={userProfile} 
                currentRole={currentRole} 
                 />

              
              
              {/* Quick Actions */}
              <QuickActions 
                currentRole={currentRole} 
                onActionClick={handleQuickAction} 
              />
              
              {/* Progress Overview */}
              <ProgressOverview 
                currentRole={currentRole} 
                userProfile={userProfile} 
              />
              
              {/* Customizable Widgets */}
              <CustomizableWidgets 
                currentRole={currentRole} 
                onWidgetToggle={handleWidgetToggle} 
              />
            </div>

            {/* Right Column */}
            <div className="lg:col-span-4 space-y-6">
              {/* Role Selector */}
              <RoleSelector 
                currentRole={currentRole} 
                onRoleChange={handleRoleChange} 
                userProfile={userProfile} 
              />
              
             
              
              {/* Recent Activity */}
              <RecentActivity currentRole={currentRole} />
              
              {/* Quick Stats Card */}
              <div className="bg-white rounded-xl shadow-soft border border-border p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  {currentRole === 'student' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Learning Streak</span>
                        <div className="flex items-center space-x-2">
                          <Icon name="Flame" size={16} className="text-orange-500" />
                          <span className="font-semibold text-foreground">7 days</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Assessments Completed</span>
                        <span className="font-semibold text-foreground">12</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Badges Earned</span>
                        <span className="font-semibold text-foreground">5</span>
                      </div>
                    </>
                  )}
                  
                  {currentRole === 'teacher' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Active Students</span>
                        <span className="font-semibold text-foreground">28</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Assessments Created</span>
                        <span className="font-semibold text-foreground">15</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Improvement Rate</span>
                        <span className="font-semibold text-emerald-600">89%</span>
                      </div>
                    </>
                  )}
                  
                  {currentRole === 'parent' && (
                    <>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Overall Progress</span>
                        <span className="font-semibold text-emerald-600">78%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Areas Assessed</span>
                        <span className="font-semibold text-foreground">4</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Next Meeting</span>
                        <span className="font-semibold text-foreground">Dec 28</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section - Recent Updates */}
          <div className="mt-8">
            <div className="bg-white rounded-xl shadow-soft border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Platform Updates</h3>
                <Button variant="ghost" size="sm">
                  View All
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Sparkles" size={20} className="text-blue-600" />
                    <h4 className="font-medium text-foreground">New AI Features</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Enhanced assessment algorithms for better learning disability detection.
                  </p>
                  <span className="text-xs text-blue-600 mt-2 block">2 days ago</span>
                </div>
                
                <div className="p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="Users" size={20} className="text-emerald-600" />
                    <h4 className="font-medium text-foreground">School Integration</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Now supporting 50+ schools across Kenya with seamless data sync.
                  </p>
                  <span className="text-xs text-emerald-600 mt-2 block">1 week ago</span>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <Icon name="BookOpen" size={20} className="text-amber-600" />
                    <h4 className="font-medium text-foreground">Resource Library</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Added 100+ new intervention strategies and learning activities.
                  </p>
                  <span className="text-xs text-amber-600 mt-2 block">2 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MultiRoleDashboard;