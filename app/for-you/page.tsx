// For You Page //

"use client";

import { useEffect, useState } from "react";
import "../for-you/style.css";
import Selected from "../components/recommended";
import LibraryScrollRecommended from "../components/LibraryScroll";
import LibraryScrollSuggested from "../components/LibrarySuggested";
import Searchbar from "../components/searchbar";
import Sidebar from "../components/sidebar";
import LoginModal from "../components/LoginModal";
import { SkeletonSelectedBook, SkeletonBooksSection } from "../components/SkeletonLoader";
import { useAuth } from "../context/AuthContext";

export default function page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  if (!isLoggedIn) {
    return (
      <div>
        <main>
          <section id="recommended">
            <div className="for-you-container">
              <div className="login-placeholder">
                <div className="login-placeholder-content">
                  <h2>Welcome to the "For You" book hub.</h2>
                  <p>Sign in to discover personalized book recommendations tailored just for you.</p>
                  <button 
                    className="login-placeholder-btn"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Sign In
                  </button>
                </div>
              </div>
            </div>
          </section>
        </main>
        <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
    );
  }
  
  return (
    <div>
      <main>
        <section id="recommended">
          <div className="for-you-container">
            <div className="for-you-section">
              <Selected />
            </div>
            
            <div className="for-you-section">
              <LibraryScrollRecommended />
            </div>

            <div className="for-you-section">
              <LibraryScrollSuggested />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

