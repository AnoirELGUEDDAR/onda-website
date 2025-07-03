import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import airportService from '../../services/airportService';
import './FlightSearch.css';

const FlightSearch = () => {
  const [airports, setAirports] = useState([]);
  const [fromAirport, setFromAirport] = useState('');
  const [toAirport, setToAirport] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAirports = async () => {
      try {
        const data = await airportService.getAllAirports();
        setAirports(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching airports:', err);
        setError('Could not load airports. Please try again later.');
        setLoading(false);
      }
    };

    fetchAirports();

    // Set default date to today
    const today = new Date();
    setDate(today.toISOString().split('T')[0]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/flights/results?from=${fromAirport}&to=${toAirport}&date=${date}`);
  };

  return (
    <div className="flight-search">
      {/* Hero Banner */}
      <div className="position-relative mb-5">
        <img 
          src="/images/plane-takeoff-banner.jpg" 
          alt="Flight Search"
          className="img-fluid w-100"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" 
             style={{ background: 'rgba(0,0,0,0.5)' }}>
          <div className="container text-white text-center">
            <h1 className="display-4 fw-bold">Find Your Flight</h1>
            <p className="lead">Search for flights between Morocco's airports</p>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card shadow search-card">
              <div className="card-body p-4">
                {loading ? (
                  <div className="text-center"><div className="spinner-border" role="status"></div></div>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-5 mb-3">
                        <label htmlFor="fromAirport" className="form-label">From</label>
                        <select 
                          id="fromAirport" 
                          className="form-select" 
                          value={fromAirport} 
                          onChange={(e) => setFromAirport(e.target.value)}
                          required
                        >
                          <option value="">Select departure airport</option>
                          {airports.map(airport => (
                            <option key={airport.id} value={airport.id}>
                              {airport.city} ({airport.code})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-5 mb-3">
                        <label htmlFor="toAirport" className="form-label">To</label>
                        <select 
                          id="toAirport" 
                          className="form-select" 
                          value={toAirport} 
                          onChange={(e) => setToAirport(e.target.value)}
                          required
                        >
                          <option value="">Select arrival airport</option>
                          {airports.map(airport => (
                            <option key={airport.id} value={airport.id}>
                              {airport.city} ({airport.code})
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-2 mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                          type="date"
                          id="date"
                          className="form-control"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="d-grid mt-3">
                      <button type="submit" className="btn btn-primary btn-lg">
                        Search Flights
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info Cards Section */}
      <section className="info-cards py-5" style={{ backgroundImage: 'url("/images/backgrounds/moroccan-pattern.png")' }}>
        <div className="container">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100 info-card">
                <div className="card-body text-center p-4">
                  <img src="/images/icons/clock-icon.png" alt="Clock" className="info-icon mb-3" />
                  <h5 className="card-title">Flight Schedule</h5>
                  <p className="card-text">Check the latest departure and arrival times for all Moroccan airports.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 info-card">
                <div className="card-body text-center p-4">
                  <img src="/images/icons/info-icon.png" alt="Information" className="info-icon mb-3" />
                  <h5 className="card-title">Travel Information</h5>
                  <p className="card-text">Get useful tips and information for your journey through our airports.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-4">
              <div className="card h-100 info-card">
                <div className="card-body text-center p-4">
                  <img src="/images/icons/language-icon.png" alt="Languages" className="info-icon mb-3" />
                  <h5 className="card-title">Multi-language Support</h5>
                  <p className="card-text">Our services are available in Arabic, French, and English.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="window-view py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h3>Morocco from Above</h3>
              <p className="lead">Experience the beauty of Morocco's diverse landscapes from your plane window.</p>
              <p>From the Atlas Mountains to the Atlantic coastline, each flight offers spectacular views of the kingdom's natural beauty.</p>
            </div>
            <div className="col-md-6">
              <img src="/images/misc/plane-window-view.jpg" alt="View from plane window" className="img-fluid rounded shadow" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FlightSearch;
