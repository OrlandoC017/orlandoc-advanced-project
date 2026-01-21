// For You Page //

"use client";

import { useEffect, useState } from "react";
import "../for-you/style.css";
import Selected from "../components/recommended";
import LibraryScrollRecommended from "../components/LibraryScroll";
import LibraryScrollSuggested from "../components/LibrarySuggested";
import Searchbar from "../components/searchbar";
import Sidebar from "../components/sidebar";
import { SkeletonForYouPage } from "../components/SkeletonLoader";

export default function page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate data loading - replace with actual API call if needed
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div>
        
        <main>
          <section id="recommended">
            <div className="for-you-container">
              <div className="row">
                <SkeletonForYouPage />
              </div>
            </div>
          </section>
        </main>
      </div>
    );
  }
  
  return (
    <div>
   
      <Sidebar />
      <main>
        <section id="recommended">
          <div className="for-you-container">
            
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
  )
}

