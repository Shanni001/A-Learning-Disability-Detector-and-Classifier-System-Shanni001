import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportCard = ({ report, onView, onDownload, onShare }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-empowerment-green bg-empowerment-green/10';
      case 'processing':
        return 'text-illumination-gold bg-illumination-gold/10';
      case 'draft':
        return 'text-muted-foreground bg-muted';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  const getDisabilityIcon = (type) => {
    switch (type) {
      case 'ADHD':
        return 'Zap';
      case 'Dyscalculia':
        return 'Calculator';
      case 'Dyslexia':
        return 'BookOpen';
      case 'Dysgraphia':
        return 'PenTool';
      default:
        return 'FileText';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 hover:shadow-soft transition-all duration-fast empowerment-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
            <Icon name={getDisabilityIcon(report?.assessmentType)} size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{report?.studentName}</h3>
            <p className="text-sm text-muted-foreground">{report?.assessmentType} Assessment</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(report?.status)}`}>
          {report?.status?.charAt(0)?.toUpperCase() + report?.status?.slice(1)}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-muted-foreground">Assessment Date</p>
          <p className="text-sm font-medium text-foreground">{report?.assessmentDate}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Report Generated</p>
          <p className="text-sm font-medium text-foreground">{report?.generatedDate}</p>
        </div>
      </div>
      {report?.keyFindings && (
        <div className="mb-4">
          <p className="text-xs text-muted-foreground mb-2">Key Findings</p>
          <div className="flex flex-wrap gap-2">
            {report?.keyFindings?.slice(0, 3)?.map((finding, index) => (
              <span key={index} className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">
                {finding}
              </span>
            ))}
            {report?.keyFindings?.length > 3 && (
              <span className="px-2 py-1 bg-muted text-xs rounded-md text-muted-foreground">
                +{report?.keyFindings?.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={16} />
          <span>{report?.stakeholders} stakeholders</span>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onShare(report)}
            className="h-8 w-8 p-0"
          >
            <Icon name="Share2" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDownload(report)}
            className="h-8 w-8 p-0"
          >
            <Icon name="Download" size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(report)}
          >
            View Report
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;