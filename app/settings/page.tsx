// Settings Page //

"use client";

import Sidebar from "../components/sidebar";
import Searchbar from "../components/searchbar";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import "./settings.css";

export default function page() {
  const { isLoggedIn, userEmail, userPlan } = useAuth();

  return (
    <div>
      <Sidebar />
      <Searchbar />
      <main>
        <section id="settings" className="settings-section">
          <div className="settings-container">
            <div className="settings-content">
              <h1>Account Settings</h1>

              {isLoggedIn ? (
                <div className="account-info">
                  <div className="account-card">
                    <h2>Account Information</h2>
                    <div className="info-item">
                      <label>Email Address:</label>
                      <p>{userEmail}</p>
                    </div>
                    <div className="info-item">
                      <label>Account Status:</label>
                      <p className={`status-badge status-${userPlan}`}>
                        {userPlan === 'premium' ? 'Premium' : 'Free'}
                      </p>
                    </div>
                  </div>

                  {userPlan === 'free' && (
                    <div className="upgrade-card">
                      <h3>Upgrade to Premium</h3>
                      <p className="upgrade-description">
                        Get unlimited access to all books, ad-free reading, and exclusive features.
                      </p>
                      <Link href="/choose-plan" className="upgrade-button">
                        View Plans
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <div className="not-logged-in">
                  <p>Please log in to view your account settings.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

