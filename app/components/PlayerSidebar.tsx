"use client";

import "./components.css";
import "./PlayerSidebar.css";
import { ChevronFirst, BookOpen, LogOut, Zap, Bookmark, House, Highlighter, Search, LogIn, BadgeQuestionMark, Settings, ShieldQuestionMark, Type } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface PlayerSidebarProps {
  textSize: "small" | "medium" | "large";
  onTextSizeChange: (size: "small" | "medium" | "large") => void;
}

export default function PlayerSidebar({ textSize, onTextSizeChange }: PlayerSidebarProps) {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div className="sidebar sidebar--player sidebar--closed">
      <img className="sidebar__logo" src="/logo.png" alt="Logo" />
      <div className="sidebar__wrapper sidebar__wrapper--player">
        <div className="sidebar__top">
          <Link rel="stylesheet" href="/for-you" className={`sidebar__link--wrapper ${pathname === '/for-you' ? 'sidebar__link--active' : ''}`}>
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><House /></div>
            <div className="sidebar__link--text">For You</div>
          </Link>
          <Link rel="stylesheet" href="/library" className={`sidebar__link--wrapper ${pathname === '/library' ? 'sidebar__link--active' : ''}`}>
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><Bookmark /></div>
            <div className="sidebar__link--text">My Library</div>
          </Link>
          <Link rel="stylesheet" href="/for-you" className="sidebar__link--wrapper sidebar__link--not-allowed" >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><Highlighter /></div>
            <div className="sidebar__link--text">Highlights</div>
          </Link>
          <Link rel="stylesheet" href="/for-you" className="sidebar__link--wrapper sidebar__link--not-allowed" >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><Search /></div>
            <div className="sidebar__link--text">Search</div>
          </Link>

          {/* Text Size Controls */}
          <div className="sidebar__text-size-section">
            <p className="sidebar__text-size-label">Text Size</p>
            <div className="sidebar__text-size-buttons">
              <button
                className={`sidebar__text-size-btn sidebar__text-size-btn--small ${textSize === 'small' ? 'sidebar__text-size-btn--active' : ''}`}
                onClick={() => onTextSizeChange('small')}
                title="Small text"
              >
                A
              </button>
              <button
                className={`sidebar__text-size-btn sidebar__text-size-btn--medium ${textSize === 'medium' ? 'sidebar__text-size-btn--active' : ''}`}
                onClick={() => onTextSizeChange('medium')}
                title="Medium text"
              >
                A
              </button>
              <button
                className={`sidebar__text-size-btn sidebar__text-size-btn--large ${textSize === 'large' ? 'sidebar__text-size-btn--active' : ''}`}
                onClick={() => onTextSizeChange('large')}
                title="Large text"
              >
                A
              </button>
            </div>
          </div>
        </div>

        <div className="sidebar__bottom">
          <Link rel="stylesheet" href="/" className={`sidebar__link--wrapper ${pathname === '/settings' ? 'sidebar__link--active' : ''}`} >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><Settings /></div>
            <div className="sidebar__link--text">Settings</div>
          </Link>
          <Link rel="stylesheet" href="/for-you" className="sidebar__link--wrapper sidebar__link--not-allowed" >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><ShieldQuestionMark/></div>
            <div className="sidebar__link--text">Help</div>
          </Link>
          <Link rel="stylesheet" href="/" className="sidebar__link--wrapper">
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><LogIn /></div>
            <div className="sidebar__link--text">Login</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
