import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';

const AuthCallback = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const handleSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error('OAuth error:', error.message);
        navigate('/login');
        return;
      }

      if (data.session) {
        console.log('OAuth sign-in successful:', data.session.user);
        navigate('/multi-role-dashboard'); // or redirect by role
      } else {
        navigate('/login');
      }
    };

    handleSession();
  }, [navigate, user]);

  return (
    <div className="flex items-center justify-center h-screen text-lg">
      Signing you in with Google...
    </div>
  );
};

export default AuthCallback;
