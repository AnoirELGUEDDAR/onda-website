import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import flightService from '../../services/flightService';
import airportService from '../../services/airportService';

const FlightResults = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  
  const airportId = searchParams.get('airportId');
  const searchType = searchParams.get('type') || 'departures';
  const date = searchParams.get('date') || new Date().toISOString().split('T')[0];
  
  const [flights, setFlights] = useState([]);
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!airportId) {
        setError('Airport ID is required');
        setLoading(false);
        return;
      }
      
      try {
        // Fetch airport details
        const airportData = await airportService.getAirportById(airportId);
        setAirport(airportData);
        
        // Fetch flights based on search type
        let flightData;
        if (searchType === 'departures') {
          flightData = await flightService.getDepartures(airportId, date);
        } else {
          flightData = await flightService.getArrivals(airportId, date);
        }
        
        setFlights(flightData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load flight information. Please try again later.');
        setLoading(false);
      }
    };

    fetchData();
  }, [airportId, searchType, date]);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'ON_TIME':
        return <span className="badge bg-success">On Time</span>;
      case 'DELAYED':
        return <span className="badge bg-warning text-dark">Delayed</span>;
      case 'BOARDING':
        return <span className="badge bg-info">Boarding</span>;
      case 'CANCELLED':
        return <span className="badge bg-danger">Cancelled</span>;
      case 'LANDED':
        return <span className="badge bg-primary">Landed</span>;
      case 'SCHEDULED':
        return <span className="badge bg-secondary">Scheduled</span>;
      default:
        return <span className="badge bg-light text-dark">{status}</span>;
    }
  };
  
  const formatTime = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  return (
    <div className="flight-results">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h1 className="mb-1">
            {searchType === 'departures' ? 'Departures from ' : 'Arrivals to '} 
            {airport?.name}
          </h1>
          <p className="text-muted">
            {airport?.code} - {airport?.city} | {new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <Link to="/flights/search" className="btn btn-outline-primary">
          <i className="fas fa-search me-2"></i>New Search
        </Link>
      </div>
      
      {flights.length === 0 ? (
        <div className="alert alert-info" role="alert">
          No flights found for the selected criteria.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>Flight</th>
                <th>{searchType === 'departures' ? 'Destination' : 'Origin'}</th>
                <th>Scheduled Time</th>
                <th>Status</th>
                <th>Terminal</th>
                <th>Gate</th>
                <th>Airline</th>
                <th>Aircraft</th>
              </tr>
            </thead>
            <tbody>
              {flights.map(flight => (
                <tr key={flight.id}>
                  <td className="fw-bold">{flight.flightNumber}</td>
                  <td>
                    {searchType === 'departures' 
                      ? `${flight.destinationAirport?.city} (${flight.destinationAirport?.code})` 
                      : `${flight.originAirport?.city} (${flight.originAirport?.code})`
                    }
                  </td>
                  <td>
                    {searchType === 'departures' 
                      ? formatTime(flight.scheduledDepartureTime)
                      : formatTime(flight.scheduledArrivalTime)
                    }
                  </td>
                  <td>{getStatusBadge(flight.status)}</td>
                  <td>{flight.terminal || 'N/A'}</td>
                  <td>{flight.gate || 'N/A'}</td>
                  <td>{flight.airline}</td>
                  <td>{flight.aircraftType}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FlightResults;
