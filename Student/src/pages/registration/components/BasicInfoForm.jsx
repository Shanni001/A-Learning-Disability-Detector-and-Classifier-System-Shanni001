import React from 'react';
import Input from 'components/ui/Input';

const BasicInfoForm = ({ formData, onFieldChange, validationErrors }) => {
  const handleInputChange = (field) => (e) => {
    onFieldChange(field, e?.target?.value);
  };

  const formatPhoneNumber = (value) => {
    // Remove all non-digits
    const digits = value?.replace(/\D/g, '');
    
    // Format as +254 XXX XXX XXX
    if (digits?.startsWith('254')) {
      const formatted = digits?.replace(/^254(\d{3})(\d{3})(\d{3}).*/, '+254 $1 $2 $3');
      return formatted;
    } else if (digits?.startsWith('0')) {
      // Convert 0XXX to +254 XXX
      const withoutZero = digits?.substring(1);
      const formatted = withoutZero?.replace(/(\d{3})(\d{3})(\d{3}).*/, '+254 $1 $2 $3');
      return formatted;
    } else if (digits?.length > 0) {
      // Assume it's a local number
      const formatted = digits?.replace(/(\d{3})(\d{3})(\d{3}).*/, '+254 $1 $2 $3');
      return formatted;
    }
    
    return value;
  };

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e?.target?.value);
    onFieldChange('phone', formatted);
  };

  return (
    <div className="space-y-4">
      <Input
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={formData?.fullName || ''}
        onChange={handleInputChange('fullName')}
        error={validationErrors?.fullName}
        required
      />
      <Input
        label="Email Address"
        type="email"
        placeholder="Enter your email address"
        value={formData?.email || ''}
        onChange={handleInputChange('email')}
        error={validationErrors?.email}
        description="We'll use this for account verification and updates"
        required
      />
      <Input
        label="Phone Number"
        type="tel"
        placeholder="+254 700 000 000"
        value={formData?.phone || ''}
        onChange={handlePhoneChange}
        error={validationErrors?.phone}
        description="Kenyan mobile number format"
        required
      />
    </div>
  );
};

export default BasicInfoForm;