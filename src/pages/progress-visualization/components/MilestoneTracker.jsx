import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MilestoneTracker = () => {
  const [selectedStudent, setSelectedStudent] = useState('sarah');

  const students = [
    { id: 'sarah', name: 'Sarah Johnson', grade: 'Grade 5', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150' },
    { id: 'james', name: 'James Wilson', grade: 'Grade 4', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150' },
    { id: 'maria', name: 'Maria Garcia', grade: 'Grade 6', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150' }
  ];

  const milestones = {
    sarah: [
      {
        id: 1,
        title: "Reading Comprehension Breakthrough",
        description: "Successfully completed advanced reading assessment with 85% accuracy",
        date: "2025-09-20",
        category: "Reading",
        status: "completed",
        icon: "BookOpen",
        color: "text-empowerment-green",
        bgColor: "bg-empowerment-green/10",
        celebration: true,
        points: 150
      },
      {
        id: 2,
        title: "Mathematics Problem Solving",
        description: "Mastered multi-step word problems using visual strategies",
        date: "2025-09-18",
        category: "Mathematics",
        status: "completed",
        icon: "Calculator",
        color: "text-primary",
        bgColor: "bg-primary/10",
        celebration: true,
        points: 120
      },
      {
        id: 3,
        title: "Attention Focus Improvement",
        description: "Maintained focus for 30+ minutes during learning activities",
        date: "2025-09-22",
        category: "Attention",
        status: "in-progress",
        icon: "Eye",
        color: "text-illumination-gold",
        bgColor: "bg-illumination-gold/10",
        celebration: false,
        points: 100,
        progress: 75
      },
      {
        id: 4,
        title: "Writing Skills Enhancement",
        description: "Complete structured paragraph writing with proper organization",
        date: "2025-09-25",
        category: "Writing",
        status: "upcoming",
        icon: "PenTool",
        color: "text-authority-purple",
        bgColor: "bg-authority-purple/10",
        celebration: false,
        points: 130
      }
    ]
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return 'CheckCircle';
      case 'in-progress': return 'Clock';
      case 'upcoming': return 'Calendar';
      default: return 'Circle';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-empowerment-green';
      case 'in-progress': return 'text-illumination-gold';
      case 'upcoming': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const currentMilestones = milestones?.[selectedStudent] || [];
  const completedCount = currentMilestones?.filter(m => m?.status === 'completed')?.length;
  const totalPoints = currentMilestones?.filter(m => m?.status === 'completed')?.reduce((sum, m) => sum + m?.points, 0);

  return (
    <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Learning Milestones</h3>
          <p className="text-muted-foreground">Track and celebrate learning achievements</p>
        </div>
        
        <div className="flex items-center space-x-4 mt-4 lg:mt-0">
          <select
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {students?.map((student) => (
              <option key={student?.id} value={student?.id}>
                {student?.name} - {student?.grade}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <Icon name="Plus" size={16} />
            Add Milestone
          </Button>
        </div>
      </div>
      {/* Progress Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="p-4 rounded-lg bg-empowerment-green/5 border border-empowerment-green/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-empowerment-green/10 rounded-lg flex items-center justify-center">
              <Icon name="Trophy" size={20} className="text-empowerment-green" />
            </div>
            <div>
              <p className="text-2xl font-bold text-empowerment-green">{completedCount}</p>
              <p className="text-sm text-muted-foreground">Completed Milestones</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-illumination-gold/5 border border-illumination-gold/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-illumination-gold/10 rounded-lg flex items-center justify-center">
              <Icon name="Star" size={20} className="text-illumination-gold" />
            </div>
            <div>
              <p className="text-2xl font-bold text-illumination-gold">{totalPoints}</p>
              <p className="text-sm text-muted-foreground">Achievement Points</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="Target" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-primary">{currentMilestones?.length}</p>
              <p className="text-sm text-muted-foreground">Total Goals</p>
            </div>
          </div>
        </div>
      </div>
      {/* Milestone Timeline */}
      <div className="space-y-4">
        {currentMilestones?.map((milestone, index) => (
          <div key={milestone?.id} className="relative">
            {/* Timeline Line */}
            {index < currentMilestones?.length - 1 && (
              <div className="absolute left-6 top-16 w-0.5 h-16 bg-border"></div>
            )}
            
            <div className={`flex items-start space-x-4 p-4 rounded-lg border transition-all duration-fast ${
              milestone?.celebration ? 'border-empowerment-green/30 bg-empowerment-green/5 breathing-animation' : 'border-border hover:shadow-soft'
            }`}>
              {/* Status Icon */}
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${milestone?.bgColor}`}>
                <Icon name={getStatusIcon(milestone?.status)} size={24} className={getStatusColor(milestone?.status)} />
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h4 className="font-semibold text-foreground">{milestone?.title}</h4>
                    {milestone?.celebration && (
                      <div className="flex items-center space-x-1 px-2 py-1 bg-empowerment-green/10 rounded-full">
                        <Icon name="Sparkles" size={14} className="text-empowerment-green" />
                        <span className="text-xs font-medium text-empowerment-green">New!</span>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground">{milestone?.date}</span>
                    {milestone?.status === 'completed' && (
                      <div className="flex items-center space-x-1 text-illumination-gold">
                        <Icon name="Star" size={14} />
                        <span className="text-xs font-medium">+{milestone?.points}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-3">{milestone?.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${milestone?.bgColor} ${milestone?.color}`}>
                      {milestone?.category}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      milestone?.status === 'completed' ? 'bg-empowerment-green/10 text-empowerment-green' :
                      milestone?.status === 'in-progress'? 'bg-illumination-gold/10 text-illumination-gold' : 'bg-muted text-muted-foreground'
                    }`}>
                      {milestone?.status?.replace('-', ' ')?.toUpperCase()}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {milestone?.status === 'completed' && (
                      <Button variant="ghost" size="sm">
                        <Icon name="Share" size={16} />
                        Share
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Icon name="MoreHorizontal" size={16} />
                    </Button>
                  </div>
                </div>
                
                {/* Progress Bar for In-Progress Milestones */}
                {milestone?.status === 'in-progress' && milestone?.progress && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-medium text-foreground">{milestone?.progress}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className="h-2 rounded-full bg-illumination-gold transition-all duration-slow"
                        style={{ width: `${milestone?.progress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Celebration Modal Trigger */}
      {currentMilestones?.some(m => m?.celebration) && (
        <div className="mt-6 p-4 bg-gradient-secondary rounded-lg text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Icon name="Trophy" size={24} />
              <div>
                <h4 className="font-semibold">Congratulations!</h4>
                <p className="text-sm opacity-90">New milestone achieved - celebrate this success!</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="bg-white/20 border-white/30 text-white hover:bg-white/30">
              <Icon name="PartyPopper" size={16} />
              Celebrate
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MilestoneTracker;