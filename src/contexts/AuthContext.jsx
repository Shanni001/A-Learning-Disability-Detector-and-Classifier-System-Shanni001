// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  // Load session on startup
  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data?.session?.user) {
        setUser(data.session.user);
        fetchUserProfile(data.session.user.id);
      }
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchUserProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  // Fetch profile from DB
  const fetchUserProfile = async (userId) => {
    const { data, error } = await supabase
      .from('user_profiles') // ✅ changed here
      .select('*')
      .eq('id', userId)
      .single();

    if (!error && data) {
      setProfile(data);
      // Auto-redirect to correct dashboard
      if (data.role === 'student') navigate('/dashboard/student');
      else if (data.role === 'teacher') navigate('/dashboard/teacher');
    }
  };

  // Sign up new user
  const signUp = async (email, password, profileData) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          role: profileData.role,
          fullName: profileData.fullName, // ✅ make sure this matches your trigger
        },
      },
    });

    if (error) throw error;

    const user = data.user;
    if (!user) throw new Error('No user returned from Supabase.');

    // Insert into user_profiles manually (only if your trigger isn’t handling it)
    const { error: insertError } = await supabase.from('user_profiles').insert([
      {
        id: user.id,
        role: profileData.role,
        full_name: profileData.fullName,
        email,
        phone: profileData.phone,
        age: profileData.age || null,
        school: profileData.school || null,
        parent_name: profileData.parentName || null,
        parent_phone: profileData.parentPhone || null,
        teacher_id: profileData.teacherId || null,
        primary_subject: profileData.primarySubject || null,
        grade_levels: profileData.gradeLevels || null,
        experience: profileData.experience || null,
      },
    ]);

    if (insertError) throw insertError;

    setUser(user);
    setProfile(profileData);
  };

  // Sign in
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    setUser(data.user);
    fetchUserProfile(data.user.id);
  };

  // Social login (Google, Apple, etc.)
  const signInWithProvider = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) throw error;
  };

  // Logout
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        signUp,
        signIn,
        signInWithProvider,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
