import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WeatherWidget from '../weather/WeatherWidget';
import { airports } from './AirportList';
import './AirportDetail.css';

const AirportDetail = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const findAirport = () => {
      try {
        console.log("Looking for airport with code:", id);
        console.log("Available airports:", airports);

        const foundAirport = airports.find(a => a.code === id.toUpperCase());
        if (foundAirport) {
          setAirport(foundAirport);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error("Error loading airport details:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    findAirport();
  }, [id]);

  if (loading) {
    return (
        <div className="airport-detail-container">
          <div className="container py-5">
            <div className="loading-indicator text-center">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">{t('common.loading', 'Loading...')}</span>
              </div>
            </div>
          </div>
        </div>
    );
  }

  if (error || !airport) {
    return (
        <div className="airport-detail-container">
          <div className="container py-5">
            <div className="alert alert-danger">
              {t('airports.loadError', 'Could not load airport details. Please try again later.')}
            </div>
            <Link to="/airports" className="btn btn-primary">
              {t('common.backToList', 'Back to Airports')}
            </Link>
          </div>
        </div>
    );
  }

  return (
      <div className="airport-detail-container">
        <div className="container py-5">
          <div className="row">
            <div className="col-lg-8">
              <h1 className="airport-title mb-4 display-5 fw-bold">
                {t(`airports.names.${airport.name}`)}
              </h1>
              <div className="airport-code-location mb-3">
                <span className="airport-code h5 text-primary">{airport.code}</span> -
                <span className="airport-city ms-2 h5">{t(`cities.${airport.city}`)}</span>
              </div>

              <div className="airport-image-main mb-4">
                <img
                    src={airport.image}
                    alt={t(`airports.names.${airport.name}`)}
                    className="img-fluid rounded shadow-sm"
                />
              </div>

              <div className="airport-description mb-5">
                <h2 className="h4 fw-semibold mb-3">{t('airports.about', 'About')}</h2>
                <p className="lead">
                  {t(`airports.descriptions.${airport.code}`, {
                    city: t(`cities.${airport.city}`),
                    type: t(`airports.types.${airport.type}`)
                  })}
                </p>
                <p>
                  {t(`airports.longDescriptions.${airport.code}`, {
                    city: t(`cities.${airport.city}`),
                    defaultValue: t('airports.noDetailedDescription', 'Detailed information about this airport will be available soon.')
                  })}
                </p>
              </div>

              <div className="airport-facilities mb-5">
                <h2 className="h4 fw-semibold mb-4 text-center">{t('airports.facilitiesTitle', 'Facilities & Services')}</h2>
                <div className="row g-4 justify-content-center">
                  <div className="col-lg-4 col-md-6">
                    <div className="card text-center h-100 border-0 shadow-sm p-4">
                      <i className="fas fa-plane-departure fa-3x text-primary mb-3"></i>
                      <h5 className="card-title fw-bold">{t('airports.facilitiesTitle.terminals', 'Passenger Terminals')}</h5>
                      <p className="card-text text-muted">A network of terminals to serve your journey.</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="card text-center h-100 border-0 shadow-sm p-4">
                      <i className="fas fa-shopping-bag fa-3x text-primary mb-3"></i>
                      <h5 className="card-title fw-bold">{t('airports.facilitiesTitle.shops', 'Duty-Free Shops')}</h5>
                      <p className="card-text text-muted">Find exclusive goods and great deals.</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="card text-center h-100 border-0 shadow-sm p-4">
                      <i className="fas fa-utensils fa-3x text-primary mb-3"></i>
                      <h5 className="card-title fw-bold">{t('airports.facilitiesTitle.restaurants', 'Restaurants & Cafés')}</h5>
                      <p className="card-text text-muted">A wide selection of dining options for all tastes.</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="card text-center h-100 border-0 shadow-sm p-4">
                      <i className="fas fa-wifi fa-3x text-primary mb-3"></i>
                      <h5 className="card-title fw-bold">{t('airports.facilitiesTitle.wifi', 'Free Wi-Fi')}</h5>
                      <p className="card-text text-muted">Enjoy fast and reliable internet access.</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="card text-center h-100 border-0 shadow-sm p-4">
                      <i className="fas fa-parking fa-3x text-primary mb-3"></i>
                      <h5 className="card-title fw-bold">{t('airports.facilitiesTitle.parking', 'Parking')}</h5>
                      <p className="card-text text-muted">Short-term and long-term parking available.</p>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <div className="card text-center h-100 border-0 shadow-sm p-4">
                      <i className="fas fa-exchange-alt fa-3x text-primary mb-3"></i>
                      <h5 className="card-title fw-bold">{t('airports.facilitiesTitle.currency', 'Currency Exchange')}</h5>
                      <p className="card-text text-muted">Convenient services for international travelers.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="airport-sidebar">
                <div className="mb-4">
                  <WeatherWidget city={t(`cities.${airport.city}`)} />
                </div>

                <div className="card mb-4 shadow-sm">
                  <div className="card-header bg-primary text-white">
                    <h3 className="h6 mb-0">{t('airports.quickInfo', 'Quick Information')}</h3>
                  </div>
                  <div className="card-body">
                    <div className="info-item mb-2">
                      <div className="info-label fw-bold text-muted">{t('airports.code', 'Airport Code')}</div>
                      <div className="info-value">{airport.code}</div>
                    </div>
                    <div className="info-item mb-2">
                      <div className="info-label fw-bold text-muted">{t('airports.location', 'Location')}</div>
                      <div className="info-value">{t(`cities.${airport.city}`)}</div>
                    </div>
                    <div className="info-item">
                      <div className="info-label fw-bold text-muted">{t('airports.type', 'Type')}</div>
                      <div className="info-value">{t(`airports.types.${airport.type}`)}</div>
                    </div>
                  </div>
                </div>

                <div className="card mb-4 shadow-sm">
                  <div className="card-header  text-white " id="useful_links">
                    <h3 className="h6 mb-0" >{t('airports.links', 'Useful Links')}</h3>
                  </div>
                  <div className="card-body">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        <Link to={`/flights`} className="text-decoration-none">
                          <i className="fas fa-plane me-2"></i> {t('airports.flightSchedules', 'Flight Schedules')}
                        </Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/services" className="text-decoration-none">
                          <i className="fas fa-concierge-bell me-2"></i> {t('airports.services', 'Airport Services')}
                        </Link>
                      </li>
                      <li className="list-group-item">
                        <Link to="/contact" className="text-decoration-none">
                          <i className="fas fa-envelope me-2"></i> {t('airports.contact', 'Contact')}
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="my-4">
            <Link to="/airports" className="btn btn-outline-primary">
              <i className="fas fa-arrow-left me-2"></i> {t('common.backToList', 'Back to Airports')}
            </Link>
          </div>
        </div>
      </div>
  );
};

export default AirportDetail;