"use client";

import React from 'react'
import LoginModal from './LoginModal';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { isLoggedIn, logout } = useAuth();

  return (
    <div>
      <LoginModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <img className="nav__img" src="/logo.png" alt="logo" />
          </figure>
          <ul className="nav__list--wrapper">
            {isLoggedIn ? (
              <li 
                className="nav__list nav__list--login" 
                onClick={logout}
                style={{ cursor: 'pointer' }}
              >
                Logout
              </li>
            ) : (
              <li className="nav__list nav__list--login" onClick={() => setIsOpen(true)}>
                Login
              </li>
            )}
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
