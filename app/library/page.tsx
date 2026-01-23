// Library Page //

"use client";

import Sidebar from "../components/sidebar";
import { BookOpen } from "lucide-react";
import "./style.css";

export default function page() {
  return (
    <div>
      <Sidebar />
      <main>
        <section id="library" className="library-coming-soon">
          <div className="library-coming-soon-container">
            <div className="library-coming-soon-content">
              <BookOpen size={64} className="library-icon" />
              <h1>My Library</h1>
              <p>This feature is coming soon!</p>
              <p className="library-subtitle">
                We're working hard to bring you a personalized library where you can save and organize your favorite books.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

