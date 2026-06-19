import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorState from './ErrorState';

describe('ErrorState Component', () => {
  describe('Rendering', () => {
    test('renders with error object', () => {
      const error = { message: 'Something went wrong' };
      render(<ErrorState error={error} />);
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    test('renders with error string', () => {
      render(<ErrorState error="Network error" />);
      expect(screen.getByText('Network error')).toBeInTheDocument();
    });

    test('renders with default title', () => {
      const error = { message: 'Test error' };
      render(<ErrorState error={error} />);
      expect(screen.getByText('Error')).toBeInTheDocument();
    });

    test('renders with custom title', () => {
      const error = { message: 'Test error' };
      render(<ErrorState error={error} title="Custom Error Title" />);
      expect(screen.getByText('Custom Error Title')).toBeInTheDocument();
    });

    test('renders default message when error is null', () => {
      render(<ErrorState error={null} />);
      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });

    test('renders default message when error is undefined', () => {
      render(<ErrorState error={undefined} />);
      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });
  });

  describe('Bootstrap Alert', () => {
    test('renders as danger variant', () => {
      const error = { message: 'Test error' };
      const { container } = render(<ErrorState error={error} />);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('alert-danger');
    });

    test('has Alert.Heading', () => {
      const error = { message: 'Test error' };
      const { container } = render(<ErrorState error={error} />);
      const heading = container.querySelector('.alert-heading');
      expect(heading).toBeInTheDocument();
    });

    test('has correct max-width style', () => {
      const error = { message: 'Test error' };
      const { container } = render(<ErrorState error={error} />);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveStyle({ maxWidth: '600px' });
    });
  });

  describe('Layout', () => {
    test('has centered layout', () => {
      const error = { message: 'Test error' };
      const { container } = render(<ErrorState error={error} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('d-flex', 'justify-content-center', 'align-items-center');
    });

    test('has padding', () => {
      const error = { message: 'Test error' };
      const { container } = render(<ErrorState error={error} />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('p-5');
    });

    test('alert has full width', () => {
      const error = { message: 'Test error' };
      const { container } = render(<ErrorState error={error} />);
      const alert = container.querySelector('.alert');
      expect(alert).toHaveClass('w-100');
    });
  });

  describe('Error Message Handling', () => {
    test('handles error with message property', () => {
      const error = { message: 'Database connection failed' };
      render(<ErrorState error={error} />);
      expect(screen.getByText('Database connection failed')).toBeInTheDocument();
    });

    test('handles error as plain string', () => {
      render(<ErrorState error="Simple error message" />);
      expect(screen.getByText('Simple error message')).toBeInTheDocument();
    });

    test('handles Error instance', () => {
      const error = new Error('Error instance message');
      render(<ErrorState error={error} />);
      expect(screen.getByText('Error instance message')).toBeInTheDocument();
    });

    test('handles empty error object', () => {
      const emptyError = {};
      render(<ErrorState error={emptyError} />);
      expect(screen.getByText('An unexpected error occurred')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles very long error message', () => {
      const longMessage = 'A'.repeat(500);
      const error = { message: longMessage };
      render(<ErrorState error={error} />);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    test('handles special characters in error message', () => {
      const error = { message: "User's data couldn't be loaded" };
      render(<ErrorState error={error} />);
      expect(screen.getByText("User's data couldn't be loaded")).toBeInTheDocument();
    });

    test('handles HTML-like content safely', () => {
      const error = { message: '<script>alert("xss")</script>' };
      render(<ErrorState error={error} />);
      expect(screen.getByText('<script>alert("xss")</script>')).toBeInTheDocument();
    });

    test('handles multiline error messages', () => {
      const error = { message: 'Line 1\nLine 2\nLine 3' };
      render(<ErrorState error={error} />);
      // Check for the first line in the multiline message
      expect(screen.getByText(/Line 1/)).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('error message has no margin bottom', () => {
      const error = { message: 'Test error' };
      render(<ErrorState error={error} />);
      const message = screen.getByText('Test error');
      expect(message).toHaveClass('mb-0');
    });
  });
});
