import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './WeatherWidget.css';

const WeatherWidget = ({ city }) => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updateTime, setUpdateTime] = useState(new Date());

  // Replace with your own OpenWeatherMap API key
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY || 'ae6f12542605cd805692f7cb3bc96ecb';

  useEffect(() => {
    if (!city) {
      setLoading(false);
      return;
    }

    setLoading(true);
    axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        q: `${city},MA`,  // MA for Morocco
        units: 'metric',
        appid: API_KEY
      }
    })
    .then(response => {
      setWeather(response.data);
      setUpdateTime(new Date());
      setLoading(false);
    })
    .catch(err => {
      console.error('Weather fetch error:', err);
      setError(t('weather.loadError', 'Could not load weather data'));
      setLoading(false);
    });
  }, [city, t, API_KEY]);

  if (!city) return null;

  if (loading) {
    return (
      <div className="weather-widget">
        <div className="weather-header">
          <h4 className="weather-city-name">{city}</h4>
          <span className="weather-update-time">{t('weather.loading', 'Loading...')}</span>
        </div>
        <div className="weather-content">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">{t('weather.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather-widget">
        <div className="weather-header">
          <h4 className="weather-city-name">{city}</h4>
          <span className="weather-update-time">{t('weather.error', 'Error')}</span>
        </div>
        <div className="weather-content">
          <div className="alert alert-warning py-2 mb-0">
            <i className="fas fa-exclamation-triangle me-2"></i> 
            {error || t('weather.loadError', 'Could not load weather data')}
          </div>
        </div>
      </div>
    );
  }

  // Format weather data
  const temp = Math.round(weather.main.temp);
  const feelsLike = Math.round(weather.main.feels_like);
  const description = weather.weather[0].description;
  const icon = weather.weather[0].icon;
  const humidity = weather.main.humidity;
  const windSpeed = Math.round(weather.wind.speed * 3.6); // Convert m/s to km/h

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h4 className="weather-city-name">{city}</h4>
        <span className="weather-update-time">
          {updateTime.toLocaleTimeString()}
        </span>
      </div>
      <div className="weather-content">
        <div className="weather-main">
          <img 
            src={`https://openweathermap.org/img/wn/${icon}@2x.png`} 
            alt={description} 
            className="weather-icon"
          />
          <span className="weather-temp-large">{temp}°C</span>
        </div>
        <div className="weather-description">{description}</div>
        
        <div className="weather-details">
          <div className="weather-detail-item">
            <i className="fas fa-temperature-high"></i>
            <span>{t('weather.feelsLike', 'Feels like')}</span>
            <strong>{feelsLike}°C</strong>
          </div>
          <div className="weather-detail-item">
            <i className="fas fa-wind"></i>
            <span>{t('weather.wind', 'Wind')}</span>
            <strong>{windSpeed} km/h</strong>
          </div>
          <div className="weather-detail-item">
            <i className="fas fa-tint"></i>
            <span>{t('weather.humidity', 'Humidity')}</span>
            <strong>{humidity}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
