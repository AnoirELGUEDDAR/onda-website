import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import airportService from '../../services/airportService';
import WeatherWidget from '../weather/WeatherWidget';
import WeatherForecast from '../weather/WeatherForecast';
import './AirportDetail.css';

const AirportDetail = () => {
  const [airport, setAirport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAirport = async () => {
      try {
        const data = await airportService.getAirportById(id);
        setAirport(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching airport:', err);
        setError('Could not load airport details. Please try again later.');
        setLoading(false);
      }
    };

    fetchAirport();
  }, [id]);

  if (loading) return <div className="container mt-5 text-center"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;
  if (!airport) return <div className="container mt-5 alert alert-warning">Airport not found</div>;

  // Get airport code in lowercase for image matching
  const airportCode = airport.code ? airport.code.toLowerCase() : 'default';

  return (
    <div className="airport-detail">
      {/* Hero Banner */}
      <div className="position-relative mb-5">
        <img 
          src={`/images/airports/${airportCode}-airport.jpg`} 
          alt={airport.name}
          className="img-fluid w-100"
          style={{ height: '400px', objectFit: 'cover' }}
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-end" 
             style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 70%)' }}>
          <div className="container text-white pb-4">
            <h1 className="display-5 fw-bold">{airport.name}</h1>
            <p className="lead mb-0">
              <img src="/images/icons/map-marker-icon.png" alt="Location" width="20" className="me-2" />
              {airport.city}, Morocco
            </p>
          </div>
        </div>
      </div>

      <div className="container mb-5">
        <div className="row">
          <div className="col-lg-8">
            <section className="airport-info mb-4">
              <h2>About {airport.name}</h2>
              <p className="lead">{airport.description || `${airport.name} is one of Morocco's key airports, serving the ${airport.city} region and connecting travelers to domestic and international destinations.`}</p>
              
              <div className="row mt-4">
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Airport Code</h5>
                      <p className="card-text display-6">{airport.code}</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card mb-3">
                    <div className="card-body">
                      <h5 className="card-title">Location</h5>
                      <p className="card-text">{airport.city}, {airport.country || 'Morocco'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Weather Section - Add this new section */}
            <section className="airport-weather mb-4">
              <h3 className="mb-3">Weather Information</h3>
              <div className="row">
                <div className="col-md-6">
                  <WeatherWidget city={airport.city} />
                </div>
                <div className="col-md-6">
                  <div className="card h-100">
                    <div className="card-body">
                      <h5 className="card-title">Travel Tips</h5>
                      <p className="card-text">Check the weather forecast before your trip to plan accordingly. Morocco has a Mediterranean climate with hot summers and mild winters.</p>
                      <p className="card-text">During summer months (June-August), temperatures can reach 30-40°C (86-104°F), so light clothing is recommended.</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 5-Day Forecast */}
              <WeatherForecast city={airport.city} />
            </section>

            <section className="airport-facilities mb-4">
              {/* Existing facilities section remains unchanged */}
              <h3>Facilities & Services</h3>
              <div className="row mt-3">
                <div className="col-md-6 mb-3">
                  <div className="card h-100">
                    <img src="/images/facilities/check-in-counters.jpg" className="card-img-top facility-img" alt="Check-in Counters" />
                    <div className="card-body">
                      <h5 className="card-title">Check-in Services</h5>
                      <p className="card-text">Modern check-in counters with self-service kiosks for faster processing.</p>
                    </div>
                  </div>
                </div>
                {/* Other facility cards remain unchanged */}
              </div>
            </section>
          </div>

          <div className="col-lg-4">
            <div className="card mb-4 sticky-top" style={{ top: '20px' }}>
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">Flight Information</h5>
              </div>
              <div className="card-body">
                {/* Add weather widget in compact mode to the sidebar */}
                <div className="mb-4">
                  <h6 className="mb-2">Current Weather</h6>
                  <WeatherWidget city={airport.city} compact={true} />
                </div>
                
                <div className="d-grid gap-3">
                  <Link to={`/flights/departures/${id}`} className="btn btn-outline-primary">
                    <img src="/images/icons/departures-icon.png" alt="Departures" width="20" className="me-2" />
                    Departures
                  </Link>
                  <Link to={`/flights/arrivals/${id}`} className="btn btn-outline-primary">
                    <img src="/images/icons/arrivals-icon.png" alt="Arrivals" width="20" className="me-2" />
                    Arrivals
                  </Link>
                </div>
                
                <hr className="my-4" />
                
                <h6 className="mb-3">Terminal Hours</h6>
                <div className="d-flex align-items-center mb-2">
                  <img src="/images/icons/clock-icon.png" alt="Clock" width="18" className="me-2" />
                  <span>Open 24 hours</span>
                </div>
                
                <hr className="my-4" />
                
                <h6 className="mb-3">Customer Service</h6>
                <img src="/images/misc/customer-service.jpg" alt="Customer Service" className="img-fluid rounded mb-3" />
                <p className="small">Need assistance? Our friendly staff is available at information desks throughout the terminal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AirportDetail;
