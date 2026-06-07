import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingSpinner from './LoadingSpinner';

describe('LoadingSpinner Component', () => {
  test('renders default count of 3 spinners', () => {
    const { container } = render(<LoadingSpinner />);
    const spinners = container.querySelectorAll('.spinner-grow');
    expect(spinners.length).toBe(3);
  });

  test('renders custom count of spinners', () => {
    const { container } = render(<LoadingSpinner count={5} />);
    const spinners = container.querySelectorAll('.spinner-grow');
    expect(spinners.length).toBe(5);
  });

  test('renders with default info variant', () => {
    const { container } = render(<LoadingSpinner />);
    const spinner = container.querySelector('.spinner-grow');
    expect(spinner).toHaveClass('text-info');
  });

  test('renders with custom variant', () => {
    const { container } = render(<LoadingSpinner variant="primary" />);
    const spinner = container.querySelector('.spinner-grow');
    expect(spinner).toHaveClass('text-primary');
  });

  test('has accessible hidden text', () => {
    render(<LoadingSpinner />);
    const hiddenTexts = screen.getAllByText('Loading...');
    expect(hiddenTexts.length).toBe(3);
  });

  test('spinners have status role', () => {
    render(<LoadingSpinner />);
    const spinners = screen.getAllByRole('status');
    expect(spinners.length).toBe(3);
  });
});
