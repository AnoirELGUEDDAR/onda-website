import React from 'react';

const FlightCard = ({ flight }) => {
  if (!flight) {
    return null;
  }

  // Format the date and time for display
  const formatTime = (timeString) => {
    try {
      const time = new Date(timeString);
      return time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) {
      return "N/A";
    }
  };
  
  // Calculate flight duration in hours and minutes
  const calculateDuration = (departure, arrival) => {
    try {
      const departureTime = new Date(departure);
      const arrivalTime = new Date(arrival);
      const durationMs = arrivalTime - departureTime;
      const hours = Math.floor(durationMs / (1000 * 60 * 60));
      const minutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
      return `${hours}h ${minutes}m`;
    } catch (e) {
      return "N/A";
    }
  };

  const flightNumber = flight.flight_number || flight.flightNumber || 'N/A';
  const airline = flight.airlineName || flight.airline || 'Air Arabia Maroc';
  const price = flight.price || '1030';
  const departureTime = formatTime(flight.departure_time || flight.departureTime);
  const arrivalTime = formatTime(flight.arrival_time || flight.arrivalTime);
  const departureAirport = flight.departureAirportCode || flight.departure_airport_id || 'N/A';
  const arrivalAirport = flight.arrivalAirportCode || flight.arrival_airport_id || 'N/A';
  const duration = calculateDuration(
    flight.departure_time || flight.departureTime, 
    flight.arrival_time || flight.arrivalTime
  );
  const status = flight.status || 'SCHEDULED';
  const terminal = flight.terminal || '3';
  const gate = flight.gate || '19';

  return (
    <div className="flight-card">
      <div className="flight-header">
        <div className="flight-info-primary">
          <div className="flight-number">Flight {flightNumber}</div>
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
              <div className="flight-type">Direct</div>
            </div>
          </div>
          
          <div className="arrival">
            <div className="time">{arrivalTime}</div>
            <div className="airport">{arrivalAirport}</div>
          </div>
        </div>
        
        <div className="flight-info-secondary">
          <div className="status">Status: {status}</div>
          <div className="terminal">Terminal: {terminal}</div>
          <div className="gate">Gate: {gate}</div>
        </div>
        
        <div className="flight-actions">
          <button className="btn btn-outline-primary">Flight Details</button>
          <button className="btn btn-primary">Select Flight</button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
