import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ResourceCard = ({ resource, onBookmark, onShare, onDownload }) => {
  const [isBookmarked, setIsBookmarked] = useState(resource?.isBookmarked || false);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    onBookmark?.(resource?.id, !isBookmarked);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-empowerment-green text-white';
      case 'Intermediate': return 'bg-illumination-gold text-white';
      case 'Advanced': return 'bg-action-red text-white';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Video': return 'Play';
      case 'Article': return 'FileText';
      case 'Guide': return 'BookOpen';
      case 'Worksheet': return 'FileDown';
      case 'Assessment': return 'ClipboardCheck';
      default: return 'File';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border shadow-soft hover:shadow-interactive transition-all duration-fast empowerment-hover">
      {/* Resource Image */}
      <div className="relative h-48 overflow-hidden rounded-t-lg">
        <Image
          src={resource?.image}
          alt={resource?.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(resource?.difficulty)}`}>
            {resource?.difficulty}
          </span>
        </div>
        <div className="absolute top-3 right-3 flex space-x-2">
          <button
            onClick={handleBookmark}
            className={`p-2 rounded-full transition-colors duration-fast ${
              isBookmarked 
                ? 'bg-illumination-gold text-white' :'bg-white/90 text-muted-foreground hover:text-foreground'
            }`}
          >
            <Icon name={isBookmarked ? "Bookmark" : "BookmarkPlus"} size={16} />
          </button>
          <button
            onClick={() => onShare?.(resource)}
            className="p-2 rounded-full bg-white/90 text-muted-foreground hover:text-foreground transition-colors duration-fast"
          >
            <Icon name="Share2" size={16} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3">
          <div className="flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
            <Icon name={getTypeIcon(resource?.type)} size={14} className="text-primary" />
            <span className="text-xs font-medium text-foreground">{resource?.type}</span>
          </div>
        </div>
      </div>
      {/* Resource Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground line-clamp-2 flex-1">
            {resource?.title}
          </h3>
          <div className="flex items-center ml-2">
            {[...Array(5)]?.map((_, i) => (
              <Icon
                key={i}
                name="Star"
                size={14}
                className={i < Math.floor(resource?.rating) ? "text-illumination-gold fill-current" : "text-muted"}
              />
            ))}
            <span className="text-sm text-muted-foreground ml-1">({resource?.reviews})</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
          {resource?.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {resource?.tags?.slice(0, 3)?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full"
            >
              {tag}
            </span>
          ))}
          {resource?.tags?.length > 3 && (
            <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
              +{resource?.tags?.length - 3} more
            </span>
          )}
        </div>

        {/* Resource Meta */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{resource?.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Users" size={14} />
              <span>{resource?.ageGroup}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Download" size={14} />
            <span>{resource?.downloads}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            variant="default"
            size="sm"
            className="flex-1"
            iconName="Eye"
            iconPosition="left"
          >
            View Resource
          </Button>
          {resource?.downloadable && (
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              onClick={() => onDownload?.(resource)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;