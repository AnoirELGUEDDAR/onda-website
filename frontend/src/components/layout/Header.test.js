import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './Header';

test('renders site navigation', () => {
  render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
  // Navbar should exist
  expect(screen.getByRole('navigation')).toBeInTheDocument();
});
