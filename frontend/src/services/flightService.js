// src/services/flightService.js
import api from './api';

const formatDate = (d) => d ?? new Date().toISOString().split('T')[0];

const flightService = {
  getAllFlights: async () => {
    const { data } = await api.get('/flights');
    return data;
  },

  getFlightByNumber: async (flightNumber) => {
    const { data } = await api.get(`/flights/number/${flightNumber}`);
    return data;
  },

  getDepartures: async (airportId, date) => {
    const { data } = await api.get('/flights/departures', {
      params: { airportId, date: formatDate(date) },
    });
    return data;
  },

  getArrivals: async (airportId, date) => {
    const { data } = await api.get('/flights/arrivals', {
      params: { airportId, date: formatDate(date) },
    });
    return data;
  },
};

export default flightService;

