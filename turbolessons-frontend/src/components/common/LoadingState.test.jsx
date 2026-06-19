import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingState from './LoadingState';

describe('LoadingState Component', () => {
  describe('Rendering', () => {
    test('renders with default message', () => {
      render(<LoadingState />);
      const messages = screen.getAllByText('Loading...');
      expect(messages.length).toBeGreaterThan(0);
    });

    test('renders with custom message', () => {
      render(<LoadingState message="Loading student profile..." />);
      expect(screen.getByText('Loading student profile...')).toBeInTheDocument();
    });

    test('renders spinner', () => {
      const { container } = render(<LoadingState />);
      const spinner = container.querySelector('.spinner-border');
      expect(spinner).toBeInTheDocument();
    });

    test('spinner has correct Bootstrap classes', () => {
      const { container } = render(<LoadingState />);
      const spinner = container.querySelector('.spinner-border');
      expect(spinner).toHaveClass('spinner-border', 'text-primary');
    });

    test('has visually hidden text for accessibility', () => {
      render(<LoadingState />);
      const hiddenText = screen.getByText('Loading...', { selector: '.visually-hidden' });
      expect(hiddenText).toBeInTheDocument();
    });
  });

  describe('Layout', () => {
    test('has centered layout', () => {
      const { container } = render(<LoadingState />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('d-flex', 'justify-content-center', 'align-items-center');
    });

    test('has padding', () => {
      const { container } = render(<LoadingState />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('p-5');
    });

    test('message has text-muted class', () => {
      render(<LoadingState message="Test message" />);
      const message = screen.getByText('Test message');
      expect(message).toHaveClass('text-muted');
    });
  });

  describe('Edge Cases', () => {
    test('handles empty string message', () => {
      render(<LoadingState message="" />);
      const { container } = render(<LoadingState message="" />);
      expect(container.querySelector('.text-muted')).toBeInTheDocument();
    });

    test('handles very long message', () => {
      const longMessage = 'A'.repeat(200);
      render(<LoadingState message={longMessage} />);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    test('handles special characters in message', () => {
      const specialMessage = "Loading user's profile...";
      render(<LoadingState message={specialMessage} />);
      expect(screen.getByText(specialMessage)).toBeInTheDocument();
    });
  });
});
