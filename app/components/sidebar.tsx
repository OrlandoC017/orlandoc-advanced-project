"use client";

import "./components.css";
import { ChevronFirst, BookOpen, LogOut, Zap, Bookmark, House, Highlighter, Search, LogIn, BadgeQuestionMark, Settings, ShieldQuestionMark} from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const [expanded, setExpanded] = useState(true);
  const pathname = usePathname();

  return (
    <div className="sidebar sidebar--closed">
      <img className="sidebar__logo" src="/logo.png" alt="Logo" />
      <div className="sidebar__wrapper">
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


        </div>

                <div className="sidebar__bottom">
            <Link rel="stylesheet" href="/for-you" className="sidebar__link--wrapper sidebar__link--not-allowed" >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><Settings /></div>
            <div className="sidebar__link--text">Settings</div>
          </Link>
            <Link rel="stylesheet" href="/for-you" className="sidebar__link--wrapper sidebar__link--not-allowed" >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><ShieldQuestionMark/></div>
            <div className="sidebar__link--text">Help & Support</div>
          </Link>
            <Link rel="stylesheet" href="/for-you" className="sidebar__link--wrapper sidebar__link--not-allowed" >
            <div className="sidebar__link--line"></div>
            <div className="sidebar__icon--wrapper"><LogIn /></div>
            <div className="sidebar__link--text">Login</div>
          </Link>
          </div>

      </div>
    </div>
  )
}
