import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTabs = ({ activeCategory, onCategoryChange }) => {
  const categories = [
    {
      id: 'all',
      name: 'All Resources',
      icon: 'Grid3x3',
      count: 718,
      description: 'Complete library'
    },
    {
      id: 'intervention',
      name: 'Intervention Strategies',
      icon: 'Target',
      count: 234,
      description: 'Evidence-based approaches'
    },
    {
      id: 'nutrition',
      name: 'Nutritional Guidance',
      icon: 'Apple',
      count: 89,
      description: 'Diet & learning connection'
    },
    {
      id: 'educational',
      name: 'Educational Materials',
      icon: 'BookOpen',
      count: 156,
      description: 'Learning resources'
    },
    {
      id: 'assessment',
      name: 'Assessment Tools',
      icon: 'ClipboardCheck',
      count: 67,
      description: 'Diagnostic resources'
    },
    {
      id: 'community',
      name: 'Community Stories',
      icon: 'Users',
      count: 123,
      description: 'Success stories & insights'
    },
    {
      id: 'professional',
      name: 'Professional Development',
      icon: 'GraduationCap',
      count: 49,
      description: 'Educator training'
    }
  ];

  return (
    <div className="bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 overflow-x-auto scrollbar-hide py-4">
          {categories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => onCategoryChange(category?.id)}
              className={`flex-shrink-0 flex flex-col items-center space-y-2 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-fast empowerment-hover ${
                activeCategory === category?.id
                  ? 'bg-primary text-primary-foreground shadow-soft'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Icon name={category?.icon} size={18} />
                <span className="whitespace-nowrap">{category?.name}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${
                  activeCategory === category?.id
                    ? 'bg-white/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {category?.count}
                </span>
              </div>
              <p className={`text-xs text-center ${
                activeCategory === category?.id
                  ? 'text-primary-foreground/80'
                  : 'text-muted-foreground'
              }`}>
                {category?.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;