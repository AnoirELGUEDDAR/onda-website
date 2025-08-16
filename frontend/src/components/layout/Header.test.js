// Header.test.js
import { render, screen } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import Header from './Header';

test('renders site navigation', () => {
  const router = createMemoryRouter(
    [{ path: '/', element: <Header /> }],
    {
      initialEntries: ['/'],
      future: {
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      },
    }
  );

  render(<RouterProvider router={router} />);

  expect(screen.getByText(/home/i)).toBeInTheDocument();
  expect(screen.getByText(/airports/i)).toBeInTheDocument();
});

