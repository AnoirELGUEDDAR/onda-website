import React, { useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();
  const logoRef = useRef(null);
  const navbarCollapseRef = useRef(null);

  // Trigger logo rotation without using `void`
  const triggerLogoRotation = () => {
    const logo = logoRef.current;
    if (!logo) return;
    logo.classList.remove('rotate360');
    // Force reflow to restart animation
    logo.getBoundingClientRect();
    logo.classList.add('rotate360');
  };

  // Close the expanded navbar on link click (mobile)
  const handleNavLinkClick = () => {
    const el = navbarCollapseRef.current;
    const Collapse = window.bootstrap?.Collapse;

    if (el?.classList?.contains('show') && Collapse) {
      const bsCollapse = new Collapse(el, { toggle: false });
      bsCollapse?.hide?.();
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
            onClick={() => {
              triggerLogoRotation();
              handleNavLinkClick();
            }}
            style={{ cursor: 'pointer' }}
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
            <span className="navbar-title d-none d-md-inline">
              {t('app.fullName')}
            </span>
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
          <div
            ref={navbarCollapseRef}
            className="collapse navbar-collapse justify-content-end"
            id="navbarMain"
          >
            <ul className="navbar-nav align-items-center mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/" onClick={handleNavLinkClick}>
                  {t('nav.home')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/airports" onClick={handleNavLinkClick}>
                  {t('nav.airports')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/flights" onClick={handleNavLinkClick}>
                  {t('nav.flights')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/services" onClick={handleNavLinkClick}>
                  {t('nav.services')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/about" onClick={handleNavLinkClick}>
                  {t('nav.about')}
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/contact" onClick={handleNavLinkClick}>
                  {t('nav.contact')}
                </NavLink>
              </li>
            </ul>

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

