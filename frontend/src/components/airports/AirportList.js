import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import airportService from '../../services/airportService';

const AirportList = () => {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await airportService.getAllAirports();
        setAirports(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching airports:', err);
        setError('Failed to load airports. Please try again later.');
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

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
    <div className="airport-list">
      <h1 className="mb-4">Morocco Airports</h1>
      
      <div className="row">
        {airports.map(airport => (
          <div key={airport.id} className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100">
              <img 
                src={airport.imageUrl || "/images/airports/default-airport.jpg"} 
                className="card-img-top" 
                alt={airport.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{airport.name}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{airport.code} - {airport.city}</h6>
                <p className="card-text">{airport.description?.substring(0, 100)}...</p>
              </div>
              <div className="card-footer bg-white">
                <Link to={`/airports/${airport.id}`} className="btn btn-primary">
                  View Details
                </Link>
                <Link 
                  to={`/flights/search?airportId=${airport.id}`} 
                  className="btn btn-outline-secondary ms-2"
                >
                  Flight Info
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AirportList;
