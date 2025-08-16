import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FlightSearch from './FlightSearch';

// Mock airportService
jest.mock('../../services/airportService', () => ({
  __esModule: true,
  default: { getAllAirports: jest.fn() },
}));
import airportService from '../../services/airportService';

// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const airports = [
  { id: 'CMN', city: 'Casablanca', code: 'CMN' },
  { id: 'RAK', city: 'Marrakech', code: 'RAK' },
];

beforeEach(() => {
  jest.clearAllMocks();
});

test('shows loading spinner then renders form', async () => {
  airportService.getAllAirports.mockResolvedValueOnce(airports);

  render(
    <MemoryRouter>
      <FlightSearch />
    </MemoryRouter>
  );

  // Spinner while loading
  expect(screen.getByRole('status')).toBeInTheDocument();

  // Wait for airports to load
  await waitFor(() => {
    expect(screen.getByLabelText(/From/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/To/i)).toBeInTheDocument();
  });
});

test('shows error if airportService fails', async () => {
  airportService.getAllAirports.mockRejectedValueOnce(new Error('fail'));

  render(
    <MemoryRouter>
      <FlightSearch />
    </MemoryRouter>
  );

  await waitFor(() => {
    expect(screen.getByText(/Could not load airports/i)).toBeInTheDocument();
  });
});

test('submits form and navigates to results', async () => {
  airportService.getAllAirports.mockResolvedValueOnce(airports);

  render(
    <MemoryRouter>
      <FlightSearch />
    </MemoryRouter>
  );

  // Wait for form
  await waitFor(() => screen.getByLabelText(/From/i));

  // Select airports
  fireEvent.change(screen.getByLabelText(/From/i), { target: { value: 'CMN' } });
  fireEvent.change(screen.getByLabelText(/To/i), { target: { value: 'RAK' } });

  // Date input should have a value (default today)
  const dateInput = screen.getByLabelText(/Date/i);

  // Submit form
  fireEvent.click(screen.getByRole('button', { name: /search flights/i }));

  await waitFor(() => {
    expect(mockNavigate).toHaveBeenCalledWith(
      expect.stringContaining('/flights/results?from=CMN&to=RAK&date=')
    );
  });
});
