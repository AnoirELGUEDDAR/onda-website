import axios from 'axios';

// Better API URL handling for Kubernetes
const API_URL = '/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Airport endpoints
export const airportService = {
  // Get all airports
  getAllAirports: () => {
    return api.get('/airports');
  },
  
  // Get airport by code
  getAirportByCode: (code) => {
    return api.get(`/airports/${code}`);
  }
};

// Flight endpoints
export const flightService = {
  // Search flights by departure, arrival and date
  searchFlights: (departure, arrival, date) => {
    // Format date if it's a Date object
    const formattedDate = date instanceof Date 
      ? date.toISOString().split('T')[0] 
      : date;
    
    return api.get('/flights/search', {
      params: {
        departure,
        arrival,
        date: formattedDate
      }
    });
  },
  
  // Get flight details by ID
  getFlightById: (id) => {
    return api.get(`/flights/${id}`);
  }
};

export default api;
