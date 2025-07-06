import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();

  return (
      <header className="header-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container d-flex justify-content-between align-items-center">
            {/* Logo */}
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src="/images/onda-logo.png" alt={t('app.fullName')} height="100" className="me-2" />
              <span className="d-none d-md-inline">{t('app.fullName')}</span>
            </Link>

            {/* Mobile Toggle */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarMain"
                aria-controls="navbarMain"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Navigation and Language Switcher */}
            <div className="collapse navbar-collapse justify-content-end align-items-center" id="navbarMain">
              <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center">
                <li className="nav-item">
                  <NavLink className="nav-link" exact="true" to="/">{t('nav.home')}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/airports">{t('nav.airports')}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/flights">{t('nav.flights')}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/services">{t('nav.services')}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">{t('nav.about')}</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">{t('nav.contact')}</NavLink>
                </li>
              </ul>
              {/* Language Switcher */}
              <div className="language-switcher ms-3">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </nav>
      </header>
  );
};

export default Header;
