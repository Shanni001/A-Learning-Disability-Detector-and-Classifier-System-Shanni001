import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportTemplates = ({ templates, onSelectTemplate, onCreateCustom }) => {
  const getTemplateIcon = (type) => {
    switch (type) {
      case 'comprehensive':
        return 'FileText';
      case 'summary':
        return 'FileCheck';
      case 'parent':
        return 'Heart';
      case 'educator':
        return 'GraduationCap';
      case 'medical':
        return 'Stethoscope';
      default:
        return 'File';
    }
  };

  const getTemplateColor = (type) => {
    switch (type) {
      case 'comprehensive':
        return 'bg-gradient-primary';
      case 'summary':
        return 'bg-gradient-secondary';
      case 'parent':
        return 'bg-gradient-illumination';
      case 'educator':
        return 'bg-authority-purple';
      case 'medical':
        return 'bg-action-red';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Report Templates</h3>
          <p className="text-sm text-muted-foreground">Choose from professional templates or create custom reports</p>
        </div>
        <Button
          variant="outline"
          onClick={onCreateCustom}
          iconName="Plus"
          iconPosition="left"
        >
          Create Custom
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates?.map((template) => (
          <div
            key={template?.id}
            className="border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-fast cursor-pointer empowerment-hover"
            onClick={() => onSelectTemplate(template)}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className={`w-10 h-10 ${getTemplateColor(template?.type)} rounded-lg flex items-center justify-center flex-shrink-0`}>
                <Icon name={getTemplateIcon(template?.type)} size={20} className="text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground truncate">{template?.name}</h4>
                <p className="text-sm text-muted-foreground">{template?.description}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Sections</span>
                <span className="font-medium text-foreground">{template?.sections}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Pages</span>
                <span className="font-medium text-foreground">{template?.pages}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">Language</span>
                <span className="font-medium text-foreground">{template?.language}</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1">
                {[...Array(5)]?.map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={12}
                    className={i < template?.rating ? 'text-illumination-gold fill-current' : 'text-muted'}
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">({template?.usage})</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                template?.isPremium 
                  ? 'bg-illumination-gold/10 text-illumination-gold' :'bg-empowerment-green/10 text-empowerment-green'
              }`}>
                {template?.isPremium ? 'Premium' : 'Free'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportTemplates;