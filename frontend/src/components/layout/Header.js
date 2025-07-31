import React, { useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const logoRef = useRef();

  // Function to trigger rotation
  const triggerLogoRotation = () => {
    if (logoRef.current) {
      logoRef.current.classList.remove('rotate360');
      // Force reflow to restart animation if clicked rapidly
      // eslint-disable-next-line
      void logoRef.current.offsetWidth;
      logoRef.current.classList.add('rotate360');
    }
  };

  // Rotate every minute
  useEffect(() => {
    const interval = setInterval(triggerLogoRotation, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
      <header className="header-wrapper">
        <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
          <div className="container-fluid px-4">
            {/* Logo on the left */}
            <Link
                className="navbar-brand d-flex align-items-center"
                to="/"
                onClick={e => {
                  triggerLogoRotation();
                  // normal navigation continues
                }}
                style={{ cursor: "pointer" }}
            >
              <img
                  ref={logoRef}
                  src="/images/ondanew.png"
                  alt={t('app.fullName')}
                  height="125"
                  width="200"
                  className="me-2 logo-img"
                  draggable={false}
              />
              <span className="navbar-title d-none d-md-inline">{t('app.fullName')}</span>
            </Link>

            {/* Mobile toggle button */}
            <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarMain"
                aria-controls="navbarMain"
                aria-expanded="false"
                aria-label={t('menu.toggle')}
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            {/* Nav and Language switcher */}
            <div className="collapse navbar-collapse justify-content-end" id="navbarMain">
              <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
                <li className="nav-item">
                  <NavLink className="nav-link" exact="true" to="/">
                    {t('nav.home')}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/airports">
                    {t('nav.airports')}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/flights">
                    {t('nav.flights')}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/services">
                    {t('nav.services')}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">
                    {t('nav.about')}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contact">
                    {t('nav.contact')}
                  </NavLink>
                </li>
              </ul>

              {/* Language Switcher to the far right */}
              <div className="ms-3 d-flex align-items-center">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </nav>
      </header>
  );
};

export default Header;
