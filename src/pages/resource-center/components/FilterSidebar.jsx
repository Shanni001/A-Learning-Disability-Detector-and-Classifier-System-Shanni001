import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterSidebar = ({ filters, onFilterChange, onClearFilters, isCollapsed, onToggle }) => {
  const [expandedSections, setExpandedSections] = useState({
    disability: true,
    type: true,
    difficulty: true,
    ageGroup: true,
    language: false,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev?.[section]
    }));
  };

  const filterSections = [
    {
      key: 'disability',
      title: 'Learning Disability',
      icon: 'Brain',
      options: [
        { value: 'adhd', label: 'ADHD', count: 156 },
        { value: 'dyslexia', label: 'Dyslexia', count: 143 },
        { value: 'dyscalculia', label: 'Dyscalculia', count: 98 },
        { value: 'dysgraphia', label: 'Dysgraphia', count: 87 },
        { value: 'general', label: 'General Support', count: 234 },
      ]
    },
    {
      key: 'type',
      title: 'Resource Type',
      icon: 'FileType',
      options: [
        { value: 'video', label: 'Videos', count: 89 },
        { value: 'article', label: 'Articles', count: 156 },
        { value: 'guide', label: 'Guides', count: 67 },
        { value: 'worksheet', label: 'Worksheets', count: 123 },
        { value: 'assessment', label: 'Assessments', count: 45 },
        { value: 'nutrition', label: 'Nutrition Plans', count: 34 },
      ]
    },
    {
      key: 'difficulty',
      title: 'Implementation Level',
      icon: 'TrendingUp',
      options: [
        { value: 'beginner', label: 'Beginner', count: 187 },
        { value: 'intermediate', label: 'Intermediate', count: 145 },
        { value: 'advanced', label: 'Advanced', count: 89 },
      ]
    },
    {
      key: 'ageGroup',
      title: 'Age Group',
      icon: 'Users',
      options: [
        { value: '6-8', label: '6-8 years', count: 98 },
        { value: '9-12', label: '9-12 years', count: 156 },
        { value: '13-15', label: '13-15 years', count: 134 },
        { value: '16-18', label: '16-18 years', count: 87 },
        { value: 'adult', label: 'Adult Support', count: 67 },
      ]
    },
    {
      key: 'language',
      title: 'Language',
      icon: 'Globe',
      options: [
        { value: 'english', label: 'English', count: 456 },
        { value: 'swahili', label: 'Kiswahili', count: 123 },
        { value: 'bilingual', label: 'Bilingual', count: 89 },
      ]
    },
  ];

  const getActiveFilterCount = () => {
    return Object.values(filters)?.flat()?.length;
  };

  return (
    <div className={`bg-white border-r border-border transition-all duration-normal ${
      isCollapsed ? 'w-0 overflow-hidden' : 'w-80'
    }`}>
      <div className="h-full flex flex-col">
        {/* Filter Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} className="text-primary" />
            <h2 className="text-lg font-semibold text-foreground">Filters</h2>
            {getActiveFilterCount() > 0 && (
              <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearFilters}
              disabled={getActiveFilterCount() === 0}
            >
              Clear All
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8"
            >
              <Icon name="PanelLeftClose" size={16} />
            </Button>
          </div>
        </div>

        {/* Filter Sections */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {filterSections?.map((section) => (
            <div key={section?.key} className="space-y-3">
              <button
                onClick={() => toggleSection(section?.key)}
                className="flex items-center justify-between w-full text-left"
              >
                <div className="flex items-center space-x-2">
                  <Icon name={section?.icon} size={16} className="text-muted-foreground" />
                  <h3 className="font-medium text-foreground">{section?.title}</h3>
                </div>
                <Icon
                  name="ChevronDown"
                  size={16}
                  className={`text-muted-foreground transition-transform duration-fast ${
                    expandedSections?.[section?.key] ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSections?.[section?.key] && (
                <div className="space-y-2 ml-6">
                  {section?.options?.map((option) => (
                    <div key={option?.value} className="flex items-center justify-between">
                      <Checkbox
                        label={option?.label}
                        checked={filters?.[section?.key]?.includes(option?.value) || false}
                        onChange={(e) => {
                          const isChecked = e?.target?.checked;
                          const currentFilters = filters?.[section?.key] || [];
                          const newFilters = isChecked
                            ? [...currentFilters, option?.value]
                            : currentFilters?.filter(f => f !== option?.value);
                          onFilterChange(section?.key, newFilters);
                        }}
                        className="flex-1"
                      />
                      <span className="text-xs text-muted-foreground ml-2">
                        {option?.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="p-4 border-t border-border space-y-3">
          <h3 className="font-medium text-foreground mb-2">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              iconName="Bookmark"
              iconPosition="left"
            >
              View Bookmarked
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              iconName="Download"
              iconPosition="left"
            >
              Downloaded Resources
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              iconName="History"
              iconPosition="left"
            >
              Recently Viewed
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;