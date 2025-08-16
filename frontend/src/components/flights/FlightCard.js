import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const FlightCard = ({ flight }) => {
  const { t, i18n } = useTranslation();
  if (!flight) return null;

  // Helpers
  const formatTime = (timeString) => {
    if (!timeString) return 'N/A';
    const d = new Date(timeString);
    if (Number.isNaN(d.getTime())) return 'N/A';
    return d.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });
  };

  const calculateDuration = (departure, arrival) => {
    if (!departure || !arrival) return 'N/A';
    const dep = new Date(departure);
    const arr = new Date(arrival);
    if (Number.isNaN(dep.getTime()) || Number.isNaN(arr.getTime())) return 'N/A';
    const ms = arr - dep;
    if (ms < 0) return 'N/A';
    const hours = Math.floor(ms / 36e5);
    const minutes = Math.floor((ms % 36e5) / 6e4);
    return `${hours}h ${minutes}m`;
  };

  // Read with fallbacks
  const flightNumber = flight.flight_number || flight.flightNumber || 'N/A';
  const airline = flight.airline_name || flight.airlineName || flight.airline || 'N/A';
  const priceVal = flight.price;
  const price =
    priceVal === undefined || priceVal === null || priceVal === ''
      ? '—'
      : `${priceVal} MAD`;

  const depRaw = flight.departure_time || flight.departureTime;
  const arrRaw = flight.arrival_time || flight.arrivalTime;
  const departureTime = formatTime(depRaw);
  const arrivalTime = formatTime(arrRaw);

  const departureAirport =
    flight.departureAirportCode || flight.departure_airport_id || 'N/A';
  const arrivalAirport =
    flight.arrivalAirportCode || flight.arrival_airport_id || 'N/A';

  const duration = calculateDuration(depRaw, arrRaw);
  const status = flight.status || t('flights.statusScheduled');
  const terminal = flight.terminal ?? 'N/A';
  const gate = flight.gate ?? 'N/A';

  return (
    <div className="flight-card">
      <div className="flight-header">
        <div className="flight-info-primary">
          <div className="flight-number">
            {t('flights.flightLabel', { number: flightNumber })}
          </div>
          <div className="airline">{airline}</div>
        </div>
        <div className="flight-price">{price}</div>
      </div>

      <div className="flight-details">
        <div className="flight-times">
          <div className="departure">
            <div className="time">{departureTime}</div>
            <div className="airport">{departureAirport}</div>
          </div>

          <div className="flight-duration">
            <div className="duration-time">{duration}</div>
            <div className="flight-line">
              <hr />
              <div className="flight-type">{t('flights.direct')}</div>
            </div>
          </div>

          <div className="arrival">
            <div className="time">{arrivalTime}</div>
            <div className="airport">{arrivalAirport}</div>
          </div>
        </div>

        <div className="flight-info-secondary">
          <div className="status">{t('flights.statusLabel', { status })}</div>
          <div className="terminal">{t('flights.terminalLabel', { terminal })}</div>
          <div className="gate">{t('flights.gateLabel', { gate })}</div>
        </div>

        <div className="flight-actions">
          <button className="btn btn-outline-primary">{t('flights.details')}</button>
          <button className="btn btn-primary">{t('flights.select')}</button>
        </div>
      </div>
    </div>
  );
};

FlightCard.propTypes = {
  flight: PropTypes.shape({
    // identifiers
    flight_number: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    flightNumber: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    // airline
    airline_name: PropTypes.string,
    airlineName: PropTypes.string,
    airline: PropTypes.string,

    // price
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),

    // times
    departure_time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    departureTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    arrival_time: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    arrivalTime: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),

    // airports
    departureAirportCode: PropTypes.string,
    departure_airport_id: PropTypes.string,
    arrivalAirportCode: PropTypes.string,
    arrival_airport_id: PropTypes.string,

    // misc
    status: PropTypes.string,
    terminal: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    gate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  }),
};

FlightCard.defaultProps = {
  flight: null,
};

export default FlightCard;

