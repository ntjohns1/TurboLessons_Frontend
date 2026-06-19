import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UnauthorizedState from './UnauthorizedState';

describe('UnauthorizedState Component', () => {
  test('renders with default message', () => {
    render(<UnauthorizedState />);
    expect(
      screen.getByText(/An Authorization Error Has Occurred/i)
    ).toBeInTheDocument();
  });

  test('renders with custom message', () => {
    render(<UnauthorizedState message="You shall not pass" />);
    expect(screen.getByText('You shall not pass')).toBeInTheDocument();
  });

  test('renders Unauthorized title', () => {
    render(<UnauthorizedState />);
    expect(screen.getByText('Unauthorized')).toBeInTheDocument();
  });

  test('uses danger alert variant', () => {
    const { container } = render(<UnauthorizedState />);
    const alert = container.querySelector('.alert');
    expect(alert).toHaveClass('alert-danger');
  });
});
