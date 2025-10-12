import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid } from 'recharts';
import Icon from '../../../components/AppIcon';

const LearningAreasBreakdown = ({ viewType, onViewTypeChange }) => {
  const learningAreas = [
    {
      name: 'Reading Comprehension',
      value: 85,
      color: '#2563EB',
      icon: 'BookOpen',
      status: 'Excellent',
      improvement: '+15%',
      interventions: 3,
      lastAssessment: '2025-09-20'
    },
    {
      name: 'Mathematical Reasoning',
      value: 72,
      color: '#059669',
      icon: 'Calculator',
      status: 'Good',
      improvement: '+12%',
      interventions: 2,
      lastAssessment: '2025-09-18'
    },
    {
      name: 'Attention & Focus',
      value: 68,
      color: '#F59E0B',
      icon: 'Eye',
      status: 'Improving',
      improvement: '+8%',
      interventions: 4,
      lastAssessment: '2025-09-19'
    },
    {
      name: 'Writing Skills',
      value: 78,
      color: '#6366F1',
      icon: 'PenTool',
      status: 'Good',
      improvement: '+10%',
      interventions: 2,
      lastAssessment: '2025-09-21'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Excellent': return 'text-empowerment-green bg-empowerment-green/10';
      case 'Good': return 'text-primary bg-primary/10';
      case 'Improving': return 'text-illumination-gold bg-illumination-gold/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      const data = payload?.[0]?.payload;
      return (
        <div className="bg-white p-4 rounded-lg shadow-elevated border border-border">
          <p className="font-medium text-foreground mb-2">{data?.name}</p>
          <p className="text-sm text-muted-foreground">Score: {data?.value}%</p>
          <p className="text-sm text-muted-foreground">Status: {data?.status}</p>
          <p className="text-sm text-empowerment-green">Improvement: {data?.improvement}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Learning Areas Breakdown</h3>
          <p className="text-muted-foreground">Detailed analysis of performance across different domains</p>
        </div>
        
        <div className="flex items-center space-x-2 mt-4 lg:mt-0">
          <button
            onClick={() => onViewTypeChange('pie')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-fast ${
              viewType === 'pie' ?'bg-primary text-primary-foreground shadow-soft' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name="PieChart" size={16} />
            <span>Pie View</span>
          </button>
          <button
            onClick={() => onViewTypeChange('bar')}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-fast ${
              viewType === 'bar' ?'bg-primary text-primary-foreground shadow-soft' :'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name="BarChart3" size={16} />
            <span>Bar View</span>
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart Section */}
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {viewType === 'pie' ? (
              <PieChart>
                <Pie
                  data={learningAreas}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {learningAreas?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            ) : (
              <BarChart data={learningAreas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                <XAxis 
                  dataKey="name" 
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis 
                  stroke="#64748B"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {learningAreas?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Bar>
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Details Section */}
        <div className="space-y-4">
          {learningAreas?.map((area, index) => (
            <div key={index} className="p-4 rounded-lg border border-border hover:shadow-soft transition-all duration-fast">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${area?.color}20` }}
                  >
                    <Icon name={area?.icon} size={20} style={{ color: area?.color }} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{area?.name}</h4>
                    <p className="text-sm text-muted-foreground">Last: {area?.lastAssessment}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-foreground">{area?.value}%</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(area?.status)}`}>
                    {area?.status}
                  </span>
                </div>
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-empowerment-green">
                    <Icon name="TrendingUp" size={14} />
                    <span>{area?.improvement}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Icon name="Target" size={14} />
                    <span>{area?.interventions} interventions</span>
                  </div>
                </div>
                <button className="text-primary hover:text-primary/80 font-medium">
                  View Details
                </button>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-3">
                <div className="w-full bg-muted rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-slow"
                    style={{ 
                      width: `${area?.value}%`,
                      backgroundColor: area?.color
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LearningAreasBreakdown;