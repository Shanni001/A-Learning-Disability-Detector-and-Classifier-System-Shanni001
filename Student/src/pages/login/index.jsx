// src/pages/login/index.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthenticationContainer from 'components/ui/AuthenticationContainer';
import LoginForm from './components/LoginForm';
import WelcomeHeader from './components/WelcomeHeader';
import AuthFooter from './components/AuthFooter';
import { useAuth } from '../../contexts/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithProvider } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (formData) => {
    setLoading(true);
    setError('');

    try {
      const { email, password, role, rememberMe } = formData;

      const { data, error: signInError } = await signIn(email, password);
      if (signInError) throw signInError;

      if (data?.user) {
        // Optional: store remember me flag
        if (rememberMe) {
          localStorage.setItem('ldds_remember', 'true');
        } else {
          localStorage.removeItem('ldds_remember');
        }

        // Optional immediate redirect (context also auto-redirects)
        if (role === 'student') navigate('/dashboard/student');
        else if (role === 'teacher') navigate('/dashboard/teacher');
        else navigate('/');
      }
    } catch (err) {
      console.error('Login error:', err.message);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider) => {
    try {
      setLoading(true);
      await signInWithProvider(provider);
      // Supabase OAuth handles redirect automatically
    } catch (err) {
      console.error('Social login error:', err.message);
      setError(`Failed to sign in with ${provider}. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          <AuthenticationContainer screenType="login">
            <WelcomeHeader />
            <LoginForm
              onSubmit={handleLogin}
              onSocialLogin={handleSocialLogin}
              loading={loading}
              error={error}
            />
            <AuthFooter />
          </AuthenticationContainer>
        </div>
      </div>
    </div>
  );
};

export default Login;
