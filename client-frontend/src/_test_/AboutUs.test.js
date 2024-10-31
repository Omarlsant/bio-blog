import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from '../pages/AboutUs.jsx';

test('renders AboutUs component without crashing', () => {
  render(
    <AboutUs />
  );
  expect(screen.getByText(/Alimentación Consciente para un Futuro Sostenible/i)).toBeInTheDocument();
  expect(screen.getByText(/Nuestra Historia y Misión/i)).toBeInTheDocument();
});
