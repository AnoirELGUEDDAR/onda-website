// src/components/flights/FlightSearchForm.js
import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { airportService } from '../../services/api';

const FlightSearchForm = ({ onSearch }) => {
  const { t } = useTranslation();
  const [airports, setAirports] = useState([]);
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // stable min date string (today)
  const todayISO = useMemo(() => new Date().toISOString().split('T')[0], []);

  useEffect(() => {
    setLoading(true);

    airportService
      .getAllAirports()
      .then((response) => {
        setAirports(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(() => {
        setError(t('flights.errorLoadingAirports'));
        setAirports([]);
        setLoading(false);
      });

    setDate(new Date().toISOString().split('T')[0]);
    // eslint-disable-next-line
  }, [t]);

  const optionKey = (a) =>
    String(a?.id ?? a?.code ?? `${a?.city || 'Unknown'}-${a?.name || ''}`);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!departureAirport) {
      setError(t('flights.errorSelectDeparture'));
      return;
    }
    if (!arrivalAirport) {
      setError(t('flights.errorSelectArrival'));
      return;
    }
    if (departureAirport === arrivalAirport) {
      setError(t('flights.errorSameAirport'));
      return;
    }

    setError('');
    onSearch({
      departure: departureAirport,
      arrival: arrivalAirport,
      date,
    });
  };

  if (loading) {
    return <div className="loading">{t('flights.loadingAirports')}</div>;
  }

  return (
    <div className="flight-search-container">
      <h2>{t('flights.searchTitle')}</h2>
      <p>{t('flights.searchDescription')}</p>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="flight-search-form" noValidate>
        <div className="search-fields">
          {/* From */}
          <div className="form-field">
            <label htmlFor="departure">{t('flights.from')}</label>
            <select
              id="departure"
              value={departureAirport}
              onChange={(e) => setDepartureAirport(e.target.value)}
              className="form-control"
              aria-invalid={!!error && !departureAirport}
            >
              <option value="">{t('flights.selectDeparture')}</option>
              {airports.map((airport) => (
                <option key={optionKey(airport)} value={airport.code || ''}>
                  {String(airport.city || 'Unknown')} ({String(airport.code || '???')})
                </option>
              ))}
            </select>
          </div>

          {/* To */}
          <div className="form-field">
            <label htmlFor="arrival">{t('flights.to')}</label>
            <select
              id="arrival"
              value={arrivalAirport}
              onChange={(e) => setArrivalAirport(e.target.value)}
              className="form-control"
              aria-invalid={!!error && !arrivalAirport}
            >
              <option value="">{t('flights.selectArrival')}</option>
              {airports.map((airport) => (
                <option key={optionKey(airport)} value={airport.code || ''}>
                  {String(airport.city || 'Unknown')} ({String(airport.code || '???')})
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="form-field">
            <label htmlFor="date">{t('flights.date')}</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={todayISO}
              className="form-control"
            />
          </div>

          {/* Submit */}
          <div className="form-field button-field">
            <button type="submit" className="search-button btn btn-primary">
              {t('flights.searchButton')}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

FlightSearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default FlightSearchForm;

