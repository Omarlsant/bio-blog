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

test('renders team member images with alt text', () => {
  render(<AboutUs />);
  const omarImage = screen.getByAltText('Omar');
  const marielaImage = screen.getByAltText('Mariela');
  expect(omarImage).toBeInTheDocument();
  expect(marielaImage).toBeInTheDocument();
});

test('renders CTA button with link to /contacto', () => {
  render(<AboutUs />);
  const ctaButton = screen.getByRole('link', { name: /Contáctanos/i });
  expect(ctaButton).toBeInTheDocument();
  expect(ctaButton).toHaveAttribute('href', '/contacto');
});

test('renders key values of the company', () => {
  render(<AboutUs />);
  const values = [
    'Sostenibilidad Alimentaria',
    'Compromiso con la Comunidad',
    'Reducción del Desperdicio de Alimentos',
    'Consumo Consciente'
  ];
  values.forEach(value => {
    expect(screen.getByText(new RegExp(value, 'i'))).toBeInTheDocument();
  });
});