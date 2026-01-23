"use client";

import "./Searchbar.css";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAuth } from "../context/AuthContext";
import LoginModal from "./LoginModal";
import { Menu, X } from "lucide-react";

interface Book {
  id: string;
  title: string;
  author: string;
  imageLink: string;
  subTitle: string;
}

export default function Searchbar() {
  const { isLoggedIn, userEmail, logout, setShowAuthModal } = useAuth();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Book[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchQuery.trim().length > 0) {
        searchBooks(searchQuery);
      } else {
        setSearchResults([]);
        setShowResults(false);
      }
    }, 500); // 500ms debounce delay

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Close search results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const searchBooks = async (search: string) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(search)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }
      const data = await response.json();
      setSearchResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleResultClick = () => {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      sidebar.classList.toggle('sidebar--mobile-open');
    }
  };

  return (
    <div className="wrapper">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
      <div className="search__background">
        <div className="search__wrapper">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="searchbar" ref={searchRef}>
              <svg
                className="search-icon material-symbols-outlined"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#000000"
              >
                <path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" />
              </svg>
              <input
                type="text"
                className="search-input"
                placeholder="Search Books"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery.trim().length > 0 && setShowResults(true)}
              />
              
              {/* Search Results Dropdown */}
              {showResults && (
                <div className="search-results">
                  {isSearching ? (
                    <div className="search-results__loading">Searching...</div>
                  ) : searchResults.length > 0 ? (
                    <>
                      {searchResults.map((book) => (
                        <Link
                          key={book.id}
                          href={`/book/${book.id}`}
                          className="search-results__item"
                          onClick={handleResultClick}
                        >
                          <img
                            src={book.imageLink}
                            alt={book.title}
                            className="search-results__image"
                          />
                          <div className="search-results__info">
                            <div className="search-results__title">{book.title}</div>
                            <div className="search-results__author">{book.author}</div>
                          </div>
                        </Link>
                      ))}
                    </>
                  ) : (
                    <div className="search-results__empty">
                      No books found for "{searchQuery}"
                    </div>
                  )}
                </div>
              )}
            </div>
          </form>
          <button
            className="hamburger-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
            
          </div>
        </div>
      </div>
    
  );
}
