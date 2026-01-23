"use client";

import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import "./LoginModal.css";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();
  const { login, register, loginAsGuest, loginWithGoogle } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await login(email, password);
      // Reset form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      onClose();
      // Redirect to for-you page
      router.push("/for-you");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    try {
      await register(email, password);
      // Reset form
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      onClose();
      // Redirect to for-you page
      router.push("/for-you");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      await loginAsGuest();
      onClose();
      // Redirect to for-you page
      router.push("/for-you");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Guest login failed";
      setError(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      // For demo purposes, create a test Google user
      // In production, you would use @react-oauth/google or Google Sign-In SDK
      const demoEmail = `user-${Date.now()}@gmail.com`;
      const demoName = "Google User";

      // Simulate Google sign-in delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Login with Google
      await loginWithGoogle(demoEmail, demoName);
      setEmail("");
      setPassword("");
      onClose();
      router.push("/for-you");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Google login failed";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="login-modal-overlay" onClick={onClose}>
      <div className="login-modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="login-modal-close" onClick={onClose}>
          ✕
        </button>

        <div className="login-modal-content">
          <h1 className="login-modal-title">
            {isRegistering ? "Create Account" : "Welcome Back"}
          </h1>
          <p className="login-modal-subtitle">
            {isRegistering ? "Join us to get started" : "Sign in to your account"}
          </p>

          {!isRegistering && (
            <>
              {/* Guest Login Button */}
              <button className="login-guest-btn" onClick={handleGuestLogin}>
                Continue as Guest
              </button>

              {/* Divider */}
              <div className="login-divider">
                <span>or</span>
              </div>
            </>
          )}

          {/* Error Message */}
          {error && <div className="login-error-message">{error}</div>}

          {/* Login/Register Form */}
          <form onSubmit={isRegistering ? handleRegister : handleLogin} className="login-form">
            {/* Email Input */}
            <div className="login-form-group">
              <label htmlFor="email" className="login-form-label">
                Email Address
              </label>
              <div className="login-input-wrapper">
                <Mail size={20} className="login-input-icon" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="login-input"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="login-form-group">
              <label htmlFor="password" className="login-form-label">
                Password
              </label>
              <div className="login-input-wrapper">
                <Lock size={20} className="login-input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="password123"
                  className="login-input"
                  required
                />
                <button
                  type="button"
                  className="login-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input (only for registration) */}
            {isRegistering && (
              <div className="login-form-group">
                <label htmlFor="confirm-password" className="login-form-label">
                  Confirm Password
                </label>
                <div className="login-input-wrapper">
                  <Lock size={20} className="login-input-icon" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="password123"
                    className="login-input"
                    required
                  />
                  <button
                    type="button"
                    className="login-toggle-password"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>
            )}

            {/* Remember Me & Forgot Password (only for login) */}
            {!isRegistering && (
              <div className="login-form-footer">
                <label className="login-checkbox">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="login-forgot-password">
                  Forgot password?
                </a>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="login-submit-btn"
              disabled={isLoading}
            >
              {isLoading
                ? isRegistering
                  ? "Creating account..."
                  : "Signing in..."
                : isRegistering
                  ? "Create Account"
                  : "Sign In"}
            </button>
          </form>



          {/* Sign Up/Sign In Link */}
          <p className="login-signup-link">
            {isRegistering ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(false);
                    setError("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  className="login-signup-toggle"
                >
                  Sign in
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegistering(true);
                    setError("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                  }}
                  className="login-signup-toggle"
                >
                  Sign up
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
