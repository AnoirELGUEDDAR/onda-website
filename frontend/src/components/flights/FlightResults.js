import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

// Compact source -> build a map once
const AIRLINES = [
  ['AT', 'Royal Air Maroc', 'royal-air-maroc.png'],
  ['3O', 'Air Arabia Maroc', 'air-arabia.png'],
  ['BA', 'British-Airways', 'british-airways.png'],
  ['TB', 'Tuifly', 'tuifly.png'],
  ['AF', 'Air France', 'air-france.png'],
  ['EY', 'Etihad Airways', 'etihad-airways.png'],
  ['IB', 'Iberia', 'iberia.png'],
  ['FR', 'Ryanair', 'ryanair.png'],
  ['TK', 'Turkish Airlines', 'turkish-airlines.png'],
  ['VY', 'Vueling', 'vueling.png'],
  ['QR', 'Qatar Airways', 'qatar-airways.png'],
  ['EK', 'Emirates', 'emirates.png'],
  ['LH', 'Lufthansa', 'lufthansa.png'],
];

const buildAirlineMap = () =>
  Object.fromEntries(
    AIRLINES.map(([code, name, file]) => [code, { name, logo: `/images/airlines/${file}` }])
  );

const pick = (obj, keys) => {
  for (const k of keys) {
    const v = obj?.[k];
    if (v !== undefined && v !== null && v !== '') return v;
  }
  return '';
};

const formatTime = (v, locale) => {
  if (!v) return '';
  const d = new Date(v);
  if (Number.isNaN(+d)) return '';
  return d.toLocaleTimeString(locale, { hour: '2-digit', minute: '2-digit' });
};

const airportDisplay = (city, code) => {
  if (!city && !code) return '';
  if (!city) return code;
  if (!code) return city;
  return `${city} (${code})`;
};

const AirlineCell = ({ airline, fallbackName }) => {
  if (!airline?.logo && !airline?.name && !fallbackName) return <span>N/A</span>;
  return (
    <div className="airline-cell" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      {airline?.logo && (
        <img
          src={airline.logo}
          alt={airline?.name || fallbackName || 'airline'}
          className="airline-logo"
          style={{ width: 150, height: 150, objectFit: 'contain' }}
          onError={(e) => (e.currentTarget.style.display = 'none')}
        />
      )}
      <span>{airline?.name || fallbackName || 'N/A'}</span>
    </div>
  );
};

const HEADERS = [
  'flights.status',
  'flights.flightNumber',
  'flights.via',
  'flights.destination',
  'flights.origin',
  'flights.airline',
  'flights.depart',
  'flights.arrive',
];

const FlightResults = ({ flights, loading, error, searchParams }) => {
  const { t, i18n } = useTranslation();
  const airlineByCode = useMemo(buildAirlineMap, []);
  const locale = i18n.language;

  const now = new Date();
  const formattedDate = now.toLocaleDateString(locale);
  const formattedTime = now.toLocaleTimeString(locale);

  if (loading) return <div className="loading-container">{t('flights.loadingFlights')}</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  const rows = Array.isArray(flights) ? flights : [];

  return (
    <div className="flight-results-container">
      <div className="flights-header">
        <div className="current-time">
          {formattedDate} | {formattedTime}
        </div>
      </div>

      <div className="flight-results-table">
        <table className="flight-table">
          <thead>
            <tr>
              {HEADERS.map((key) => (
                <th key={key}>{t(key)}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((f, idx) => {
                // Normalize once
                const status = pick(f, ['status']) || t('flights.statusScheduled');
                const number = pick(f, ['flight_number', 'flightNumber']) || 'N/A';
                const via = pick(f, ['via']) || t('flights.direct');

                const destCity = pick(f, ['destination_city', 'destinationCity', 'arrivalAirportCity']);
                const destCode = pick(f, ['destination_code', 'destinationCode', 'arrivalAirportCode']);

                const origCity = pick(f, ['origin_city', 'originCity', 'departureAirportCity']);
                const origCode = pick(f, ['origin_code', 'originCode', 'departureAirportCode']);

                const dep = formatTime(pick(f, ['departure_time', 'departureTime']), locale);
                const arr = formatTime(pick(f, ['arrival_time', 'arrivalTime']), locale);

                const airlineFallback = pick(f, ['airline_name', 'airline']) || '';
                const prefix = String(number).slice(0, 2).toUpperCase();
                const airline = airlineByCode[prefix] || null;

                return (
                  <tr key={f.id ?? `${number}-${idx}`}>
                    <td>{status}</td>
                    <td>{number}</td>
                    <td>{via}</td>
                    <td>{airportDisplay(destCity, destCode)}</td>
                    <td>{airportDisplay(origCity, origCode)}</td>
                    <td>
                      <AirlineCell airline={airline} fallbackName={airlineFallback} />
                    </td>
                    <td>{dep}</td>
                    <td>{arr}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={HEADERS.length} className="no-flights">
                  {t('flights.noFlights')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FlightResults;

