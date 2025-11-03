import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import Button from 'components/ui/Button';
import Input from 'components/ui/Input';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Supabase automatically handles the access_token via the URL

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setMessage("Passwords don't match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) setMessage(`Error: ${error.message}`);
    else {
      setMessage('Password updated successfully!');
      setTimeout(() => navigate('/login'), 2000);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white shadow-md rounded-lg p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-center text-gray-800">
        Reset Your Password
      </h2>

      <form onSubmit={handlePasswordUpdate} className="space-y-4">
        <Input
          type="password"
          label="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />

        <Button type="submit" fullWidth disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </Button>
      </form>

      {message && <p className="text-center text-sm text-gray-600">{message}</p>}
    </div>
  );
};

export default ResetPassword;
