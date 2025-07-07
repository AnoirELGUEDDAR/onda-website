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
        // Log for debugging
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
          <div className="loading-indicator">
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
            <h1 className="airport-title mb-3">
              {t(`airports.names.${airport.name}`)}
            </h1>
            <div className="airport-code-location mb-4">
              <span className="airport-code">{airport.code}</span> - 
              <span className="airport-city ms-2">{t(`cities.${airport.city}`)}</span>
            </div>

            <div className="airport-image-main mb-4">
              <img 
                src={airport.image} 
                alt={t(`airports.names.${airport.name}`)}
                className="img-fluid rounded shadow"
              />
            </div>

            <div className="airport-description mb-4">
              <h2>{t('airports.about', 'About')}</h2>
              <p className="lead">
                {t(`airports.descriptions.${airport.code}`, {
                  city: t(`cities.${airport.city}`),
                  type: t(`airports.types.${airport.type}`)
                })}
              </p>
              <p>{t(`airports.longDescriptions.${airport.code}`, {
                city: t(`cities.${airport.city}`),
                defaultValue: t('airports.noDetailedDescription', 'Detailed information about this airport will be available soon.')
              })}</p>
            </div>

            <div className="airport-facilities mb-4">
              <h2>{t('airports.facilitiesTitle', 'Facilities & Services')}</h2>
              <div className="row">
                <div className="col-md-6">
                  <div className="facility-item">
                    <i className="fas fa-plane-departure me-2"></i>
                    <span>{t('airports.facilitiesTitle.terminals', 'Passenger Terminals')}</span>
                  </div>
                  <div className="facility-item">
                    <i className="fas fa-shopping-bag me-2"></i>
                    <span>{t('airports.facilitiesTitle.shops', 'Duty-Free Shops')}</span>
                  </div>
                  <div className="facility-item">
                    <i className="fas fa-utensils me-2"></i>
                    <span>{t('airports.facilitiesTitle.restaurants', 'Restaurants & Cafés')}</span>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="facility-item">
                    <i className="fas fa-wifi me-2"></i>
                    <span>{t('airports.facilitiesTitle.wifi', 'Free Wi-Fi')}</span>
                  </div>
                  <div className="facility-item">
                    <i className="fas fa-parking me-2"></i>
                    <span>{t('airports.facilitiesTitle.parking', 'Parking')}</span>
                  </div>
                  <div className="facility-item">
                    <i className="fas fa-exchange-alt me-2"></i>
                    <span>{t('airports.facilitiesTitle.currency', 'Currency Exchange')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
            <div className="airport-sidebar">
              {/* Weather Widget - No need for card wrapper, the widget has its own styling */}
              <div className="mb-4">
                <WeatherWidget city={t(`cities.${airport.city}`)} />
              </div>

              <div className="card mb-4">
                <div className="card-header">
                  <h3 className="h5 mb-0">{t('airports.quickInfo', 'Quick Information')}</h3>
                </div>
                <div className="card-body">
                  <div className="info-item">
                    <div className="info-label">{t('airports.code', 'Airport Code')}</div>
                    <div className="info-value">{airport.code}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">{t('airports.location', 'Location')}</div>
                    <div className="info-value">{t(`cities.${airport.city}`)}</div>
                  </div>
                  <div className="info-item">
                    <div className="info-label">{t('airports.type', 'Type')}</div>
                    <div className="info-value">{t(`airports.types.${airport.type}`)}</div>
                  </div>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header">
                  <h3 className="h5 mb-0">{t('airports.links', 'Useful Links')}</h3>
                </div>
                <div className="card-body">
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      <Link to={`/flights/${airport.code}`} className="text-decoration-none">
                        <i className="fas fa-plane me-2"></i> {t('airports.flightSchedules', 'Flight Schedules')}
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/transportation" className="text-decoration-none">
                        <i className="fas fa-bus me-2"></i> {t('airports.transportation', 'Transportation')}
                      </Link>
                    </li>
                    <li className="list-group-item">
                      <Link to="/services" className="text-decoration-none">
                        <i className="fas fa-concierge-bell me-2"></i> {t('airports.services', 'Airport Services')}
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
