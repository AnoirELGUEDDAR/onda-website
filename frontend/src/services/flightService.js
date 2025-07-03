import api from './api';

const flightService = {
  getAllFlights: async () => {
    const response = await api.get('/flights');
    return response.data;
  },

  getFlightByNumber: async (flightNumber) => {
    const response = await api.get(`/flights/number/${flightNumber}`);
    return response.data;
  },

  getDepartures: async (airportId, date) => {
    const formattedDate = date ? date : new Date().toISOString().split('T')[0];
    const response = await api.get(`/flights/departures?airportId=${airportId}&date=${formattedDate}`);
    return response.data;
  },

  getArrivals: async (airportId, date) => {
    const formattedDate = date ? date : new Date().toISOString().split('T')[0];
    const response = await api.get(`/flights/arrivals?airportId=${airportId}&date=${formattedDate}`);
    return response.data;
  }
};

export default flightService;
