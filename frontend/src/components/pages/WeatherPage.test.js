// mock the airport service exactly as imported in WeatherPage
jest.mock('../../services/airportService', () => ({
  __esModule: true,
  default: { getAllAirports: jest.fn() },
}));

// mock WeatherWidget so we don’t hit network in tests
jest.mock('../weather/WeatherWidget', () => () => <div data-testid="weather-widget" />);

import { render, screen, waitFor } from '@testing-library/react';
import WeatherPage from './WeatherPage';
import airportService from '../../services/airportService';

beforeEach(() => jest.clearAllMocks());

test('shows spinner then renders airport weather cards', async () => {
  airportService.getAllAirports.mockResolvedValueOnce([
    { id: 1, city: 'Casablanca', code: 'CMN' },
    { id: 2, city: 'Rabat', code: 'RBA' },
  ]);

  render(<WeatherPage />);

  // spinner while loading
  expect(document.querySelector('.spinner-border')).toBeTruthy();

  // airports rendered
  await waitFor(() => {
    expect(screen.getByText(/Casablanca/i)).toBeInTheDocument();
    expect(screen.getByText(/Rabat/i)).toBeInTheDocument();
  });

  // WeatherWidgets present
  expect(screen.getAllByTestId('weather-widget').length).toBe(2);
});

test('shows error when service rejects', async () => {
  airportService.getAllAirports.mockRejectedValueOnce(new Error('boom'));

  render(<WeatherPage />);

  await waitFor(() =>
    expect(screen.getByText(/Could not load airports/i)).toBeInTheDocument()
  );
});
