import React from 'react';
import Icon from '../../../components/AppIcon';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import Button from '../../../components/ui/Button';


const ProgressOverview = ({ currentRole, userProfile }) => {
  const getProgressData = () => {
    switch (currentRole) {
      case 'student':
        return {
          title: 'Your Learning Journey',
          subtitle: 'Progress over the last 30 days',
          metrics: [
            { label: 'Assessments Completed', value: 12, change: '+3', icon: 'CheckCircle', color: 'text-emerald-600' },
            { label: 'Skills Improved', value: 8, change: '+2', icon: 'TrendingUp', color: 'text-blue-600' },
            { label: 'Badges Earned', value: 5, change: '+1', icon: 'Trophy', color: 'text-amber-600' },
            { label: 'Study Streak', value: 7, change: 'days', icon: 'Flame', color: 'text-orange-600' }
          ],
          chartData: [
            { name: 'Week 1', score: 65 },
            { name: 'Week 2', score: 72 },
            { name: 'Week 3', score: 78 },
            { name: 'Week 4', score: 85 }
          ]
        };
      case 'teacher':
        return {
          title: 'Class Overview',
          subtitle: 'Your students\' collective progress',
          metrics: [
            { label: 'Active Students', value: 28, change: '+2', icon: 'Users', color: 'text-emerald-600' },
            { label: 'Assessments Created', value: 15, change: '+4', icon: 'FileText', color: 'text-blue-600' },
            { label: 'Interventions Applied', value: 23, change: '+7', icon: 'Target', color: 'text-amber-600' },
            { label: 'Improvement Rate', value: 89, change: '%', icon: 'TrendingUp', color: 'text-emerald-600' }
          ],
          chartData: [
            { name: 'Week 1', score: 72 },
            { name: 'Week 2', score: 76 },
            { name: 'Week 3', score: 81 },
            { name: 'Week 4', score: 89 }
          ]
        };
      case 'parent':
        return {
          title: `${userProfile?.childName || "Your Child"}'s Progress`,
          subtitle: 'Learning development tracking',
          metrics: [
            { label: 'Overall Progress', value: 78, change: '+12%', icon: 'TrendingUp', color: 'text-emerald-600' },
            { label: 'Areas Assessed', value: 4, change: 'complete', icon: 'CheckCircle', color: 'text-blue-600' },
            { label: 'Recommendations', value: 6, change: 'active', icon: 'Lightbulb', color: 'text-amber-600' },
            { label: 'Teacher Meetings', value: 3, change: 'scheduled', icon: 'Calendar', color: 'text-purple-600' }
          ],
          chartData: [
            { name: 'Week 1', score: 66 },
            { name: 'Week 2', score: 70 },
            { name: 'Week 3', score: 74 },
            { name: 'Week 4', score: 78 }
          ]
        };
      default:
        return null;
    }
  };

  const progressData = getProgressData();
  if (!progressData) return null;

  return (
    <div className="bg-white rounded-xl shadow-soft border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{progressData?.title}</h3>
          <p className="text-sm text-muted-foreground">{progressData?.subtitle}</p>
        </div>
        <Button
          variant="ghost"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
        >
          View Details
        </Button>
      </div>
      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {progressData?.metrics?.map((metric, index) => (
          <div key={index} className="p-4 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <Icon name={metric?.icon} size={20} className={metric?.color} />
              <span className="text-xs text-muted-foreground">{metric?.change}</span>
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{metric?.value}</div>
            <div className="text-xs text-muted-foreground">{metric?.label}</div>
          </div>
        ))}
      </div>
      {/* Progress Chart */}
      <div className="h-32">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progressData?.chartData}>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fontSize: 12, fill: '#64748B' }}
            />
            <YAxis hide />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #E2E8F0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="score" 
              stroke="#2563EB" 
              strokeWidth={3}
              dot={{ fill: '#2563EB', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#2563EB', strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressOverview;