import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders home link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/\//i);
  expect(linkElement).toBeInTheDocument();
});

test('renders about link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/about/i);
  expect(linkElement).toBeInTheDocument();
});