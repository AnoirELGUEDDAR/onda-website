import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

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
  
  // Alternative: search flights using POST request with request body
  searchFlightsPost: (searchData) => {
    return api.post('/flights/search', searchData);
  },
  
  // Get flight details by ID
  getFlightById: (id) => {
    return api.get(`/flights/${id}`);
  }
};

// Export the axios instance as default for other API calls
export default api;
