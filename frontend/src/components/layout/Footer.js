import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import './Footer.css';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer text-white py-5" style={{ backgroundImage: 'url("/images/backgrounds/footer-bg.jpg")' }}>
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <img src="/images/onda-logo.png" alt={t('app.name')} height="60" className="mb-3" />
            <p className="small">{t('app.fullName')} - Morocco's Airport Authority, managing 25 airports across the kingdom.</p>
            <div className="mt-3">
              <a href="https://www.facebook.com/OFFICENATIONALDESAEROPORTS/" className="text-white me-3"><i className="fab fa-facebook-f"></i></a>
              <a href="https://x.com/ondaofficiel" className="text-white me-3"><i className="fab fa-twitter"></i></a>
              <a href="https://www.instagram.com/ondaeroports/?hl=en" className="text-white me-3"><i className="fab fa-instagram"></i></a>
              <a href="https://www.linkedin.com/company/office-national-des-a%C3%A9roports/posts/?feedView=all" className="text-white"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">{t('footer.quickLinks')}</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/" className="text-white text-decoration-none">{t('nav.home')}</Link></li>
              <li className="mb-2"><Link to="/airports" className="text-white text-decoration-none">{t('nav.airports')}</Link></li>
              <li className="mb-2"><Link to="/flights" className="text-white text-decoration-none">{t('flights.search')}</Link></li>
              <li className="mb-2"><Link to="/about" className="text-white text-decoration-none">{t('nav.about')}</Link></li>
              <li className="mb-2"><Link to="/contact" className="text-white text-decoration-none">{t('nav.contact')}</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">{t('nav.airports')}</h5>
            <ul className="list-unstyled">
              <li className="mb-2"><Link to="/airports/casablanca" className="text-white text-decoration-none">Casablanca (CMN)</Link></li>
              <li className="mb-2"><Link to="/airports/marrakech" className="text-white text-decoration-none">Marrakech (RAK)</Link></li>
              <li className="mb-2"><Link to="/airports/agadir" className="text-white text-decoration-none">Agadir (AGA)</Link></li>
              <li className="mb-2"><Link to="/airports/fes" className="text-white text-decoration-none">Fes (FEZ)</Link></li>
              <li className="mb-2"><Link to="/airports/tangier" className="text-white text-decoration-none">Tangier (TNG)</Link></li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase mb-4">{t('footer.contact')}</h5>
            <p className="small mb-1"><i className="fas fa-map-marker-alt me-2"></i> {t('footer.address')}</p>
            <p className="small mb-1"><i className="fas fa-phone me-2"></i> +212 5 22 53 90 40</p>
            <p className="small mb-3"><i className="fas fa-envelope me-2"></i> contact@onda.ma</p>
            
            <div className="language-switcher mt-4">
              <span className="small d-block mb-2">{t('footer.language')}:</span>
              <LanguageSwitcher variant="buttons" />
            </div>
          </div>
        </div>

        <hr className="my-4" />

        <div className="row align-items-center">
          <div className="col-md-7 small">
            <p className="mb-md-0">© {currentYear} {t('app.fullName')}. {t('footer.rights')}.</p>
          </div>
          <div className="col-md-5 text-md-end small">
            <Link to="/terms" className="text-white text-decoration-none me-3">{t('footer.terms')}</Link>
            <Link to="/privacy" className="text-white text-decoration-none me-3">{t('footer.privacy')}</Link>
            <Link to="/sitemap" className="text-white text-decoration-none">{t('footer.sitemap')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
