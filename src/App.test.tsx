import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders WatchNow title', () => {
  render(<App />);
  const titleElement = screen.getByText(/WatchNow/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders movie and TV show recommendations', () => {
  render(<App />);
  const moviesSection = screen.getByText(/Featured Movies/i);
  const tvShowsSection = screen.getByText(/Popular TV Shows/i);
  expect(moviesSection).toBeInTheDocument();
  expect(tvShowsSection).toBeInTheDocument();
});

test('renders sample movies and TV shows', () => {
  render(<App />);
  const shawshank = screen.getByText(/The Shawshank Redemption/i);
  const breakingBad = screen.getByText(/Breaking Bad/i);
  expect(shawshank).toBeInTheDocument();
  expect(breakingBad).toBeInTheDocument();
});
