// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../Contexts/LanguageContext'; // <--- Import useLanguage hook
import '../index.css';

const Navbar = () => {
  const { t, currentLanguage, setLanguage } = useLanguage(); // <--- Use the custom hook
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <NavLink to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          {t('AutoFlow')} {/* TRANSLATED */}
        </NavLink>
        <div className="menu-icon" onClick={toggleMenu}>
          <span>☰</span>
        </div>
        <ul className={isOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? 'nav-links active-pill' : 'nav-links')}
              onClick={toggleMenu}
              end
            >
              {t('home')} {/* TRANSLATED */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/chatbot"
              className={({ isActive }) => (isActive ? 'nav-links active-pill' : 'nav-links')}
              onClick={toggleMenu}
            >
              {t('DA')} {/* TRANSLATED */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/forum"
              className={({ isActive }) => (isActive ? 'nav-links active-pill' : 'nav-links')}
              onClick={toggleMenu}
            >
              {t('Email')} {/* TRANSLATED */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/booking"
              className={({ isActive }) => (isActive ? 'nav-links active-pill' : 'nav-links')}
              onClick={toggleMenu}
            >
              {t('Emotion')} {/* TRANSLATED */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/resources"
              className={({ isActive }) => (isActive ? 'nav-links active-pill' : 'nav-links')}
              onClick={toggleMenu}
            >
              {t('Trend')} {/* TRANSLATED */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/Features"
              className={({ isActive }) => (isActive ? 'nav-links active-pill' : 'nav-links')}
              onClick={toggleMenu}
            >
              {t('WhatApp')} {/* TRANSLATED - NEW */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'nav-links active-pill' : 'nav-links')}
              onClick={toggleMenu}
            >
              {t('login')} {/* TRANSLATED */}
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/admin"
              className={({ isActive }) => (isActive ? 'nav-links active-pill' : 'nav-links')}
              onClick={toggleMenu}
            >
              {t('admin')} {/* TRANSLATED */}
            </NavLink>
          </li>
          {/* Language Selector */}
          <li className="nav-item">
            <select
              className="language-selector"
              value={currentLanguage}
              onChange={handleLanguageChange}
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
            </select>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;