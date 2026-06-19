import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import EmptyState from './EmptyState';

describe('EmptyState Component', () => {
  describe('Rendering', () => {
    test('renders with message', () => {
      render(<EmptyState message="No students found" />);
      expect(screen.getByText('No students found')).toBeInTheDocument();
    });

    test('renders with default icon', () => {
      render(<EmptyState message="No data" />);
      expect(screen.getByText('📭')).toBeInTheDocument();
    });

    test('renders with custom icon', () => {
      render(<EmptyState message="No data" icon="🔍" />);
      expect(screen.getByText('🔍')).toBeInTheDocument();
    });

    test('icon has large font size', () => {
      render(<EmptyState message="Test" icon="📦" />);
      const icon = screen.getByText('📦');
      expect(icon).toHaveStyle({ fontSize: '3rem' });
    });
  });

  describe('Card Structure', () => {
    test('renders within a Card component', () => {
      const { container } = render(<EmptyState message="Test" />);
      const card = container.querySelector('.card');
      expect(card).toBeInTheDocument();
    });

    test('card has text-center class', () => {
      const { container } = render(<EmptyState message="Test" />);
      const card = container.querySelector('.card');
      expect(card).toHaveClass('text-center');
    });

    test('card has max-width style', () => {
      const { container } = render(<EmptyState message="Test" />);
      const card = container.querySelector('.card');
      expect(card).toHaveStyle({ maxWidth: '400px' });
    });

    test('card body has padding', () => {
      const { container } = render(<EmptyState message="Test" />);
      const cardBody = container.querySelector('.card-body');
      expect(cardBody).toHaveClass('p-5');
    });
  });

  describe('Layout', () => {
    test('has centered layout', () => {
      const { container } = render(<EmptyState message="Test" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('d-flex', 'justify-content-center', 'align-items-center');
    });

    test('has padding', () => {
      const { container } = render(<EmptyState message="Test" />);
      const wrapper = container.firstChild;
      expect(wrapper).toHaveClass('p-5');
    });

    test('message has text-muted class', () => {
      render(<EmptyState message="No data available" />);
      const message = screen.getByText('No data available');
      expect(message).toHaveClass('text-muted');
    });

    test('message has no margin bottom', () => {
      render(<EmptyState message="Test message" />);
      const message = screen.getByText('Test message');
      expect(message).toHaveClass('mb-0');
    });

    test('icon has margin bottom', () => {
      render(<EmptyState message="Test" icon="🎯" />);
      const icon = screen.getByText('🎯');
      expect(icon).toHaveClass('mb-3');
    });
  });

  describe('Message Handling', () => {
    test('handles short message', () => {
      render(<EmptyState message="Empty" />);
      expect(screen.getByText('Empty')).toBeInTheDocument();
    });

    test('handles long message', () => {
      const longMessage = 'No students have been added to your account yet. Click the "Add Student" button to get started.';
      render(<EmptyState message={longMessage} />);
      expect(screen.getByText(longMessage)).toBeInTheDocument();
    });

    test('handles message with special characters', () => {
      const message = "You don't have any students yet!";
      render(<EmptyState message={message} />);
      expect(screen.getByText(message)).toBeInTheDocument();
    });

    test('handles message with line breaks', () => {
      const message = 'No data found.\nPlease try again.';
      render(<EmptyState message={message} />);
      expect(screen.getByText(/No data found/)).toBeInTheDocument();
    });
  });

  describe('Icon Variations', () => {
    test('renders with user icon', () => {
      render(<EmptyState message="No users" icon="👤" />);
      expect(screen.getByText('👤')).toBeInTheDocument();
    });

    test('renders with search icon', () => {
      render(<EmptyState message="No results" icon="🔍" />);
      expect(screen.getByText('🔍')).toBeInTheDocument();
    });

    test('renders with document icon', () => {
      render(<EmptyState message="No documents" icon="📄" />);
      expect(screen.getByText('📄')).toBeInTheDocument();
    });

    test('renders with folder icon', () => {
      render(<EmptyState message="No folders" icon="📁" />);
      expect(screen.getByText('📁')).toBeInTheDocument();
    });

    test('handles text icon', () => {
      render(<EmptyState message="Empty" icon="N/A" />);
      expect(screen.getByText('N/A')).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles empty message string', () => {
      render(<EmptyState message="" />);
      const { container } = render(<EmptyState message="" />);
      expect(container.querySelector('.text-muted')).toBeInTheDocument();
    });

    test('handles very long message', () => {
      const veryLongMessage = 'A'.repeat(500);
      render(<EmptyState message={veryLongMessage} />);
      expect(screen.getByText(veryLongMessage)).toBeInTheDocument();
    });

    test('handles HTML-like content safely', () => {
      const message = '<div>No data</div>';
      render(<EmptyState message={message} />);
      expect(screen.getByText('<div>No data</div>')).toBeInTheDocument();
    });

    test('handles empty icon string', () => {
      render(<EmptyState message="Test" icon="" />);
      const { container } = render(<EmptyState message="Test" icon="" />);
      expect(container.querySelector('.card')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('card body is accessible', () => {
      const { container } = render(<EmptyState message="Test" />);
      const cardBody = container.querySelector('.card-body');
      expect(cardBody).toBeInTheDocument();
    });

    test('message is readable', () => {
      render(<EmptyState message="No data available" />);
      const message = screen.getByText('No data available');
      expect(message).toBeVisible();
    });
  });
});
