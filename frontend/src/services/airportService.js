import api from './api';

const airportService = {
  getAllAirports: async () => {
    const response = await api.get('/airports');
    return response.data;
  },

  getAirportById: async (id) => {
    const response = await api.get(`/airports/${id}`);
    return response.data;
  },

  getAirportByCode: async (code) => {
    const response = await api.get(`/airports/code/${code}`);
    return response.data;
  }
};

export default airportService;
