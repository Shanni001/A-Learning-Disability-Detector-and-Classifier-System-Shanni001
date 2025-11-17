import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const API_BASE_URL = "http://127.0.0.1:8000/api/auth";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // ✅ Listen to Supabase Auth changes
  useEffect(() => {
  const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      const metadata = session.user.user_metadata || {};

      setUser({
        id: session.user.id,
        email: session.user.email,
        full_name: metadata.fullName || metadata.full_name || "",
        role: metadata.role || "",
        phone: metadata.phone || "",
        school: metadata.school || ""
      });
    } else {
      setUser(null);
    }
  });

  return () => authListener.subscription.unsubscribe();
}, []);


  // ✅ SIGN UP
  // src/contexts/AuthContext.jsx

  

const signUp = async (email, password, userData) => {
  try {
    // Step 1️⃣: Create the user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData, // store metadata too
      },
    });

    if (error) throw error;

    const supabaseUser = data.user;

    // Step 2️⃣: Save full user profile in backend (linked to auth.users)
    await axios.post("http://localhost:8000/api/auth/register", {
      id: supabaseUser?.id,
      email,
      password,
      role: userData.role,
      full_name: userData.fullName,
      phone: userData.phone,
      school: userData.school,
      age: userData.age,
      parent_name: userData.parentName,
      parent_phone: userData.parentPhone,
      teacher_id: userData.teacherId,
      primary_subject: userData.primarySubject,
      //grade_levels: userData.gradeLevels || [],
      grade_levels: Array.isArray(userData.gradeLevels)
      ? userData.gradeLevels
      : (userData.gradeLevels ? [userData.gradeLevels] : []),
      experience: userData.experience,
    });

    alert("✅ Registration successful! Check your email to confirm your account.");
  } catch (error) {
    console.error("❌ Registration error:", error);
    alert("Registration failed: " + (error.response?.data?.detail || error.message));
  }
};



  // ✅ SIGN IN
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      setUser(data.user);
      alert("✅ Login successful!");
      navigate("/multi-role-dashboard");
    } catch (error) {
      console.error("❌ Login error:", error);
      alert(error.message || "Login failed.");
    }
  };

  // ✅ GOOGLE LOGIN
  const signInWithProvider = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({ provider });
      if (error) throw error;
    } catch (error) {
      console.error("❌ Social login error:", error);
      alert(error.message);
    }
  };

  // ✅ LOGOUT
  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, signUp, signIn, signInWithProvider, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
