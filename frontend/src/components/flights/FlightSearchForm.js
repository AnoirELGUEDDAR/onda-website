import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FlightSearchForm = ({ onSearch }) => {
  const [airports, setAirports] = useState([]);
  const [departureAirport, setDepartureAirport] = useState('');
  const [arrivalAirport, setArrivalAirport] = useState('');
  const [date, setDate] = useState('2025-07-04');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/api/airports')
      .then(response => {
        setAirports(Array.isArray(response.data) ? response.data : []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching airports:', error);
        setError('Could not load airports.');
        setAirports([]);
        setLoading(false);
      });
  }, []);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!departureAirport) {
      setError('Please select departure airport');
      return;
    }
    
    if (!arrivalAirport) {
      setError('Please select arrival airport');
      return;
    }
    
    if (departureAirport === arrivalAirport) {
      setError('Departure and arrival airports cannot be the same');
      return;
    }
    
    setError('');
    
    onSearch({
      departure: departureAirport,
      arrival: arrivalAirport,
      date: date
    });
  };
  
  if (loading) {
    return <div className="loading">Loading airports...</div>;
  }
  
  return (
    <div className="flight-search-container">
      <h2>Find Your Flight</h2>
      <p>Search for flights between Morocco's airports</p>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <form onSubmit={handleSubmit} className="flight-search-form">
        <div className="search-fields">
          <div className="form-field">
            <label htmlFor="departure">From</label>
            <select 
              id="departure" 
              value={departureAirport} 
              onChange={(e) => setDepartureAirport(e.target.value)}
              className="form-control"
            >
              <option value="">Select departure airport</option>
              {airports.map(airport => (
                <option key={airport.id || Math.random()} value={airport.code || ''}>
                  {String(airport.city || 'Unknown')} ({String(airport.code || '???')})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-field">
            <label htmlFor="arrival">To</label>
            <select 
              id="arrival" 
              value={arrivalAirport} 
              onChange={(e) => setArrivalAirport(e.target.value)}
              className="form-control"
            >
              <option value="">Select arrival airport</option>
              {airports.map(airport => (
                <option key={airport.id || Math.random()} value={airport.code || ''}>
                  {String(airport.city || 'Unknown')} ({String(airport.code || '???')})
                </option>
              ))}
            </select>
          </div>
          
          <div className="form-field">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="form-control"
            />
          </div>
          
          <div className="form-field button-field">
            <button type="submit" className="search-button btn btn-primary">
              Search Flights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FlightSearchForm;
