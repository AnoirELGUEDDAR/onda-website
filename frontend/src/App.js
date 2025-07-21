import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Chatbot from './components/chatbot/Chatbot';
import { useTranslation } from 'react-i18next';
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
// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import './App.css';
import './rtl.css';

function getModeByTime() {
  const hour = new Date().getHours();
  return (hour >= 7 && hour < 19) ? 'light' : 'dark';
}

function App() {
  const { i18n } = useTranslation();
  const [theme, setTheme] = useState(getModeByTime());

  // Apply RTL, language and font logic
  useEffect(() => {
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
      document.body.className = document.body.className
        .replace(/\blang-\w+\b/g, '')
        .trim();
    };
  }, [i18n.language]);

  // Add dark/light mode class to <body>
  useEffect(() => {
    document.body.classList.remove('light-mode', 'dark-mode');
    document.body.classList.add(`${theme}-mode`);
  }, [theme]);

  // Update theme if system time changes
  useEffect(() => {
    const interval = setInterval(() => {
      setTheme(getModeByTime());
    }, 30 * 60 * 1000); // Check every 30 minutes
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/airports" element={<AirportList />} />
            <Route path="/airports/:id" element={<AirportDetail />} />
            <Route path="/flights" element={<FlightPage />} />
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <Chatbot /> {/* Chatbot visible on every page */}
      </div>
    </Router>
  );
}

export default App;
