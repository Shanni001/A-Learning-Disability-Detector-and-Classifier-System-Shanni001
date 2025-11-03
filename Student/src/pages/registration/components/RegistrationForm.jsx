// src/pages/registration/components/RegistrationForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../../contexts/AuthContext";
import RoleSelector from './RoleSelector';
import BasicInfoForm from './BasicInfoForm';
import PasswordForm from './PasswordForm';
import StudentFields from './StudentFields';
import TeacherFields from './TeacherFields';
import Button from 'components/ui/Button';
import SocialLoginButtons from 'components/ui/SocialLoginButtons';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const { signUp, signInWithProvider } = useAuth();

  const [role, setRole] = useState('');
  const [formData, setFormData] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setValidationErrors({ confirmPassword: 'Passwords do not match' });
      setLoading(false);
      return;
    }

    try {
      const { email, password, ...rest } = formData;

      // Combine role and form data
      const userData = { role, ...rest };

      // ✅ Correct number of arguments
      await signUp(email, password, userData);

      alert('Registration successful! Please check your email to confirm your account.');

      // Optional redirect (after email confirmation, context will auto-redirect)
      if (role === 'student') navigate('/multi-role-dashboard');
      else if (role === 'teacher') navigate('/dashboard/teacher');
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed: ' + (error.message || 'Unexpected error'));
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      await signInWithProvider(provider);
    } catch (error) {
      alert('Social login failed: ' + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <RoleSelector selectedRole={role} onRoleChange={setRole} />

      {role && (
        <>
          <BasicInfoForm
            formData={formData}
            onFieldChange={handleFieldChange}
            validationErrors={validationErrors}
          />

          <PasswordForm
            formData={formData}
            onFieldChange={handleFieldChange}
            validationErrors={validationErrors}
          />

          {role === 'student' ? (
            <StudentFields
              formData={formData}
              onFieldChange={handleFieldChange}
              validationErrors={validationErrors}
            />
          ) : (
            <TeacherFields
              formData={formData}
              onFieldChange={handleFieldChange}
              validationErrors={validationErrors}
            />
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>

          <SocialLoginButtons onSocialLogin={handleSocialLogin} />
        </>
      )}
    </form>
  );
};

export default RegistrationForm;
