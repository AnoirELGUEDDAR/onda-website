import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './components/chatbot/Chatbot';
import ScrollToTop from "./ScrollToTop";
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import AirportList from './components/airports/AirportList';
import AirportDetail from './components/airports/AirportDetail';
import Services from './components/pages/Services';
import FlightPage from './components/flights/FlightPage';
import WeatherPage from './components/pages/WeatherPage';
import NotFound from './components/pages/NotFound';
import AboutPage from './components/pages/AboutPage';
import Contact from './components/pages/Contact';
import LanguageModal from './components/layout/LanguageModal';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import './App.css';
import './rtl.css';
import "./blur.css";

function getModeByTime() {
  const hour = new Date().getHours();
  return (hour >= 7 && hour < 19) ? 'light' : 'dark';
}

function AppContent({ blur }) {
  const { i18n } = useTranslation();
  const [theme, setTheme] = React.useState(getModeByTime());
  const [fadeIn, setFadeIn] = React.useState(false);

  React.useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.body.classList.add(`lang-${i18n.language}`);
    if (i18n.language === 'ar') {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
    }
    return () => {
      document.body.className = document.body.className.replace(/\blang-\w+\b/g, '').trim();
    };
  }, [i18n.language]);

  React.useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setTheme(getModeByTime());
    }, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  React.useEffect(() => {
    const timeout = setTimeout(() => setFadeIn(true), 30);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className={`app-container d-flex flex-column min-vh-100 ${blur ? "blurred-app-content" : ""}`}>
        <Header />
        <div className={`fade-content flex-grow-1 d-flex flex-column${fadeIn ? ' visible' : ''}`}>
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/airports" element={<AirportList />} />
              <Route path="/airports/:id" element={<AirportDetail />} />
              <Route path="/flights" element={<FlightPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/services" element={<Services />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
        <Chatbot />
      </div>
    </Router>
  );
}

AppContent.propTypes = {
  blur: PropTypes.bool,
};

AppContent.defaultProps = {
  blur: false,
};

export default function App() {
  const { i18n } = useTranslation();

  // Show modal if user has NOT explicitly chosen language before
  const showModal = !localStorage.getItem('hasChosenLanguage');

  const handleSelectLanguage = async (lang) => {
    localStorage.setItem('i18nextLng', lang);
    localStorage.setItem('hasChosenLanguage', 'true');
    document.cookie = `i18next=${lang}; path=/;`;
    await i18n.changeLanguage(lang);
  };

  const blur = showModal;

  return (
    <>
      <AppContent blur={blur} />
      <LanguageModal show={showModal} onSelect={handleSelectLanguage} />
    </>
  );
}

