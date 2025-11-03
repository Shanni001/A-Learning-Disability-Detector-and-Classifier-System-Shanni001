import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const AssessmentFilters = ({ 
  onFilterChange, 
  activeFilters = {},
  assessmentCount = 0 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'adhd', label: 'ADHD Assessments' },
    { value: 'dyslexia', label: 'Dyslexia Assessments' },
    { value: 'dyscalculia', label: 'Dyscalculia Assessments' },
    { value: 'dysgraphia', label: 'Dysgraphia Assessments' }
  ];

  const difficultyOptions = [
    { value: 'all', label: 'All Levels' },
    { value: 'beginner', label: 'Beginner' },
    { value: 'intermediate', label: 'Intermediate' },
    { value: 'advanced', label: 'Advanced' }
  ];

  const durationOptions = [
    { value: 'all', label: 'Any Duration' },
    { value: 'short', label: 'Short (5-15 min)' },
    { value: 'medium', label: 'Medium (15-30 min)' },
    { value: 'long', label: 'Long (30+ min)' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'not-started', label: 'Not Started' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' }
  ];

  const ageRangeOptions = [
    { value: 'all', label: 'All Ages' },
    { value: '6-8', label: '6-8 years' },
    { value: '9-12', label: '9-12 years' },
    { value: '13-15', label: '13-15 years' },
    { value: '16-18', label: '16-18 years' }
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value
    };
    onFilterChange(newFilters);
  };

  const clearAllFilters = () => {
    onFilterChange({});
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => value && value !== 'all')?.length;
  };

  return (
    <div className="bg-white rounded-xl border border-border p-4 shadow-soft">
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <div>
            <h3 className="text-lg font-semibold text-foreground">Filter Assessments</h3>
            <p className="text-sm text-muted-foreground">
              {assessmentCount} assessments available
              {getActiveFilterCount() > 0 && ` • ${getActiveFilterCount()} filters active`}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {isExpanded ? 'Less' : 'More'} Filters
          </Button>
        </div>
      </div>
      {/* Quick Filter Buttons */}
      <div className="flex flex-wrap gap-2 mb-4">
        <Button
          variant={activeFilters?.category === 'adhd' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('category', activeFilters?.category === 'adhd' ? 'all' : 'adhd')}
          className="text-xs"
        >
          ADHD
        </Button>
        <Button
          variant={activeFilters?.category === 'dyslexia' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('category', activeFilters?.category === 'dyslexia' ? 'all' : 'dyslexia')}
          className="text-xs"
        >
          Dyslexia
        </Button>
        <Button
          variant={activeFilters?.category === 'dyscalculia' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('category', activeFilters?.category === 'dyscalculia' ? 'all' : 'dyscalculia')}
          className="text-xs"
        >
          Dyscalculia
        </Button>
        <Button
          variant={activeFilters?.category === 'dysgraphia' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('category', activeFilters?.category === 'dysgraphia' ? 'all' : 'dysgraphia')}
          className="text-xs"
        >
          Dysgraphia
        </Button>
        <Button
          variant={activeFilters?.status === 'not-started' ? 'default' : 'outline'}
          size="sm"
          onClick={() => handleFilterChange('status', activeFilters?.status === 'not-started' ? 'all' : 'not-started')}
          className="text-xs"
        >
          New
        </Button>
      </div>
      {/* Expanded Filters */}
      {isExpanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-border">
          <Select
            label="Category"
            options={categoryOptions}
            value={activeFilters?.category || 'all'}
            onChange={(value) => handleFilterChange('category', value)}
            className="mb-0"
          />
          
          <Select
            label="Difficulty Level"
            options={difficultyOptions}
            value={activeFilters?.difficulty || 'all'}
            onChange={(value) => handleFilterChange('difficulty', value)}
            className="mb-0"
          />
          
          <Select
            label="Duration"
            options={durationOptions}
            value={activeFilters?.duration || 'all'}
            onChange={(value) => handleFilterChange('duration', value)}
            className="mb-0"
          />
          
          <Select
            label="Status"
            options={statusOptions}
            value={activeFilters?.status || 'all'}
            onChange={(value) => handleFilterChange('status', value)}
            className="mb-0"
          />
          
          <Select
            label="Age Range"
            options={ageRangeOptions}
            value={activeFilters?.ageRange || 'all'}
            onChange={(value) => handleFilterChange('ageRange', value)}
            className="mb-0"
          />
          
          <div className="flex items-end">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => handleFilterChange('recommended', !activeFilters?.recommended)}
              iconName={activeFilters?.recommended ? "Star" : "StarOff"}
              iconPosition="left"
              className="w-full"
            >
              {activeFilters?.recommended ? 'Show All' : 'Recommended Only'}
            </Button>
          </div>
        </div>
      )}
      {/* Active Filters Display */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Tag" size={16} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Active Filters:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)?.map(([key, value]) => {
              if (!value || value === 'all') return null;
              
              const getFilterLabel = (filterKey, filterValue) => {
                switch (filterKey) {
                  case 'category':
                    return categoryOptions?.find(opt => opt?.value === filterValue)?.label || filterValue;
                  case 'difficulty':
                    return difficultyOptions?.find(opt => opt?.value === filterValue)?.label || filterValue;
                  case 'duration':
                    return durationOptions?.find(opt => opt?.value === filterValue)?.label || filterValue;
                  case 'status':
                    return statusOptions?.find(opt => opt?.value === filterValue)?.label || filterValue;
                  case 'ageRange':
                    return ageRangeOptions?.find(opt => opt?.value === filterValue)?.label || filterValue;
                  case 'recommended':
                    return 'Recommended';
                  default:
                    return filterValue;
                }
              };
              
              return (
                <span
                  key={key}
                  className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-md text-xs font-medium"
                >
                  <span>{getFilterLabel(key, value)}</span>
                  <button
                    onClick={() => handleFilterChange(key, 'all')}
                    className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-fast"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default AssessmentFilters;