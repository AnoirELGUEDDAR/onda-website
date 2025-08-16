import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import FlightSearchForm from './FlightSearchForm';
import FlightResults from './FlightResults';
import './flights.css';
import { airportService } from '../../services/api';

/* ---------------------- Helpers (flat, reusable) ---------------------- */

const toArray = (data) => (Array.isArray(data) ? data : []);

const sortAirportsByCity = (list) =>
  [...list].sort((a, b) => (a?.city || '').localeCompare(b?.city || ''));

const findAirportByCodeOrId = (airports, codeOrId) =>
  airports.find((a) => a.code === codeOrId || a.id === codeOrId);

const guessAirlineNameByFlightNumber = (flightNumber, t) => {
  if (!flightNumber || String(flightNumber).length < 2) return undefined;
  const prefix = String(flightNumber).substring(0, 2);
  return t(`airlines.${prefix}`, {
    defaultValue: t('airlines.default', { prefix }),
  });
};

const normalizeFlight = (flight, airports, params, t) => {
  const flightNumber = flight.flight_number || flight.flightNumber;

  // Match departure/arrival airport by id or explicit search params as fallback
  const depAirport =
    findAirportByCodeOrId(airports, flight.departure_airport_id) ||
    findAirportByCodeOrId(airports, params.departure);

  const arrAirport =
    findAirportByCodeOrId(airports, flight.arrival_airport_id) ||
    findAirportByCodeOrId(airports, params.arrival);

  const airlineNameExplicit =
    flight.airline_name || flight.airlineName || flight.airline;

  const airline_name =
    airlineNameExplicit || guessAirlineNameByFlightNumber(flightNumber, t);

  return {
    ...flight,
    airline_name,
    origin_code: depAirport?.code || flight.origin_code || params.departure,
    origin_city: depAirport?.city || flight.origin_city,
    destination_code:
      arrAirport?.code || flight.destination_code || params.arrival,
    destination_city: arrAirport?.city || flight.destination_city,
  };
};

const normalizeFlightsResponse = (data, airports, params, t) =>
  toArray(data).map((flight) => normalizeFlight(flight, airports, params, t));

/* ------------------------------ Component ----------------------------- */

const FlightPage = () => {
  const { t, i18n } = useTranslation();
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [searched, setSearched] = useState(false);
  const [airports, setAirports] = useState([]);
  const [searchParams, setSearchParams] = useState(null);

  // Load airports (flat: async/await + helpers)
  useEffect(() => {
    (async () => {
      try {
        const response = await airportService.getAllAirports();
        const list = toArray(response?.data);
        if (list.length) {
          const sorted = sortAirportsByCity(list);
          setAirports(sorted);
          // Optional log for visibility
          // eslint-disable-next-line no-console
          console.log(t('flight.airportsLoaded', { count: sorted.length }));
        } else {
          // eslint-disable-next-line no-console
          console.warn(t('flight.invalidAirportData'));
        }
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(t('flight.airportLoadError'), e);
      }
    })();
  }, [t]);

  // Search handler (flat)
  const handleSearch = async (params) => {
    setLoading(true);
    setSearched(true);
    setError('');
    setSearchParams(params);

    try {
      const response = await axios.get('/api/flights/search', {
        params: {
          departure: params.departure,
          arrival: params.arrival,
          date: params.date,
        },
      });

      const processed = normalizeFlightsResponse(
        response?.data,
        airports,
        params,
        t
      );

      setFlights(processed);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(t('flight.searchError'), e);
      setError(t('flight.searchErrorMessage'));
      setFlights([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container py-4 ${i18n.language === 'ar' ? 'rtl' : ''}`}>
      <h2 className="mb-4">{t('flight.title')}</h2>

      <FlightSearchForm onSearch={handleSearch} airports={airports} />

      {searched && (
        <FlightResults
          flights={flights}
          loading={loading}
          error={error}
          searchParams={searchParams}
        />
      )}
    </div>
  );
};

export default FlightPage;

