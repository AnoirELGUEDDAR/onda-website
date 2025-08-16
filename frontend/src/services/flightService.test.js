jest.mock('./api', () => ({ get: jest.fn() }));

import api from './api';
import flightService from './flightService';

beforeEach(() => {
  api.get.mockReset();
  api.get.mockResolvedValue({ data: { ok: true } });
});

test('getDepartures uses today when date is missing', async () => {
  const airportId = 'CMN';
  const today = new Date().toISOString().split('T')[0];

  await flightService.getDepartures(airportId);

  expect(api.get).toHaveBeenCalledTimes(1);

  const [url, cfg] = api.get.mock.calls[0];
  expect(url).toContain('/flights/departures');

  const params = cfg?.params;
  if (params) {
    expect(params).toMatchObject({ airportId, date: today });
  } else {
    expect(url).toContain(`airportId=${airportId}`);
    expect(url).toContain(`date=${today}`);
  }
});

test('getArrivals uses provided date', async () => {
  const airportId = 'RAK';
  const date = '2025-01-02';

  await flightService.getArrivals(airportId, date);

  expect(api.get).toHaveBeenCalledTimes(1);

  const [url, cfg] = api.get.mock.calls[0];
  expect(url).toContain('/flights/arrivals');

  const params = cfg?.params;
  if (params) {
    expect(params).toMatchObject({ airportId, date });
  } else {
    expect(url).toContain(`airportId=${airportId}`);
    expect(url).toContain(`date=${date}`);
  }
});
