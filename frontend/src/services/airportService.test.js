import api from './api';
import airportService from './airportService';

jest.mock('./api', () => ({ get: jest.fn() }));

test('getAllAirports hits /airports', async () => {
  api.get.mockResolvedValueOnce({ data: [] });
  const res = await airportService.getAllAirports();
  expect(api.get).toHaveBeenCalledWith('/airports');
  expect(res).toEqual([]);
});
