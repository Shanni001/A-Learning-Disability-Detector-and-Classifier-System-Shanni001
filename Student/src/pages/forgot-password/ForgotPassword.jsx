import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) setMessage(`Error: ${error.message}`);
    else setMessage('Password reset email sent! Please check your inbox.');

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Forgot Password
      </h2>

      <form onSubmit={handlePasswordReset} className="space-y-4">
        <Input
          type="email"
          label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Sending reset email...' : 'Send Reset Link'}
        </Button>
      </form>

      {message && <p className="text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default ForgotPassword;
