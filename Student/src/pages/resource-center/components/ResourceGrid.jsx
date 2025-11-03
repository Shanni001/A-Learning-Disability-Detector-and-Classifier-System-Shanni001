import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import ResourceCard from './ResourceCard';

const ResourceGrid = ({ resources, loading, onLoadMore, hasMore, viewMode, onViewModeChange }) => {
  const [sortBy, setSortBy] = useState('relevance');

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'newest', label: 'Newest First', icon: 'Clock' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'downloads', label: 'Most Downloaded', icon: 'Download' },
    { value: 'alphabetical', label: 'A-Z', icon: 'ArrowUpDown' },
  ];

  const viewModes = [
    { value: 'grid', icon: 'Grid3x3', label: 'Grid View' },
    { value: 'list', icon: 'List', label: 'List View' },
  ];

  const handleBookmark = (resourceId, isBookmarked) => {
    console.log(`Resource ${resourceId} ${isBookmarked ? 'bookmarked' : 'unbookmarked'}`);
  };

  const handleShare = (resource) => {
    if (navigator.share) {
      navigator.share({
        title: resource?.title,
        text: resource?.description,
        url: window.location?.href,
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
    }
  };

  const handleDownload = (resource) => {
    console.log(`Downloading resource: ${resource?.title}`);
  };

  if (loading && resources?.length === 0) {
    return (
      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(9)]?.map((_, index) => (
            <div key={index} className="bg-white rounded-lg border border-border shadow-soft animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
                <div className="flex space-x-2">
                  <div className="h-8 bg-muted rounded flex-1"></div>
                  <div className="h-8 w-8 bg-muted rounded"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6">
      {/* Results Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-foreground">
            {resources?.length} Resources Found
          </h2>
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Showing results for current filters
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e?.target?.value)}
              className="appearance-none bg-white border border-border rounded-lg px-4 py-2 pr-8 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortOptions?.map((option) => (
                <option key={option?.value} value={option?.value}>
                  {option?.label}
                </option>
              ))}
            </select>
            <Icon
              name="ChevronDown"
              size={16}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
            />
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            {viewModes?.map((mode) => (
              <button
                key={mode?.value}
                onClick={() => onViewModeChange(mode?.value)}
                className={`p-2 rounded-md transition-colors duration-fast ${
                  viewMode === mode?.value
                    ? 'bg-white text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                title={mode?.label}
              >
                <Icon name={mode?.icon} size={16} />
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Resources Grid/List */}
      {resources?.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Search" size={32} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No resources found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
          <Button variant="outline" iconName="RotateCcw" iconPosition="left">
            Clear Filters
          </Button>
        </div>
      ) : (
        <>
          <div className={`${
            viewMode === 'grid' ?'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' :'space-y-4'
          }`}>
            {resources?.map((resource) => (
              <ResourceCard
                key={resource?.id}
                resource={resource}
                onBookmark={handleBookmark}
                onShare={handleShare}
                onDownload={handleDownload}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                size="lg"
                onClick={onLoadMore}
                loading={loading}
                iconName="ChevronDown"
                iconPosition="right"
              >
                Load More Resources
              </Button>
            </div>
          )}

          {/* End of Results */}
          {!hasMore && resources?.length > 0 && (
            <div className="text-center mt-12 py-8 border-t border-border">
              <Icon name="CheckCircle" size={24} className="text-empowerment-green mx-auto mb-2" />
              <p className="text-muted-foreground">
                You've viewed all available resources for your current filters.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ResourceGrid;