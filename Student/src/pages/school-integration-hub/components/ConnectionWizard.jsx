import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ConnectionWizard = ({ school, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    connectionType: '',
    apiKey: '',
    serverUrl: '',
    username: '',
    password: '',
    syncFrequency: 'daily',
    dataTypes: []
  });

  const connectionTypes = [
    { value: 'api', label: 'REST API Integration' },
    { value: 'sso', label: 'Single Sign-On (SSO)' },
    { value: 'csv', label: 'CSV Data Import' },
    { value: 'manual', label: 'Manual Setup' }
  ];

  const syncOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: 'hourly', label: 'Every Hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' }
  ];

  const dataTypeOptions = [
    { value: 'students', label: 'Student Records' },
    { value: 'teachers', label: 'Teacher Profiles' },
    { value: 'classes', label: 'Class Schedules' },
    { value: 'assessments', label: 'Assessment Data' },
    { value: 'grades', label: 'Grade Records' }
  ];

  const steps = [
    { number: 1, title: 'Connection Type', description: 'Choose integration method' },
    { number: 2, title: 'Configuration', description: 'Setup connection details' },
    { number: 3, title: 'Data Sync', description: 'Configure synchronization' },
    { number: 4, title: 'Review', description: 'Confirm settings' }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Select Integration Method
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose how you want to connect {school?.name} to AngazaLearn
              </p>
            </div>
            <Select
              label="Connection Type"
              options={connectionTypes}
              value={formData?.connectionType}
              onChange={(value) => setFormData({...formData, connectionType: value})}
              placeholder="Select integration method"
              required
            />
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="Info" size={20} className="text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Recommended</h4>
                  <p className="text-sm text-muted-foreground">
                    REST API integration provides the most seamless experience with real-time data synchronization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Connection Configuration
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Enter the connection details for {school?.name}
              </p>
            </div>
            {formData?.connectionType === 'api' && (
              <>
                <Input
                  label="API Key"
                  type="password"
                  placeholder="Enter your API key"
                  value={formData?.apiKey}
                  onChange={(e) => setFormData({...formData, apiKey: e?.target?.value})}
                  required
                />
                <Input
                  label="Server URL"
                  type="url"
                  placeholder="https://school-api.example.com"
                  value={formData?.serverUrl}
                  onChange={(e) => setFormData({...formData, serverUrl: e?.target?.value})}
                  required
                />
              </>
            )}
            {formData?.connectionType === 'sso' && (
              <>
                <Input
                  label="SSO Provider URL"
                  type="url"
                  placeholder="https://sso.school.edu"
                  value={formData?.serverUrl}
                  onChange={(e) => setFormData({...formData, serverUrl: e?.target?.value})}
                  required
                />
                <Input
                  label="Client ID"
                  type="text"
                  placeholder="Enter client ID"
                  value={formData?.username}
                  onChange={(e) => setFormData({...formData, username: e?.target?.value})}
                  required
                />
              </>
            )}
            {(formData?.connectionType === 'csv' || formData?.connectionType === 'manual') && (
              <div className="bg-muted/50 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <Icon name="Upload" size={20} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-foreground mb-1">Data Import</h4>
                    <p className="text-sm text-muted-foreground mb-3">
                      You'll be able to upload CSV files or manually enter data after completing this setup.
                    </p>
                    <Button variant="outline" size="sm" iconName="Download">
                      Download Template
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Data Synchronization
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Configure what data to sync and how often
              </p>
            </div>
            <Select
              label="Sync Frequency"
              options={syncOptions}
              value={formData?.syncFrequency}
              onChange={(value) => setFormData({...formData, syncFrequency: value})}
              required
            />
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Data Types to Sync
              </label>
              <div className="space-y-2">
                {dataTypeOptions?.map((option) => (
                  <label key={option?.value} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      className="rounded border-border text-primary focus:ring-primary"
                      checked={formData?.dataTypes?.includes(option?.value)}
                      onChange={(e) => {
                        const newDataTypes = e?.target?.checked
                          ? [...formData?.dataTypes, option?.value]
                          : formData?.dataTypes?.filter(type => type !== option?.value);
                        setFormData({...formData, dataTypes: newDataTypes});
                      }}
                    />
                    <span className="text-sm text-foreground">{option?.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Review Configuration
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Please review your integration settings before connecting
              </p>
            </div>
            <div className="bg-muted/50 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">School:</span>
                <span className="text-sm font-medium text-foreground">{school?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Connection Type:</span>
                <span className="text-sm font-medium text-foreground">
                  {connectionTypes?.find(t => t?.value === formData?.connectionType)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Sync Frequency:</span>
                <span className="text-sm font-medium text-foreground">
                  {syncOptions?.find(s => s?.value === formData?.syncFrequency)?.label}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Data Types:</span>
                <span className="text-sm font-medium text-foreground">
                  {formData?.dataTypes?.length} selected
                </span>
              </div>
            </div>
            <div className="bg-empowerment-green/10 border border-empowerment-green/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="CheckCircle" size={20} className="text-empowerment-green mt-0.5" />
                <div>
                  <h4 className="font-medium text-empowerment-green mb-1">Ready to Connect</h4>
                  <p className="text-sm text-empowerment-green/80">
                    Your integration will be established and initial data sync will begin immediately.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-elevated w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Connect to {school?.name}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              Step {currentStep} of {steps?.length}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-border">
          <div className="flex items-center justify-between">
            {steps?.map((step, index) => (
              <div key={step?.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  currentStep >= step?.number
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {currentStep > step?.number ? (
                    <Icon name="Check" size={16} />
                  ) : (
                    step?.number
                  )}
                </div>
                {index < steps?.length - 1 && (
                  <div className={`w-16 h-0.5 mx-2 ${
                    currentStep > step?.number ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {steps?.map((step) => (
              <div key={step?.number} className="text-center">
                <p className="text-xs font-medium text-foreground">{step?.title}</p>
                <p className="text-xs text-muted-foreground">{step?.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <Button
            variant="default"
            onClick={handleNext}
            iconName={currentStep === 4 ? "Check" : "ChevronRight"}
            iconPosition="right"
          >
            {currentStep === 4 ? 'Complete Setup' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConnectionWizard;