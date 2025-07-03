import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './WeatherWidget.css';

const WeatherWidget = ({ city, compact = false }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { t, i18n } = useTranslation();
  
  // API key
  const apiKey = "ae6f12542605cd805692f7cb3bc96ecb";

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true);
        console.log(`Fetching weather for ${city}...`);
        
        // Direct API call to OpenWeatherMap
        // Set language param based on current language selection
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},ma&units=metric&lang=${i18n.language}&appid=${apiKey}`
        );
        
        if (!response.ok) {
          throw new Error(`API returned ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Weather data received:', data);
        setWeather(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching weather for ${city}:`, err);
        setError(`Could not load weather for ${city}`);
      } finally {
        setLoading(false);
      }
    };

    if (city) {
      fetchWeather();
    }
  }, [city, apiKey, i18n.language]); // Re-fetch when language changes

  // Loading state
  if (loading) {
    return (
      <div className={`weather-widget ${compact ? 'weather-widget-compact' : ''}`}>
        <div className="weather-loading p-3 text-center">
          <div className="spinner-border spinner-border-sm text-primary" role="status"></div>
          <span className="ms-2">Loading weather...</span>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !weather) {
    return (
      <div className={`weather-widget ${compact ? 'weather-widget-compact' : ''}`}>
        <div className="weather-error p-3 text-center">
          <i className="fas fa-exclamation-triangle text-warning me-2"></i>
          {error}
          <div className="mt-2">
            <small>Try refreshing the page</small>
          </div>
        </div>
      </div>
    );
  }

  // Helper function for weather icon
  const getWeatherIconUrl = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  // Format date and time based on user's language
  const updateTime = new Date(weather.dt * 1000);
  const formattedTime = updateTime.toLocaleTimeString(i18n.language, {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Get weather icon
  const iconUrl = getWeatherIconUrl(weather.weather[0].icon);

  if (compact) {
    return (
      <div className="weather-widget weather-widget-compact">
        <div className="weather-compact-content">
          <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon-small" />
          <div className="weather-compact-info">
            <div className="weather-temp">{Math.round(weather.main.temp)}°C</div>
            <div className="weather-city">{city}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h5 className="weather-city-name">
          <i className="fas fa-map-marker-alt me-2"></i> 
          {city} {t('weather.title').split(' ')[0]}
        </h5>
        <span className="weather-update-time">{t('weather.updated')} {formattedTime}</span>
      </div>
      
      <div className="weather-content">
        <div className="weather-main">
          <img src={iconUrl} alt={weather.weather[0].description} className="weather-icon" />
          <div className="weather-temp-large">{Math.round(weather.main.temp)}°C</div>
        </div>
        
        <div className="weather-description">
          {weather.weather[0].description}
        </div>
        
        <div className="weather-details">
          <div className="weather-detail-item">
            <i className="fas fa-temperature-high"></i>
            <span>{t('weather.feelsLike')}: {Math.round(weather.main.feels_like)}°C</span>
          </div>
          <div className="weather-detail-item">
            <i className="fas fa-wind"></i>
            <span>{t('weather.wind')}: {Math.round(weather.wind.speed * 3.6)} km/h</span>
          </div>
          <div className="weather-detail-item">
            <i className="fas fa-tint"></i>
            <span>{t('weather.humidity')}: {weather.main.humidity}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;
