import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import HomePage from './Home/HomePage';
import AboutPage from './About/AboutPage';

test('renders app', () => {
  const { getByTestId } = render(<App/>);
  // const linkElement = getByText(/\//i);
  const element = getByTestId('app-test-id');
  expect(element).toBeInTheDocument();
});

test('renders home link', () => {
  const { getByText } = render(<HomePage/>);
  const element = getByText('Welcome to your PWA!');
  expect(element).toBeInTheDocument();
});

test('renders about link', () => {
  const { getByText } = render(<AboutPage/>);
  const element = getByText('This is a PWA');
  expect(element).toBeInTheDocument();
});