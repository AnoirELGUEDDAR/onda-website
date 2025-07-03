import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WeatherWidget from '../weather/WeatherWidget';
import './Home.css';

const Home = () => {
  const { t } = useTranslation();
  
  // City codes array (keep these the same for image paths and routing)
  const cityCodes = ['casablanca', 'marrakech', 'rabat', 'tangier'];

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section position-relative">
        <img 
          src="/images/airport-hero.jpg" 
          alt={t('home.welcome')} 
          className="img-fluid w-100" 
          style={{ maxHeight: '600px', objectFit: 'cover' }} 
        />
        <div className="hero-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center">
          <div className="container text-white">
            <h1 className="display-4 fw-bold">{t('home.welcome')}</h1>
            <p className="lead">{t('home.tagline')}</p>
            <Link to="/airports" className="btn btn-primary btn-lg mt-3">
              {t('airports.explore')}
            </Link>
          </div>
        </div>
      </div>

      {/* Featured Airports Section */}
      <section className="featured-airports py-5">
        <div className="container">
          <h2 className="text-center mb-5">{t('airports.major')}</h2>
          <div className="row">
            {cityCodes.map(city => (
              <div className="col-md-3 mb-4" key={city}>
                <div className="card h-100 airport-card">
                  <img 
                    src={`/images/airports/${city}-airport.jpg`} 
                    className="card-img-top" 
                    alt={t(`cities.${city}`)}
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                  <div className="card-body">
                    {/* Use translation for city name */}
                    <h5 className="card-title">{t(`cities.${city}`)}</h5>
                    <Link to={`/airports/${city}`} className="btn btn-sm btn-outline-primary">
                      {t('airports.viewDetails')}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* See More Button */}
          <div className="text-center mt-4">
            <Link to="/airports" className="btn btn-primary">
              {t('airports.seeMore', 'See More Airports')}
            </Link>
          </div>
        </div>
      </section>
      
      {/* Weather Section */}
      <section className="weather-section py-5 bg-light">
        <div className="container">
          <h2 className="text-center mb-4">{t('weather.title')}</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <WeatherWidget city={t('cities.casablanca')} />
            </div>
            <div className="col-md-4 mb-4">
              <WeatherWidget city={t('cities.marrakech')} />
            </div>
            <div className="col-md-4 mb-4">
              <WeatherWidget city={t('cities.tangier')} />
            </div>
          </div>
        </div>
      </section>
      
      {/* Services Showcase */}
      <section className="services-showcase py-5" style={{ backgroundImage: 'url("/images/backgrounds/light-texture-bg.jpg")' }}>
        <div className="container">
          <h2 className="text-center mb-5">{t('home.services')}</h2>
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img src="/images/facilities/check-in-counters.jpg" className="card-img-top" alt={t('home.checkIn')} />
                <div className="card-body">
                  <h5 className="card-title">{t('home.checkIn')}</h5>
                  <p className="card-text">{t('home.checkInDesc')}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img src="/images/facilities/duty-free-shopping.jpg" className="card-img-top" alt={t('home.shopping')} />
                <div className="card-body">
                  <h5 className="card-title">{t('home.shopping')}</h5>
                  <p className="card-text">{t('home.shoppingDesc')}</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img src="/images/facilities/airport-restaurant.jpg" className="card-img-top" alt={t('home.dining')} />
                <div className="card-body">
                  <h5 className="card-title">{t('home.dining')}</h5>
                  <p className="card-text">{t('home.diningDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h2>{t('home.network')}</h2>
              <p className="lead">{t('home.networkDesc')}</p>
              <p>{t('home.networkText')}</p>
              <Link to="/airports" className="btn btn-primary">{t('airports.viewDetails')}</Link>
            </div>
            <div className="col-md-6">
              <img src="/images/misc/morocco-map.png" alt="Morocco Airports Map" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
