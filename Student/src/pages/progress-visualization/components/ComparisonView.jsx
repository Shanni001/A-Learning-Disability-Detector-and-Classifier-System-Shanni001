import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ComparisonView = () => {
  const [comparisonType, setComparisonType] = useState('peer');
  const [selectedTimeframe, setSelectedTimeframe] = useState('3months');

  const peerComparisonData = [
    { subject: 'Reading', student: 85, peerAverage: 72, nationalAverage: 68 },
    { subject: 'Mathematics', student: 78, peerAverage: 75, nationalAverage: 70 },
    { subject: 'Attention', student: 82, peerAverage: 69, nationalAverage: 65 },
    { subject: 'Writing', student: 75, peerAverage: 73, nationalAverage: 69 }
  ];

  const progressComparisonData = [
    { month: 'Jun', current: 65, previous: 58, target: 70 },
    { month: 'Jul', current: 72, previous: 65, target: 75 },
    { month: 'Aug', current: 78, previous: 72, target: 80 },
    { month: 'Sep', current: 85, previous: 78, target: 85 }
  ];

  const radarData = [
    { subject: 'Reading Comprehension', student: 85, peerAverage: 72, fullMark: 100 },
    { subject: 'Mathematical Reasoning', student: 78, peerAverage: 75, fullMark: 100 },
    { subject: 'Attention Focus', student: 82, peerAverage: 69, fullMark: 100 },
    { subject: 'Writing Skills', student: 75, peerAverage: 73, fullMark: 100 },
    { subject: 'Problem Solving', student: 80, peerAverage: 70, fullMark: 100 },
    { subject: 'Memory Retention', student: 77, peerAverage: 74, fullMark: 100 }
  ];

  const comparisonTypes = [
    { key: 'peer', label: 'Peer Comparison', icon: 'Users', description: 'Compare with similar students' },
    { key: 'progress', label: 'Progress Over Time', icon: 'TrendingUp', description: 'Track improvement trajectory' },
    { key: 'radar', label: 'Skills Overview', icon: 'Radar', description: 'Multi-dimensional analysis' }
  ];

  const timeframes = [
    { key: '1month', label: '1 Month' },
    { key: '3months', label: '3 Months' },
    { key: '6months', label: '6 Months' },
    { key: '1year', label: '1 Year' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-elevated border border-border">
          <p className="font-medium text-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}${comparisonType === 'peer' ? '%' : ''}`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const getPerformanceInsight = () => {
    if (comparisonType === 'peer') {
      return {
        title: "Above Average Performance",
        description: "Student performs 15% above peer average across all learning areas",
        icon: "TrendingUp",
        color: "text-empowerment-green"
      };
    } else if (comparisonType === 'progress') {
      return {
        title: "Consistent Improvement",
        description: "Steady 8% monthly improvement with target achievement",
        icon: "Target",
        color: "text-primary"
      };
    } else {
      return {
        title: "Balanced Development",
        description: "Strong performance across multiple skill dimensions",
        icon: "Award",
        color: "text-illumination-gold"
      };
    }
  };

  const insight = getPerformanceInsight();

  return (
    <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Performance Comparison</h3>
          <p className="text-muted-foreground">Analyze progress against benchmarks and peers</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3 mt-4 lg:mt-0">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e?.target?.value)}
            className="px-3 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {timeframes?.map((timeframe) => (
              <option key={timeframe?.key} value={timeframe?.key}>
                {timeframe?.label}
              </option>
            ))}
          </select>
          <Button variant="outline" size="sm">
            <Icon name="Download" size={16} />
            Export
          </Button>
        </div>
      </div>
      {/* Comparison Type Selector */}
      <div className="flex flex-wrap gap-2 mb-6">
        {comparisonTypes?.map((type) => (
          <button
            key={type?.key}
            onClick={() => setComparisonType(type?.key)}
            className={`flex items-center space-x-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-fast empowerment-hover ${
              comparisonType === type?.key
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <Icon name={type?.icon} size={16} />
            <div className="text-left">
              <div>{type?.label}</div>
              <div className="text-xs opacity-80">{type?.description}</div>
            </div>
          </button>
        ))}
      </div>
      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              {comparisonType === 'peer' && (
                <BarChart data={peerComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="subject" 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="student" fill="#2563EB" name="Student" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="peerAverage" fill="#059669" name="Peer Average" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="nationalAverage" fill="#F59E0B" name="National Average" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
              
              {comparisonType === 'progress' && (
                <BarChart data={progressComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                  <XAxis 
                    dataKey="month" 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="#64748B"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    domain={[0, 100]}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="current" fill="#2563EB" name="Current Period" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="previous" fill="#6B7280" name="Previous Period" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="#059669" name="Target" radius={[4, 4, 0, 0]} />
                </BarChart>
              )}
              
              {comparisonType === 'radar' && (
                <RadarChart data={radarData}>
                  <PolarGrid stroke="#E2E8F0" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 12, fill: '#64748B' }} />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 100]} 
                    tick={{ fontSize: 10, fill: '#64748B' }}
                  />
                  <Radar
                    name="Student"
                    dataKey="student"
                    stroke="#2563EB"
                    fill="#2563EB"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Peer Average"
                    dataKey="peerAverage"
                    stroke="#059669"
                    fill="#059669"
                    fillOpacity={0.1}
                    strokeWidth={2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                </RadarChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="space-y-4">
          {/* Performance Insight */}
          <div className="p-4 rounded-lg border border-border">
            <div className="flex items-center space-x-3 mb-3">
              <div className={`w-10 h-10 rounded-lg ${insight?.color?.replace('text-', 'bg-')}/10 flex items-center justify-center`}>
                <Icon name={insight?.icon} size={20} className={insight?.color} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground">{insight?.title}</h4>
                <p className="text-sm text-muted-foreground">{insight?.description}</p>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Key Metrics</h4>
            
            <div className="p-3 rounded-lg bg-empowerment-green/5 border border-empowerment-green/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Strongest Area</span>
                <span className="font-medium text-empowerment-green">Reading (85%)</span>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-illumination-gold/5 border border-illumination-gold/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Growth Area</span>
                <span className="font-medium text-illumination-gold">Writing (75%)</span>
              </div>
            </div>
            
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Overall Rank</span>
                <span className="font-medium text-primary">Top 15%</span>
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Recommended Actions</h4>
            
            <div className="space-y-2">
              <div className="flex items-start space-x-2 p-2 rounded text-sm">
                <Icon name="CheckCircle" size={16} className="text-empowerment-green mt-0.5" />
                <span className="text-muted-foreground">Continue reading comprehension strategies</span>
              </div>
              
              <div className="flex items-start space-x-2 p-2 rounded text-sm">
                <Icon name="Target" size={16} className="text-illumination-gold mt-0.5" />
                <span className="text-muted-foreground">Focus on writing structure exercises</span>
              </div>
              
              <div className="flex items-start space-x-2 p-2 rounded text-sm">
                <Icon name="TrendingUp" size={16} className="text-primary mt-0.5" />
                <span className="text-muted-foreground">Maintain current intervention pace</span>
              </div>
            </div>
          </div>

          {/* Share Button */}
          <Button variant="outline" className="w-full">
            <Icon name="Share" size={16} />
            Share Comparison
          </Button>
        </div>
      </div>
      {/* Legend */}
      <div className="mt-6 p-4 bg-muted/30 rounded-lg">
        <h4 className="font-medium text-foreground mb-3">Understanding the Comparison</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-primary rounded"></div>
            <span className="text-muted-foreground">Student Performance - Individual scores and progress</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-empowerment-green rounded"></div>
            <span className="text-muted-foreground">Peer Average - Similar students in grade/region</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-illumination-gold rounded"></div>
            <span className="text-muted-foreground">Benchmarks - National/target standards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonView;