import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './components/pages/Home';
import AirportList from './components/airports/AirportList';
import AirportDetail from './components/airports/AirportDetail';
import Services from './components/pages/Services';
import FlightPage from './components/flights/FlightPage'; // Singular, matching your file name
import WeatherPage from './components/pages/WeatherPage';
import NotFound from './components/pages/NotFound';
import AboutPage from './components/pages/AboutPage';

// Import CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './index.css';
import './App.css';
import './rtl.css';  // Import RTL support styles

function App() {
  const { i18n } = useTranslation();
  
  // Set initial direction based on language
  useEffect(() => {
    document.documentElement.dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.language;
    document.body.classList.add(`lang-${i18n.language}`);
    
    // Add Arabic font if needed
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
  
  return (
    <Router>
      <div className="app-container d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/airports" element={<AirportList />} />
            <Route path="/airports/:id" element={<AirportDetail />} />
            <Route path="/flights" element={<FlightPage />} /> {/* Using singular FlightPage */}
            <Route path="/weather" element={<WeatherPage />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
