import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ReportFilters = ({ filters, onFilterChange, onClearFilters }) => {
  const assessmentTypes = [
    { value: 'all', label: 'All Assessments' },
    { value: 'ADHD', label: 'ADHD' },
    { value: 'Dyscalculia', label: 'Dyscalculia' },
    { value: 'Dyslexia', label: 'Dyslexia' },
    { value: 'Dysgraphia', label: 'Dysgraphia' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'completed', label: 'Completed' },
    { value: 'processing', label: 'Processing' },
    { value: 'draft', label: 'Draft' }
  ];

  const timeRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  return (
    <div className="bg-white rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter Reports</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearFilters}
          className="text-muted-foreground hover:text-foreground"
        >
          <Icon name="X" size={16} className="mr-2" />
          Clear All
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
        <div>
          <Input
            type="search"
            placeholder="Search by student name..."
            value={filters?.search}
            onChange={(e) => onFilterChange('search', e?.target?.value)}
            className="w-full"
          />
        </div>

        <div>
          <select
            value={filters?.assessmentType}
            onChange={(e) => onFilterChange('assessmentType', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {assessmentTypes?.map(type => (
              <option key={type?.value} value={type?.value}>{type?.label}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={filters?.status}
            onChange={(e) => onFilterChange('status', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {statusOptions?.map(status => (
              <option key={status?.value} value={status?.value}>{status?.label}</option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={filters?.timeRange}
            onChange={(e) => onFilterChange('timeRange', e?.target?.value)}
            className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            {timeRanges?.map(range => (
              <option key={range?.value} value={range?.value}>{range?.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {filters?.search && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary">
            Search: "{filters?.search}"
            <button
              onClick={() => onFilterChange('search', '')}
              className="ml-2 hover:text-primary/70"
            >
              <Icon name="X" size={12} />
            </button>
          </span>
        )}
        {filters?.assessmentType !== 'all' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-secondary/10 text-secondary">
            Type: {assessmentTypes?.find(t => t?.value === filters?.assessmentType)?.label}
            <button
              onClick={() => onFilterChange('assessmentType', 'all')}
              className="ml-2 hover:text-secondary/70"
            >
              <Icon name="X" size={12} />
            </button>
          </span>
        )}
        {filters?.status !== 'all' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-accent/10 text-accent">
            Status: {statusOptions?.find(s => s?.value === filters?.status)?.label}
            <button
              onClick={() => onFilterChange('status', 'all')}
              className="ml-2 hover:text-accent/70"
            >
              <Icon name="X" size={12} />
            </button>
          </span>
        )}
        {filters?.timeRange !== 'all' && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-muted text-muted-foreground">
            Time: {timeRanges?.find(t => t?.value === filters?.timeRange)?.label}
            <button
              onClick={() => onFilterChange('timeRange', 'all')}
              className="ml-2 hover:text-muted-foreground/70"
            >
              <Icon name="X" size={12} />
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default ReportFilters;