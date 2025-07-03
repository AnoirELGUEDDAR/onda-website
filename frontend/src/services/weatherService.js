import axios from 'axios';

const weatherService = {
  /**
   * Get current weather for a city
   * @param {string} city - City name (e.g., "Casablanca")
   * @returns {Promise} - Weather data
   */
  getWeatherByCity: async (city) => {
    try {
      console.log(`Fetching weather data for ${city}...`);
      // Using axios directly to your backend API
      const response = await axios.get(`/api/weather/current?city=${city}`);
      console.log('Weather data received:', response.data);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch weather for ${city}:`, error);
      throw error;
    }
  },

  /**
   * Get weather forecast for a city (5 days)
   * @param {string} city - City name (e.g., "Casablanca")
   * @returns {Promise} - Forecast data
   */
  getForecastByCity: async (city) => {
    try {
      const response = await axios.get(`/api/weather/forecast?city=${city}`);
      return response.data;
    } catch (error) {
      console.error(`Failed to fetch forecast for ${city}:`, error);
      throw error;
    }
  },

  /**
   * Get weather icon URL
   * @param {string} iconCode - Weather icon code from API
   * @returns {string} - URL to weather icon
   */
  getWeatherIconUrl: (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  }
};

export default weatherService;
