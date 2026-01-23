"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  userPlan: 'free' | 'premium';
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  loginAsGuest: () => Promise<void>;
  loginWithGoogle: (email: string, name: string) => Promise<void>;
  logout: () => void;
  showAuthModal: boolean;
  setShowAuthModal: (show: boolean) => void;
  upgradeToPremium: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Dummy credentials for guest login
const GUEST_EMAIL = "guest@gmail.com";

// Simulated user database (will be updated with new registrations)
let USERS_DATABASE: Record<string, string> = {
  "guest@gmail.com": "password123",
  "user@example.com": "password123",
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [userPlan, setUserPlan] = useState<'free' | 'premium'>('free');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Load auth state from localStorage on mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("userEmail");
    const savedLoginState = localStorage.getItem("isLoggedIn");

    if (savedEmail && savedLoginState === "true") {
      setUserEmail(savedEmail);
      setIsLoggedIn(true);
      const plan = savedEmail === "user@example.com" ? 'premium' : 'free';
      setUserPlan(plan);
    }
  }, []);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string): boolean => {
    return password.length >= 6;
  };

  const login = async (email: string, password: string): Promise<void> => {
    // Validate email
    if (!validateEmail(email)) {
      throw new Error("Invalid email");
    }

    // Validate password length
    if (!validatePassword(password)) {
      throw new Error("Short password");
    }

    // Check if user exists and password is correct
    if (!USERS_DATABASE[email]) {
      throw new Error("User not found");
    }

    if (USERS_DATABASE[email] !== password) {
      throw new Error("Invalid password");
    }

    // Successful login
    setUserEmail(email);
    setIsLoggedIn(true);
    const plan = email === 'user@example.com' ? 'premium' : 'free';
    setUserPlan(plan);
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userPlan", plan);
  };

  const register = async (email: string, password: string): Promise<void> => {
    // Validate email
    if (!validateEmail(email)) {
      throw new Error("Invalid email");
    }

    // Validate password length
    if (!validatePassword(password)) {
      throw new Error("Password must be at least 6 characters");
    }

    // Check if user already exists
    if (USERS_DATABASE[email]) {
      throw new Error("Email already registered");
    }

    // Add new user to database
    USERS_DATABASE[email] = password;

    // Automatically log in after successful registration
    setUserEmail(email);
    setIsLoggedIn(true);
    setUserPlan('free');
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userPlan", "free");
  };

  const loginAsGuest = async (): Promise<void> => {
    setUserEmail(GUEST_EMAIL);
    const plan = 'free';
    setUserPlan(plan);
    setIsLoggedIn(true);
    localStorage.setItem("userEmail", GUEST_EMAIL);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userPlan", plan);
  };

  const loginWithGoogle = async (email: string, name: string): Promise<void> => {
    // Validate email
    if (!validateEmail(email)) {
      throw new Error("Invalid email from Google");
    }

    // Successful login with Google
    setUserEmail(email);
    setIsLoggedIn(true);
    // Google login is always free user unless they upgrade
    setUserPlan('free');
    localStorage.setItem("userEmail", email);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userPlan", "free");
  };

  const logout = (): void => {
    setUserEmail(null);
    setIsLoggedIn(false);
    setUserPlan('free');
    localStorage.removeItem("userEmail");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userPlan");
  };

  const upgradeToPremium = (): void => {
    setUserPlan('premium');
    localStorage.setItem("userPlan", "premium");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userEmail,
        userPlan,
        login,
        register,
        loginAsGuest,
        loginWithGoogle,
        logout,
        showAuthModal,
        setShowAuthModal,
        upgradeToPremium,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
