import React from 'react';
import { useTranslation } from 'react-i18next';

const FlightCard = ({ flight }) => {
  const { t, i18n } = useTranslation();
  if (!flight) return null;

  // Helper functions
  const formatTime = (timeString) => {
    try {
      const time = new Date(timeString);
      return time.toLocaleTimeString(i18n.language, { hour: '2-digit', minute: '2-digit' });
    } catch {
      return "N/A";
    }
  };

  const calculateDuration = (departure, arrival) => {
    try {
      const departureTime = new Date(departure);
      const arrivalTime = new Date(arrival);
      const durationMs = arrivalTime - departureTime;
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } catch {
      return "N/A";
    }
  };

  const flightNumber = flight.flight_number || flight.flightNumber || 'N/A';
  const airline = flight.airline_name || flight.airlineName || flight.airline || 'N/A';
  const price = flight.price || 'N/A';
  const departureTime = formatTime(flight.departure_time || flight.departureTime);
  const arrivalTime = formatTime(flight.arrival_time || flight.arrivalTime);
  const departureAirport = flight.departureAirportCode || flight.departure_airport_id || 'N/A';
  const arrivalAirport = flight.arrivalAirportCode || flight.arrival_airport_id || 'N/A';
  const duration = calculateDuration(
      flight.departure_time || flight.departureTime,
      flight.arrival_time || flight.arrivalTime
  );
  const status = flight.status || t('flights.statusScheduled');
  const terminal = flight.terminal || 'N/A';
  const gate = flight.gate || 'N/A';

  return (
      <div className="flight-card">
        <div className="flight-header">
          <div className="flight-info-primary">
            <div className="flight-number">{t('flights.flightLabel', { number: flightNumber })}</div>
            <div className="airline">{airline}</div>
          </div>
          <div className="flight-price">{price} MAD</div>
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

export default FlightCard;