import React from 'react';
import { useTranslation } from 'react-i18next';

const airlineDataByCode = {
  'AT': {
    name: 'Royal Air Maroc',
    logo: '/images/airlines/royal-air-maroc.png'
  },
  '3O': {
    name: 'Air Arabia Maroc',
    logo: '/images/airlines/air-arabia.png'
  },
  //je vais ajouter les autres apres
};

function getAirlineInfo(flight) {
  let code = '';
  const flightNumber = flight.flight_number || flight.flightNumber || '';
  if (flightNumber.length >= 2) {
    code = flightNumber.substring(0, 2).toUpperCase();
  }
  if (airlineDataByCode[code]) return airlineDataByCode[code];
  // fallback: match by airline name
  const known = Object.values(airlineDataByCode).find(a =>
      a.name === (flight.airline_name || flight.airline || ''));
  return known || {};
}

const formatTime = (dateStr, i18n) => {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (isNaN(d)) return '';
  return d.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });
};

const FlightResults = ({ flights, loading, error, searchParams }) => {
  const { t, i18n } = useTranslation();
  const currentTime = new Date();
  const formattedDate = currentTime.toLocaleDateString(i18n.language);

  if (loading) {
    return <div className="loading-container">{t('flights.loadingFlights')}</div>;
  }
  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }
  const flightArray = Array.isArray(flights) ? flights : [];

  const airportDisplay = (city, code) => {
    if (!city && !code) return '';
    if (!city && code) return code;
    if (city && !code) return city;
    return `${city} (${code})`;
  };

  return (
      <div className="flight-results-container">
        <div className="flights-header">
          <div className="current-time">
            {formattedDate} | {currentTime.toLocaleTimeString()}
          </div>
        </div>
        <div className="flight-results-table">
          <table className="flight-table">
            <thead>
            <tr>
              <th>{t('flights.status')}</th>
              <th>{t('flights.flightNumber')}</th>
              <th>{t('flights.via')}</th>
              <th>{t('flights.destination')}</th>
              <th>{t('flights.origin')}</th>
              <th>{t('flights.airline')}</th>
              <th>{t('flights.depart')}</th>
              <th>{t('flights.arrive')}</th>
            </tr>
            </thead>
            <tbody>
            {flightArray.length > 0 ? (
                flightArray.map((flight, index) => {
                  // Find airline info (logo, name)
                  const airlineInfo = getAirlineInfo(flight);
                  const destination = airportDisplay(
                      flight.destination_city || flight.destinationCity || flight.arrivalAirportCity,
                      flight.destination_code || flight.destinationCode || flight.arrivalAirportCode
                  );
                  const origin = airportDisplay(
                      flight.origin_city || flight.originCity || flight.departureAirportCity,
                      flight.origin_code || flight.originCode || flight.departureAirportCode
                  );
                  const depTime = formatTime(flight.departure_time || flight.departureTime, i18n);
                  const arrTime = formatTime(flight.arrival_time || flight.arrivalTime, i18n);

                  return (
                      <tr key={flight.id || index}>
                        <td>{flight.status || t('flights.statusScheduled')}</td>
                        <td>{flight.flight_number || flight.flightNumber || 'N/A'}</td>
                        <td>{flight.via || t('flights.direct')}</td>
                        <td>{destination}</td>
                        <td>{origin}</td>
                        <td className="airline-cell">
                          {airlineInfo.logo && (
                              <img
                                  src={airlineInfo.logo}
                                  alt={airlineInfo.name}
                                  className="airline-logo"
                                  style={{ width: 32, height: 32, objectFit: 'contain', marginRight: 8 }}
                                  onError={e => e.target.style.display = 'none'}
                              />
                          )}
                          <span>{airlineInfo.name || flight.airline_name || flight.airline || 'N/A'}</span>
                        </td>
                        <td>{depTime}</td>
                        <td>{arrTime}</td>
                      </tr>
                  );
                })
            ) : (
                <tr>
                  <td colSpan="8" className="no-flights">{t('flights.noFlights')}</td>
                </tr>
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default FlightResults;