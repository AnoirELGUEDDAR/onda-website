import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Header.css';

const Header = () => {
  const { t } = useTranslation();

  return (
    <header>
      <div className="top-bar py-2 bg-dark text-white">
        <div className="container d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <small className="me-3"><i className="fas fa-phone me-2"></i>+212 5 22 53 90 40</small>
            <small><i className="fas fa-envelope me-2"></i>contact@onda.ma</small>
          </div>
          <div className="d-flex align-items-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src="/images/onda-logo.png" alt={t('app.name')} height="40" className="me-2" />
            <span className="d-none d-md-inline">{t('app.name')}</span>
          </Link>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarMain" aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" exact="true" to="/">{t('nav.home')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/airports">{t('nav.airports')}</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/flights">
                  {t('nav.flights')}
                </NavLink>
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
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
