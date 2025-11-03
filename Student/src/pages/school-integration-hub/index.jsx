import React, { useState, useEffect } from 'react';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import SchoolCard from './components/SchoolCard';
import IntegrationStatusCard from './components/IntegrationStatusCard';
import ConnectionWizard from './components/ConnectionWizard';
import StudentRosterManager from './components/StudentRosterManager';
import IntegrationDashboard from './components/IntegrationDashboard';

const SchoolIntegrationHub = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedSchoolType, setSelectedSchoolType] = useState('all');
  const [showConnectionWizard, setShowConnectionWizard] = useState(false);
  const [showRosterManager, setShowRosterManager] = useState(false);
  const [selectedSchool, setSelectedSchool] = useState(null);
  const [connectedSchools, setConnectedSchools] = useState([1, 3, 5]);

  const mockSchools = [
    {
      id: 1,
      name: "Nairobi Primary School",
      location: "Nairobi, Kenya",
      type: "Primary School",
      logo: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=100&h=100&fit=crop&crop=center",
      studentCount: 450,
      teacherCount: 28,
      status: "Active",
      integrationLevel: 95,
      features: ["Student Management", "Assessment Tools", "Progress Tracking", "Parent Portal"]
    },
    {
      id: 2,
      name: "Mombasa High School",
      location: "Mombasa, Kenya",
      type: "Secondary School",
      logo: "https://images.unsplash.com/photo-1562774053-701939374585?w=100&h=100&fit=crop&crop=center",
      studentCount: 680,
      teacherCount: 42,
      status: "Pending",
      integrationLevel: 60,
      features: ["Student Management", "Assessment Tools", "Grade Management"]
    },
    {
      id: 3,
      name: "Kisumu Academy",
      location: "Kisumu, Kenya",
      type: "Private School",
      logo: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=100&h=100&fit=crop&crop=center",
      studentCount: 320,
      teacherCount: 24,
      status: "Active",
      integrationLevel: 88,
      features: ["Full Integration", "AI Assessment", "Analytics", "Mobile App"]
    },
    {
      id: 4,
      name: "Eldoret Secondary School",
      location: "Eldoret, Kenya",
      type: "Secondary School",
      logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=center",
      studentCount: 520,
      teacherCount: 35,
      status: "Inactive",
      integrationLevel: 25,
      features: ["Basic Setup", "Student Records"]
    },
    {
      id: 5,
      name: "Nakuru Girls High School",
      location: "Nakuru, Kenya",
      type: "Girls School",
      logo: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=100&h=100&fit=crop&crop=center",
      studentCount: 380,
      teacherCount: 29,
      status: "Active",
      integrationLevel: 92,
      features: ["Student Management", "Assessment Tools", "Progress Tracking", "Counseling Module"]
    },
    {
      id: 6,
      name: "Thika Technical Institute",
      location: "Thika, Kenya",
      type: "Technical School",
      logo: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=100&h=100&fit=crop&crop=center",
      studentCount: 280,
      teacherCount: 18,
      status: "Pending",
      integrationLevel: 45,
      features: ["Student Management", "Skills Assessment"]
    }
  ];

  const regionOptions = [
    { value: 'all', label: 'All Regions' },
    { value: 'nairobi', label: 'Nairobi' },
    { value: 'mombasa', label: 'Mombasa' },
    { value: 'kisumu', label: 'Kisumu' },
    { value: 'eldoret', label: 'Eldoret' },
    { value: 'nakuru', label: 'Nakuru' },
    { value: 'thika', label: 'Thika' }
  ];

  const schoolTypeOptions = [
    { value: 'all', label: 'All School Types' },
    { value: 'primary', label: 'Primary Schools' },
    { value: 'secondary', label: 'Secondary Schools' },
    { value: 'private', label: 'Private Schools' },
    { value: 'technical', label: 'Technical Schools' },
    { value: 'girls', label: 'Girls Schools' }
  ];

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
    { id: 'schools', label: 'School Directory', icon: 'Building2' },
    { id: 'integrations', label: 'Active Integrations', icon: 'Link' },
    { id: 'analytics', label: 'Analytics', icon: 'BarChart3' }
  ];

  const filteredSchools = mockSchools?.filter(school => {
    const matchesSearch = school?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         school?.location?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesRegion = selectedRegion === 'all' || 
                         school?.location?.toLowerCase()?.includes(selectedRegion);
    const matchesType = selectedSchoolType === 'all' || 
                       school?.type?.toLowerCase()?.includes(selectedSchoolType);
    return matchesSearch && matchesRegion && matchesType;
  });

  const handleConnectSchool = (school) => {
    setSelectedSchool(school);
    setShowConnectionWizard(true);
  };

  const handleViewDetails = (school) => {
    setSelectedSchool(school);
    setShowRosterManager(true);
  };

  const handleConnectionComplete = (formData) => {
    setConnectedSchools([...connectedSchools, selectedSchool?.id]);
    setShowConnectionWizard(false);
    setSelectedSchool(null);
  };

  const renderDashboardTab = () => (
    <IntegrationDashboard onViewDetails={handleViewDetails} />
  );

  const renderSchoolsTab = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <Input
              type="search"
              placeholder="Search schools by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
            />
          </div>
          <div className="w-full lg:w-48">
            <Select
              options={regionOptions}
              value={selectedRegion}
              onChange={setSelectedRegion}
              placeholder="Filter by region"
            />
          </div>
          <div className="w-full lg:w-48">
            <Select
              options={schoolTypeOptions}
              value={selectedSchoolType}
              onChange={setSelectedSchoolType}
              placeholder="Filter by type"
            />
          </div>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
          >
            Add School
          </Button>
        </div>
      </div>

      {/* Schools Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredSchools?.map((school) => (
          <SchoolCard
            key={school?.id}
            school={school}
            onConnect={handleConnectSchool}
            onViewDetails={handleViewDetails}
            isConnected={connectedSchools?.includes(school?.id)}
          />
        ))}
      </div>

      {filteredSchools?.length === 0 && (
        <div className="text-center py-12">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No schools found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or add a new school to the directory.
          </p>
        </div>
      )}
    </div>
  );

  const renderIntegrationsTab = () => (
    <div className="space-y-6">
      {/* Integration Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <IntegrationStatusCard
          title="Connected Schools"
          value={connectedSchools?.length?.toString()}
          change={12.5}
          icon="Building2"
          color="primary"
        />
        <IntegrationStatusCard
          title="Active Syncs"
          value="8"
          change={8.3}
          icon="RefreshCw"
          color="secondary"
        />
        <IntegrationStatusCard
          title="Data Transfer"
          value="2.4GB"
          change={-2.1}
          icon="Database"
          color="warning"
        />
        <IntegrationStatusCard
          title="Success Rate"
          value="99.2%"
          change={1.8}
          icon="CheckCircle"
          color="secondary"
        />
      </div>

      {/* Connected Schools */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Connected Schools</h3>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your active school integrations
          </p>
        </div>
        
        <div className="divide-y divide-border">
          {mockSchools?.filter(school => connectedSchools?.includes(school?.id))?.map((school) => (
              <div key={school?.id} className="p-6 hover:bg-muted/30 transition-colors duration-fast">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted">
                      <img
                        src={school?.logo}
                        alt={`${school?.name} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground">{school?.name}</h4>
                      <p className="text-sm text-muted-foreground">{school?.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <p className="text-sm font-medium text-foreground">
                        {school?.integrationLevel}% Complete
                      </p>
                      <div className="w-24 bg-muted rounded-full h-2 mt-1">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full"
                          style={{ width: `${school?.integrationLevel}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewDetails(school)}
                        iconName="Settings"
                      >
                        Manage
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        iconName="MoreVertical"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  const renderAnalyticsTab = () => (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <IntegrationStatusCard
          title="Total Students"
          value="2,630"
          change={15.2}
          icon="Users"
          color="primary"
        />
        <IntegrationStatusCard
          title="Active Teachers"
          value="176"
          change={8.7}
          icon="GraduationCap"
          color="secondary"
        />
        <IntegrationStatusCard
          title="Assessments Completed"
          value="1,247"
          change={23.4}
          icon="ClipboardCheck"
          color="warning"
        />
      </div>

      {/* Regional Distribution */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-6">Regional Distribution</h3>
        <div className="space-y-4">
          {regionOptions?.slice(1)?.map((region) => {
            const schoolCount = mockSchools?.filter(school => 
              school?.location?.toLowerCase()?.includes(region?.value)
            )?.length;
            const percentage = (schoolCount / mockSchools?.length) * 100;
            
            return (
              <div key={region?.value} className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">{region?.label}</span>
                <div className="flex items-center space-x-3">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div 
                      className="bg-gradient-primary h-2 rounded-full"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-12 text-right">
                    {schoolCount}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Integration Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Integration Performance</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Setup Time</span>
              <span className="text-sm font-medium text-foreground">24 minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Success Rate</span>
              <span className="text-sm font-medium text-empowerment-green">96.8%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Response Time</span>
              <span className="text-sm font-medium text-foreground">142ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Data Accuracy</span>
              <span className="text-sm font-medium text-empowerment-green">99.4%</span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Usage Trends</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Daily Active Users</span>
              <span className="text-sm font-medium text-foreground">1,247</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Peak Usage Hours</span>
              <span className="text-sm font-medium text-foreground">9AM - 3PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Most Used Feature</span>
              <span className="text-sm font-medium text-foreground">Assessment Tools</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Mobile Usage</span>
              <span className="text-sm font-medium text-foreground">68%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
                <Icon name="Building2" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">School Integration Hub</h1>
                <p className="text-sm text-muted-foreground">
                  Connect and manage educational institutions
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Export Data
              </Button>
              <Button
                variant="default"
                iconName="Plus"
                iconPosition="left"
                className="breathing-animation"
              >
                New Integration
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Navigation Tabs */}
      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 text-sm font-medium transition-colors duration-fast ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={18} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && renderDashboardTab()}
        {activeTab === 'schools' && renderSchoolsTab()}
        {activeTab === 'integrations' && renderIntegrationsTab()}
        {activeTab === 'analytics' && renderAnalyticsTab()}
      </div>
      {/* Modals */}
      {showConnectionWizard && selectedSchool && (
        <ConnectionWizard
          school={selectedSchool}
          onClose={() => {
            setShowConnectionWizard(false);
            setSelectedSchool(null);
          }}
          onComplete={handleConnectionComplete}
        />
      )}
      {showRosterManager && selectedSchool && (
        <StudentRosterManager
          school={selectedSchool}
          onClose={() => {
            setShowRosterManager(false);
            setSelectedSchool(null);
          }}
        />
      )}
    </div>
  );
};

export default SchoolIntegrationHub;