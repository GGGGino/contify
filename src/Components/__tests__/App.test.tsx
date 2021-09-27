import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import '../../translations';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Contify/i);
  expect(linkElement).toBeInTheDocument();
});
