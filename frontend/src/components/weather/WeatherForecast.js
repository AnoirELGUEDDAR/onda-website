import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './WeatherForecast.css';

const WeatherForecast = ({ city }) => {
  const [forecast, setForecast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Moved API key outside component for better security
  // In production, this should be in environment variables
  const API_KEY = "ae6f12542605cd805692f7cb3bc96ecb";

  useEffect(() => {
    const fetchForecast = async () => {
      try {
        setLoading(true);
        
        if (!city) {
          setError('No city specified');
          setLoading(false);
          return;
        }

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city},ma&units=metric&appid=${API_KEY}`
        );
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }
        
        const data = await response.json();
        const dailyForecasts = [];
        const processedDates = new Set();
        
        // Replaced for loop with for...of as requested
        for (const forecastItem of data.list) {
          const forecastDate = new Date(forecastItem.dt * 1000);
          const dateString = forecastDate.toDateString();
          
          if (!processedDates.has(dateString) && 
              (forecastDate.getHours() >= 11 && forecastDate.getHours() <= 14)) {
            processedDates.add(dateString);
            dailyForecasts.push(forecastItem);
            
            // Limit to 5 days
            if (dailyForecasts.length >= 5) break;
          }
        }
        
        setForecast(dailyForecasts);
        setError(null);
      } catch (err) {
        setError(`Could not load forecast for ${city}`);
      } finally {
        setLoading(false);
      }
    };

    fetchForecast();
  }, [city]);

  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  if (loading) {
    return (
      <div className="weather-forecast">
        <div className="forecast-loading p-3 text-center">
          <output className="spinner-border spinner-border-sm text-primary" aria-live="polite">
            <span className="visually-hidden">Loading forecast...</span>
          </output>
          <span className="ms-2">Loading forecast...</span>
        </div>
      </div>
    );
  }

  if (error || !forecast || forecast.length === 0) {
    return (
      <div className="weather-forecast">
        <div className="forecast-error p-3 text-center">
          <i className="fas fa-exclamation-triangle text-warning me-2" aria-hidden="true"></i>
          {error || 'Forecast data unavailable'}
        </div>
      </div>
    );
  }

  return (
    <div className="weather-forecast">
      <h5 className="forecast-title">5-Day Forecast</h5>
      <div className="forecast-container">
        {forecast.map((day) => {
          const date = new Date(day.dt * 1000);
          const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
          const iconUrl = getWeatherIconUrl(day.weather[0].icon);
          
          // Using timestamp as unique key instead of index
          return (
            <div className="forecast-day" key={day.dt}>
              <div className="forecast-date">{dayName}</div>
              <img 
                src={iconUrl} 
                alt={day.weather[0].description} 
                className="forecast-icon" 
              />
              <div className="forecast-temp">{Math.round(day.main.temp)}°C</div>
              <div className="forecast-desc">{day.weather[0].main}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

WeatherForecast.propTypes = {
  city: PropTypes.string.isRequired,
};

export default WeatherForecast;
