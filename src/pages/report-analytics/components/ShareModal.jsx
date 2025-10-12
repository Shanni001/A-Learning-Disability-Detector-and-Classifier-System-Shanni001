import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const ShareModal = ({ report, onClose, onShare }) => {
  const [shareMethod, setShareMethod] = useState('email');
  const [recipients, setRecipients] = useState('');
  const [message, setMessage] = useState(`I'm sharing the assessment report for ${report?.studentName}. This comprehensive analysis includes AI-powered insights and personalized recommendations for continued support.`);
  const [permissions, setPermissions] = useState('view');
  const [expirationDays, setExpirationDays] = useState('30');

  const shareOptions = [
    { id: 'email', name: 'Email', icon: 'Mail', description: 'Send via email with secure link' },
    { id: 'link', name: 'Secure Link', icon: 'Link', description: 'Generate shareable secure link' },
    { id: 'download', name: 'Download & Share', icon: 'Download', description: 'Download PDF to share manually' }
  ];

  const permissionLevels = [
    { value: 'view', label: 'View Only', description: 'Recipients can only view the report' },
    { value: 'comment', label: 'View & Comment', description: 'Recipients can view and add comments' },
    { value: 'download', label: 'View & Download', description: 'Recipients can view and download the report' }
  ];

  const expirationOptions = [
    { value: '7', label: '7 days' },
    { value: '30', label: '30 days' },
    { value: '90', label: '90 days' },
    { value: 'never', label: 'Never expires' }
  ];

  const handleShare = () => {
    const shareData = {
      method: shareMethod,
      recipients: recipients?.split(',')?.map(email => email?.trim()),
      message,
      permissions,
      expirationDays: expirationDays === 'never' ? null : parseInt(expirationDays),
      reportId: report?.id
    };
    onShare(shareData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-elevated max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-bold text-foreground">Share Report</h2>
            <p className="text-sm text-muted-foreground">{report?.studentName} - {report?.assessmentType} Assessment</p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <Icon name="X" size={16} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Share Method Selection */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">How would you like to share?</h3>
            <div className="grid grid-cols-1 gap-3">
              {shareOptions?.map((option) => (
                <label
                  key={option?.id}
                  className={`flex items-center space-x-3 p-4 border rounded-lg cursor-pointer transition-all duration-fast ${
                    shareMethod === option?.id
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="shareMethod"
                    value={option?.id}
                    checked={shareMethod === option?.id}
                    onChange={(e) => setShareMethod(e?.target?.value)}
                    className="sr-only"
                  />
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    shareMethod === option?.id ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'
                  }`}>
                    <Icon name={option?.icon} size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{option?.name}</p>
                    <p className="text-sm text-muted-foreground">{option?.description}</p>
                  </div>
                  {shareMethod === option?.id && (
                    <Icon name="Check" size={20} className="text-primary" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Email Recipients (only for email method) */}
          {shareMethod === 'email' && (
            <div>
              <Input
                label="Email Recipients"
                type="email"
                placeholder="Enter email addresses separated by commas"
                value={recipients}
                onChange={(e) => setRecipients(e?.target?.value)}
                description="Separate multiple email addresses with commas"
              />
            </div>
          )}

          {/* Message */}
          {shareMethod !== 'download' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message (Optional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e?.target?.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                placeholder="Add a personal message..."
              />
            </div>
          )}

          {/* Permissions */}
          {shareMethod !== 'download' && (
            <div>
              <h4 className="font-medium text-foreground mb-3">Access Permissions</h4>
              <div className="space-y-2">
                {permissionLevels?.map((level) => (
                  <label
                    key={level?.value}
                    className={`flex items-start space-x-3 p-3 border rounded-lg cursor-pointer transition-all duration-fast ${
                      permissions === level?.value
                        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="permissions"
                      value={level?.value}
                      checked={permissions === level?.value}
                      onChange={(e) => setPermissions(e?.target?.value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{level?.label}</p>
                      <p className="text-sm text-muted-foreground">{level?.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Expiration */}
          {shareMethod !== 'download' && (
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Link Expiration
              </label>
              <select
                value={expirationDays}
                onChange={(e) => setExpirationDays(e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                {expirationOptions?.map((option) => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Security Notice */}
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <Icon name="Shield" size={16} className="text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-foreground">Security & Privacy</p>
                <p className="text-xs text-muted-foreground mt-1">
                  All shared reports are encrypted and comply with GDPR privacy standards. 
                  Recipients will need to verify their identity to access sensitive student data.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="default"
            onClick={handleShare}
            disabled={shareMethod === 'email' && !recipients?.trim()}
            iconName="Share2"
            iconPosition="left"
          >
            {shareMethod === 'email' ? 'Send Email' : 
             shareMethod === 'link' ? 'Generate Link' : 'Download PDF'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ShareModal;