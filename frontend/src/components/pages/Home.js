import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FAQ from '../FAQ/FAQ';
import '../FAQ/FAQ.css';
import WeatherWidget from '../weather/WeatherWidget';
import './Home.css';


const Home = () => {
  const { t } = useTranslation();

  // Airport data with both city and airport code
  const featuredAirports = [
    { city: 'casablanca', code: 'CMN' },
    { city: 'marrakech', code: 'RAK' },
    { city: 'rabat', code: 'RBA' },
    { city: 'tangier', code: 'TNG' }
  ];

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
        <section className="featured-airports py-5" style={{backgroundColor:'white'}}>
          <div className="container-fluid px-4">            <h2 className="text-center mb-5">{t('airports.major')}</h2>
            <div className="row">
              {featuredAirports.map(airport => (
                  <div className="col-6 col-md-3 mb-4" key={airport.city}>
                    <div className="card h-100 airport-card">
                      <img
                          src={`/images/airports/${airport.city}-airport.jpg`}
                          className="card-img-top"
                          alt={t(`cities.${airport.city}`)}
                          style={{ width:'100%',height: '100%', objectFit: 'cover' }}
                      />
                      <div className="card-body">
                        {/* Use translation for city name */}
                        <h5 className="card-title">{t(`cities.${airport.city}`)}</h5>
                        {/* Fixed: Use airport CODE instead of city name in URL */}
                        <Link to={`/airports/${airport.code}`} className="btn btn-sm btn-outline-primary">
                          {t('airports.viewDetails')}
                        </Link>
                      </div>
                    </div>
                  </div>
              ))}
            </div>

            {/* See More Button */}
            <div className="text-center mt-4">
              <Link to="/airports" className="btn btn-primary" id="see_more_btn">
                {t('airports.seeMore', 'See More Airports')}
              </Link>
            </div>
          </div>
        </section>

        {/* Weather Section */}
        <section className="weather-section py-5" id="WEATHERSection">
          <div className="container-fluid px-4" id="WEATHERcontainer">
            <h2 className="text-center mb-5">{t('weather.title')}</h2>
            <div className="row g-4">
              {[t('cities.casablanca'), t('cities.marrakech'), t('cities.rabat'), t('cities.tangier')].map((city, i) => (
                  <div
                      key={city}
                      className="col-12 col-sm-6 col-lg-3 fade-up"
                      style={{ animationDelay: `${i * 0.2}s` }}
                  >
                    <WeatherWidget city={city} />
                  </div>
              ))}
            </div>
          </div>
        </section>



        {/* Services Showcase */}
<section className="services-showcase py-5" style={{ backgroundColor: 'white' }}>
  <div className="container-fluid px-5 mt-5">
    <h2 className="text-center mb-5">{t('home.services')}</h2>
    <div className="row">
      {[{
        img: '/images/facilities/check-in-counters.jpg',
        title: t('home.checkIn'),
        desc: t('home.checkInDesc')
      }, {
        img: '/images/facilities/duty-free-shopping.jpg',
        title: t('home.shopping'),
        desc: t('home.shoppingDesc')
      }, {
        img: '/images/facilities/airport-restaurant.jpg',
        title: t('home.dining'),
        desc: t('home.diningDesc')
      },
      ].map((service, index) => (
        <div
          key={index}
          className="col-lg-4 col-md-6 d-flex fade-up"
          style={{ animationDelay: `${index * 0.2}s` }}
        >
          <Link to="/services" className="text-decoration-none text-dark w-100">
            <div className="card service-card w-100 h-100">
              <img
                src={service.img}
                className="card-img-top"
                alt={service.title}
                style={{ height: '300px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{service.title}</h5>
                <p className="card-text">{service.desc}</p>
              </div>
            </div>
          </Link>
        </div>
      ))}
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
                <Link to="/airports" className="btn btn-primary">{t('airports.explore')}</Link>
              </div>
              <div className="col-md-6">
                <img src="/images/misc/morocco-map.png" alt="Morocco Airports Map" className="img-fluid rounded shadow" />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FAQ />

      </div>
  );
};

export default Home;