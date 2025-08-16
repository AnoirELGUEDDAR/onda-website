import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from '../../i18n';
import AirportList from './AirportList';

jest.mock('../../services/airportService', () => ({
  __esModule: true,
  default: { getAllAirports: jest.fn() },
}));
import airportService from '../../services/airportService';

const airports = [
  { id: 1, code: 'CMN', city: 'Casablanca', name: 'Mohammed V' },
  { id: 2, code: 'RAK', city: 'Marrakech', name: 'Menara' },
];

const wrap = (ui) => (
  <I18nextProvider i18n={i18n}>
    <MemoryRouter>{ui}</MemoryRouter>
  </I18nextProvider>
);

test('renders airports from service', async () => {
  // If your component expects axios-like shape, use { data: airports } instead.
  airportService.getAllAirports.mockResolvedValue({ data: airports });

  render(wrap(<AirportList />));

  expect(await screen.findByText(/Casablanca/i)).toBeInTheDocument();
  expect(screen.getByText(/Marrakech/i)).toBeInTheDocument();
});

