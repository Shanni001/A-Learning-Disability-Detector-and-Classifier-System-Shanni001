import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const StudentRosterManager = ({ school, onClose }) => {
  const [activeTab, setActiveTab] = useState('students');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const mockStudents = [
    {
      id: 1,
      name: "Amara Wanjiku",
      email: "amara.wanjiku@student.edu",
      class: "Grade 8A",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      status: "Active",
      assessments: 3,
      lastActivity: "2025-01-20"
    },
    {
      id: 2,
      name: "Kofi Asante",
      email: "kofi.asante@student.edu",
      class: "Grade 8A",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      status: "Active",
      assessments: 5,
      lastActivity: "2025-01-19"
    },
    {
      id: 3,
      name: "Zara Ochieng",
      email: "zara.ochieng@student.edu",
      class: "Grade 7B",
      avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      status: "Pending",
      assessments: 1,
      lastActivity: "2025-01-18"
    },
    {
      id: 4,
      name: "Jabari Mwangi",
      email: "jabari.mwangi@student.edu",
      class: "Grade 8B",
      avatar: "https://randomuser.me/api/portraits/men/4.jpg",
      status: "Active",
      assessments: 4,
      lastActivity: "2025-01-21"
    }
  ];

  const mockClasses = [
    { value: 'all', label: 'All Classes' },
    { value: 'grade-7a', label: 'Grade 7A' },
    { value: 'grade-7b', label: 'Grade 7B' },
    { value: 'grade-8a', label: 'Grade 8A' },
    { value: 'grade-8b', label: 'Grade 8B' }
  ];

  const tabs = [
    { id: 'students', label: 'Students', icon: 'Users', count: mockStudents?.length },
    { id: 'classes', label: 'Classes', icon: 'School', count: 4 },
    { id: 'bulk-actions', label: 'Bulk Actions', icon: 'Settings', count: null }
  ];

  const filteredStudents = mockStudents?.filter(student => {
    const matchesSearch = student?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                         student?.email?.toLowerCase()?.includes(searchTerm?.toLowerCase());
    const matchesClass = selectedClass === 'all' || student?.class?.toLowerCase()?.includes(selectedClass?.replace('-', ' '));
    return matchesSearch && matchesClass;
  });

  const handleStudentSelect = (studentId) => {
    setSelectedStudents(prev => 
      prev?.includes(studentId) 
        ? prev?.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAll = () => {
    if (selectedStudents?.length === filteredStudents?.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents?.map(s => s?.id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-empowerment-green bg-empowerment-green/10';
      case 'Pending': return 'text-illumination-gold bg-illumination-gold/10';
      case 'Inactive': return 'text-muted-foreground bg-muted';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const renderStudentsTab = () => (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search students by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e?.target?.value)}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            options={mockClasses}
            value={selectedClass}
            onChange={setSelectedClass}
            placeholder="Filter by class"
          />
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedStudents?.length > 0 && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-primary">
              {selectedStudents?.length} student{selectedStudents?.length !== 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" iconName="Send">
                Assign Assessment
              </Button>
              <Button variant="outline" size="sm" iconName="Mail">
                Send Message
              </Button>
              <Button variant="outline" size="sm" iconName="Download">
                Export Data
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Students Table */}
      <div className="bg-card border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left p-4">
                  <input
                    type="checkbox"
                    className="rounded border-border text-primary focus:ring-primary"
                    checked={selectedStudents?.length === filteredStudents?.length && filteredStudents?.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Student</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Class</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Status</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Assessments</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Last Activity</th>
                <th className="text-left p-4 text-sm font-medium text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents?.map((student) => (
                <tr key={student?.id} className="border-t border-border hover:bg-muted/30">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary"
                      checked={selectedStudents?.includes(student?.id)}
                      onChange={() => handleStudentSelect(student?.id)}
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-muted flex-shrink-0">
                        <Image
                          src={student?.avatar}
                          alt={student?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{student?.name}</p>
                        <p className="text-sm text-muted-foreground">{student?.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-foreground">{student?.class}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(student?.status)}`}>
                      {student?.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-foreground">{student?.assessments}</td>
                  <td className="p-4 text-sm text-muted-foreground">{student?.lastActivity}</td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" iconName="Eye">
                        View
                      </Button>
                      <Button variant="ghost" size="sm" iconName="Edit">
                        Edit
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderClassesTab = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockClasses?.slice(1)?.map((classItem) => (
          <div key={classItem?.value} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">{classItem?.label}</h3>
              <Button variant="outline" size="sm" iconName="Settings">
                Manage
              </Button>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Students:</span>
                <span className="font-medium text-foreground">
                  {mockStudents?.filter(s => s?.class?.toLowerCase()?.includes(classItem?.value?.replace('-', ' ')))?.length}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Active Assessments:</span>
                <span className="font-medium text-foreground">3</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Completion Rate:</span>
                <span className="font-medium text-empowerment-green">87%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBulkActionsTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Upload" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Import Students</h3>
              <p className="text-sm text-muted-foreground">Bulk import from CSV file</p>
            </div>
          </div>
          <Button variant="outline" fullWidth iconName="Upload">
            Choose CSV File
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-empowerment-green/10 rounded-lg flex items-center justify-center">
              <Icon name="Send" size={24} className="text-empowerment-green" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Bulk Assessment</h3>
              <p className="text-sm text-muted-foreground">Assign to multiple students</p>
            </div>
          </div>
          <Button variant="outline" fullWidth iconName="Send">
            Create Assignment
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-illumination-gold/10 rounded-lg flex items-center justify-center">
              <Icon name="Download" size={24} className="text-illumination-gold" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Export Data</h3>
              <p className="text-sm text-muted-foreground">Download student records</p>
            </div>
          </div>
          <Button variant="outline" fullWidth iconName="Download">
            Export CSV
          </Button>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-authority-purple/10 rounded-lg flex items-center justify-center">
              <Icon name="Mail" size={24} className="text-authority-purple" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Bulk Messaging</h3>
              <p className="text-sm text-muted-foreground">Send notifications</p>
            </div>
          </div>
          <Button variant="outline" fullWidth iconName="Mail">
            Compose Message
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-elevated w-full max-w-6xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Student Roster - {school?.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Manage students, classes, and bulk operations
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
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
                {tab?.count !== null && (
                  <span className="bg-muted text-muted-foreground px-2 py-0.5 rounded-full text-xs">
                    {tab?.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'students' && renderStudentsTab()}
          {activeTab === 'classes' && renderClassesTab()}
          {activeTab === 'bulk-actions' && renderBulkActionsTab()}
        </div>
      </div>
    </div>
  );
};

export default StudentRosterManager;