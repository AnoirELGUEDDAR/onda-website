import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './WeatherWidget.css';

// Move API key outside the component so it's not a useEffect dependency
const API_KEY = 'ae6f12542605cd805692f7cb3bc96ecb';

const WeatherWidget = ({ city }) => {
  const { t } = useTranslation();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!city) {
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    let retryCount = 0;
    const fetchWeather = () => {
      axios
        .get('https://api.openweathermap.org/data/2.5/weather', {
          params: { q: `${city},MA`, units: 'metric', appid: API_KEY },
        })
        .then((response) => {
          if (!cancelled) {
            setWeather(response.data);
            setLoading(false);
          }
        })
        .catch((err) => {
          if (retryCount < 1) {
            retryCount += 1;
            setTimeout(fetchWeather, 800);
          } else if (!cancelled) {
            console.error('Weather fetch error:', err);
            setError(t('weather.loadError', 'Could not load weather data'));
            setLoading(false);
          }
        });
    };

    fetchWeather();
    return () => {
      cancelled = true;
    };
  }, [city, t]);

  if (!city) return null;

  if (loading) {
    return (
      <div className="weather-widget">
        <div className="weather-header">
          <h4 className="weather-city-name">{city}</h4>
        </div>
        <div className="weather-content">
          <output className="spinner-border text-primary" aria-live="polite">
            <span className="visually-hidden">{t('weather.loading', 'Loading…')}</span>
          </output>
        </div>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="weather-widget">
        <div className="weather-header">
          <h4 className="weather-city-name">{city}</h4>
        </div>
        <div className="weather-content">
          <div className="alert alert-warning py-2 mb-0">
            <i className="fas fa-exclamation-triangle me-2" aria-hidden="true"></i>
            {error || t('weather.loadError', 'Could not load weather data')}
          </div>
        </div>
      </div>
    );
  }

  // Safely read weather fields
  const temp = Math.round(weather.main?.temp ?? 0);
  const feelsLike = Math.round(weather.main?.feels_like ?? temp);
  const wx = weather.weather?.[0] ?? {};
  const description = wx.description ?? t('weather.unknown', 'Unknown');
  const icon = wx.icon ?? '01d';
  const humidity = weather.main?.humidity ?? 0;
  const windSpeed = Math.round((weather.wind?.speed ?? 0) * 3.6); // m/s -> km/h

  return (
    <div className="weather-widget">
      <div className="weather-header">
        <h4 className="weather-city-name">{city}</h4>
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
            <i className="fas fa-temperature-high" aria-hidden="true"></i>
            <span>{t('weather.feelsLike', 'Feels like')}</span>
            <strong>{feelsLike}°C</strong>
          </div>
          <div className="weather-detail-item">
            <i className="fas fa-wind" aria-hidden="true"></i>
            <span>{t('weather.wind', 'Wind')}</span>
            <strong>{windSpeed} km/h</strong>
          </div>
          <div className="weather-detail-item">
            <i className="fas fa-tint" aria-hidden="true"></i>
            <span>{t('weather.humidity', 'Humidity')}</span>
            <strong>{humidity}%</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

WeatherWidget.propTypes = {
  city: PropTypes.string.isRequired,
};

export default WeatherWidget;

