import React, { useState, useEffect } from 'react';
import airportService from '../../services/airportService';
import WeatherWidget from '../weather/WeatherWidget';
import './WeatherPage.css';

const WeatherPage = () => {
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
        setError('Could not load airports. Please try again later.');
        setLoading(false);
      }
    };

    fetchAirports();
  }, []);

  if (loading) return <div className="container mt-5 text-center"><div className="spinner-border" role="status"></div></div>;
  if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;

  return (
    <div className="weather-page">
      <div className="weather-hero py-5 text-center" style={{ backgroundImage: 'url("/images/backgrounds/moroccan-pattern.jpg")' }}>
        <div className="container">
          <h1 className="display-4">Airport Weather Information</h1>
          <p className="lead">Current conditions at all Moroccan airports</p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row">
          {airports.map(airport => (
            <div className="col-lg-4 col-md-6 mb-4" key={airport.id}>
              <div className="weather-card">
                <div className="weather-card-header">
                  <h3>{airport.city}</h3>
                  <span>{airport.code}</span>
                </div>
                <div className="weather-card-body">
                  <WeatherWidget city={airport.city} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;
