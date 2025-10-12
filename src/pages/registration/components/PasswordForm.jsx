import React, { useState } from 'react';
import Input from 'components/ui/Input';
import Icon from 'components/AppIcon';

const PasswordForm = ({ formData, onFieldChange, validationErrors }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (field) => (e) => {
    onFieldChange(field, e?.target?.value);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { score: 0, label: '', color: '' };
    
    let score = 0;
    const checks = {
      length: password?.length >= 8,
      uppercase: /[A-Z]/?.test(password),
      lowercase: /[a-z]/?.test(password),
      number: /\d/?.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/?.test(password)
    };

    score = Object.values(checks)?.filter(Boolean)?.length;

    if (score <= 2) return { score, label: 'Weak', color: 'text-destructive' };
    if (score <= 3) return { score, label: 'Fair', color: 'text-warning' };
    if (score <= 4) return { score, label: 'Good', color: 'text-primary' };
    return { score, label: 'Strong', color: 'text-success' };
  };

  const passwordStrength = getPasswordStrength(formData?.password || '');

  const passwordRequirements = [
    { text: 'At least 8 characters', met: (formData?.password || '')?.length >= 8 },
    { text: 'One uppercase letter', met: /[A-Z]/?.test(formData?.password || '') },
    { text: 'One lowercase letter', met: /[a-z]/?.test(formData?.password || '') },
    { text: 'One number', met: /\d/?.test(formData?.password || '') },
    { text: 'One special character', met: /[!@#$%^&*(),.?":{}|<>]/?.test(formData?.password || '') }
  ];

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="Create a strong password"
            value={formData?.password || ''}
            onChange={handleInputChange('password')}
            error={validationErrors?.password}
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-educational"
          >
            <Icon name={showPassword ? "EyeOff" : "Eye"} size={16} />
          </button>
        </div>

        {formData?.password && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Password strength:</span>
              <span className={`text-xs font-medium ${passwordStrength?.color}`}>
                {passwordStrength?.label}
              </span>
            </div>
            
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-educational ${
                  passwordStrength?.score <= 2 ? 'bg-destructive' :
                  passwordStrength?.score <= 3 ? 'bg-warning' :
                  passwordStrength?.score <= 4 ? 'bg-primary' : 'bg-success'
                }`}
                style={{ width: `${(passwordStrength?.score / 5) * 100}%` }}
              />
            </div>

            <div className="space-y-1">
              {passwordRequirements?.map((req, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Icon 
                    name={req?.met ? "Check" : "X"} 
                    size={12} 
                    className={req?.met ? 'text-success' : 'text-muted-foreground'} 
                  />
                  <span className={`text-xs ${req?.met ? 'text-success' : 'text-muted-foreground'}`}>
                    {req?.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="relative">
        <Input
          label="Confirm Password"
          type={showConfirmPassword ? "text" : "password"}
          placeholder="Confirm your password"
          value={formData?.confirmPassword || ''}
          onChange={handleInputChange('confirmPassword')}
          error={validationErrors?.confirmPassword}
          required
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute right-3 top-8 text-muted-foreground hover:text-foreground transition-educational"
        >
          <Icon name={showConfirmPassword ? "EyeOff" : "Eye"} size={16} />
        </button>
      </div>
    </div>
  );
};

export default PasswordForm;