import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const ProgressChart = ({ data, selectedMetric, onMetricChange }) => {
  const chartData = [
    { month: 'Jan', reading: 45, math: 38, attention: 42, writing: 35 },
    { month: 'Feb', reading: 52, math: 45, attention: 48, writing: 42 },
    { month: 'Mar', reading: 58, math: 52, attention: 55, writing: 48 },
    { month: 'Apr', reading: 65, math: 58, attention: 62, writing: 55 },
    { month: 'May', reading: 72, math: 65, attention: 68, writing: 62 },
    { month: 'Jun', reading: 78, math: 72, attention: 75, writing: 68 },
    { month: 'Jul', reading: 82, math: 78, attention: 80, writing: 75 },
    { month: 'Aug', reading: 85, math: 82, attention: 83, writing: 78 },
    { month: 'Sep', reading: 88, math: 85, attention: 86, writing: 82 }
  ];

  const metrics = [
    { key: 'reading', label: 'Reading Skills', color: '#2563EB', icon: 'BookOpen' },
    { key: 'math', label: 'Mathematics', color: '#059669', icon: 'Calculator' },
    { key: 'attention', label: 'Attention Focus', color: '#F59E0B', icon: 'Eye' },
    { key: 'writing', label: 'Writing Skills', color: '#6366F1', icon: 'PenTool' }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-elevated border border-border">
          <p className="font-medium text-foreground mb-2">{`Month: ${label}`}</p>
          {payload?.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry?.color }}>
              {`${entry?.name}: ${entry?.value}%`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-soft border border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
        <div>
          <h3 className="text-xl font-bold text-foreground mb-2">Learning Progress Trajectory</h3>
          <p className="text-muted-foreground">Track improvement across different learning areas</p>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4 lg:mt-0">
          {metrics?.map((metric) => (
            <button
              key={metric?.key}
              onClick={() => onMetricChange(metric?.key)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-fast ${
                selectedMetric === metric?.key
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={metric?.icon} size={16} />
              <span>{metric?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
            
            {metrics?.map((metric) => (
              <Area
                key={metric?.key}
                type="monotone"
                dataKey={metric?.key}
                stroke={metric?.color}
                strokeWidth={3}
                fill={selectedMetric === metric?.key ? "url(#colorGradient)" : "transparent"}
                fillOpacity={selectedMetric === metric?.key ? 1 : 0}
                dot={{ fill: metric?.color, strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, stroke: metric?.color, strokeWidth: 2 }}
                style={{
                  opacity: selectedMetric === metric?.key ? 1 : 0.3
                }}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics?.map((metric) => {
          const currentValue = chartData?.[chartData?.length - 1]?.[metric?.key];
          const previousValue = chartData?.[chartData?.length - 2]?.[metric?.key];
          const improvement = currentValue - previousValue;
          
          return (
            <div key={metric?.key} className="text-center p-3 rounded-lg bg-muted/50">
              <div className="flex items-center justify-center mb-2">
                <Icon name={metric?.icon} size={20} style={{ color: metric?.color }} />
              </div>
              <p className="text-lg font-bold text-foreground">{currentValue}%</p>
              <p className="text-xs text-muted-foreground">{metric?.label}</p>
              <div className="flex items-center justify-center mt-1">
                <Icon name="ArrowUp" size={12} className="text-empowerment-green mr-1" />
                <span className="text-xs text-empowerment-green font-medium">+{improvement}%</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressChart;