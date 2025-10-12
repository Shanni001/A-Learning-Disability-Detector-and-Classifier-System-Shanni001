import React, { useState } from 'react';
import Input from 'components/ui/Input';
import Button from 'components/ui/Button';
import Select from 'components/ui/Select';
import { Checkbox } from 'components/ui/Checkbox';
import Icon from 'components/AppIcon';
import SocialAuth from './SocialAuth';
import { useNavigate } from 'react-router-dom';
import { supabase } from 'lib/supabase'; // ✅ Add this import

const LoginForm = ({ onSubmit, onSocialLogin, loading, error }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const navigate = useNavigate();

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'teacher', label: 'Teacher' }
  ];

  // ✅ Validate form before submit
  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errors.email = 'Please enter a valid email address';

    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6)
      errors.password = 'Password must be at least 6 characters';

    if (!formData.role) errors.role = 'Please select your role';

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // ✅ Handle input changes
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (validationErrors[field])
      setValidationErrors((prev) => ({ ...prev, [field]: '' }));
  };

  // ✅ Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) onSubmit(formData);
  };

  // ✅ Forgot password logic
  const handleForgotPassword = async () => {
    if (!formData.email) {
      alert('Please enter your email first.');
      return;
    }

    const { error } = await supabase.auth.resetPasswordForEmail(formData.email, {
      redirectTo: 'http://localhost:4028/reset-password', // ⚙️ change if deployed
    });

    if (error) {
      alert(`Error: ${error.message}`);
    } else {
      alert('Password reset email sent! Please check your inbox.');
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600 text-sm font-medium">{error}</p>
          </div>
        )}

        <Input
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          error={validationErrors.email}
        />

        <div className="relative">
          <Input
            label="Password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={(e) => handleInputChange('password', e.target.value)}
            error={validationErrors.password}
          />
          <button
            type="button"
            className="absolute right-3 top-9 text-muted-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>

        <Select
          label="I am a"
          options={roleOptions}
          value={formData.role}
          onChange={(val) => handleInputChange('role', val)}
          error={validationErrors.role}
        />

        <div className="flex items-center justify-between">
          <Checkbox
            label="Remember me"
            checked={formData.rememberMe}
            onChange={(e) =>
              handleInputChange('rememberMe', e.target.checked)
            }
          />

          {/* ✅ Updated Forgot Password button */}
          <button
            type="button"
            className="text-sm text-primary hover:underline"
            onClick={handleForgotPassword}
          >
            Forgot password?
          </button>
        </div>

        <Button type="submit" fullWidth loading={loading}>
          Sign In
        </Button>

        {/* ✅ Social Auth buttons (Google, Apple, Microsoft) */}
        <SocialAuth onSocialLogin={onSocialLogin} loading={loading} />
      </form>
    </div>
  );
};

export default LoginForm;
