import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FormField from './FormField';

describe('FormField Component', () => {
  const defaultProps = {
    label: 'Test Label',
    value: 'test value',
    name: 'testField',
    onChange: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    test('renders with label and value', () => {
      render(<FormField {...defaultProps} />);
      
      expect(screen.getByText('Test Label')).toBeInTheDocument();
      expect(screen.getByDisplayValue('test value')).toBeInTheDocument();
    });

    test('renders with correct name attribute', () => {
      render(<FormField {...defaultProps} />);
      
      const input = screen.getByDisplayValue('test value');
      expect(input).toHaveAttribute('name', 'testField');
    });

    test('renders with default type="text"', () => {
      render(<FormField {...defaultProps} />);
      
      const input = screen.getByDisplayValue('test value');
      expect(input).toHaveAttribute('type', 'text');
    });

    test('renders with custom type', () => {
      render(<FormField {...defaultProps} type="email" />);
      
      const input = screen.getByDisplayValue('test value');
      expect(input).toHaveAttribute('type', 'email');
    });

    test('renders with tel type', () => {
      render(<FormField {...defaultProps} type="tel" />);
      
      const input = screen.getByDisplayValue('test value');
      expect(input).toHaveAttribute('type', 'tel');
    });
  });

  describe('Value Handling', () => {
    test('handles null value by rendering empty string', () => {
      render(<FormField {...defaultProps} value={null} />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input.value).toBe('');
    });

    test('handles undefined value by rendering empty string', () => {
      render(<FormField {...defaultProps} value={undefined} />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input.value).toBe('');
    });

    test('handles empty string value', () => {
      render(<FormField {...defaultProps} value="" />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input.value).toBe('');
    });

    test('displays provided value correctly', () => {
      render(<FormField {...defaultProps} value="Custom Value" />);
      
      expect(screen.getByDisplayValue('Custom Value')).toBeInTheDocument();
    });
  });

  describe('onChange Handler', () => {
    test('calls onChange when input value changes', () => {
      const handleChange = jest.fn();
      render(<FormField {...defaultProps} onChange={handleChange} />);
      
      const input = screen.getByLabelText('Test Label');
      fireEvent.change(input, { target: { name: 'testField', value: 'new value' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
    });

    test('passes correct event to onChange', () => {
      const handleChange = jest.fn();
      render(<FormField {...defaultProps} onChange={handleChange} />);
      
      const input = screen.getByLabelText('Test Label');
      fireEvent.change(input, { target: { name: 'testField', value: 'new value' } });
      
      expect(handleChange).toHaveBeenCalledTimes(1);
      const callArg = handleChange.mock.calls[0][0];
      expect(callArg.target.name).toBe('testField');
    });
  });

  describe('ReadOnly Mode', () => {
    test('renders as plaintext when readOnly is true', () => {
      render(<FormField {...defaultProps} readOnly={true} />);
      
      const input = screen.getByDisplayValue('test value');
      expect(input).toHaveAttribute('readonly');
      expect(input).toHaveClass('form-control-plaintext');
    });

    test('renders as editable when readOnly is false', () => {
      render(<FormField {...defaultProps} readOnly={false} />);
      
      const input = screen.getByDisplayValue('test value');
      expect(input).not.toHaveAttribute('readonly');
      expect(input).not.toHaveClass('form-control-plaintext');
    });

    test('defaults to editable when readOnly is not provided', () => {
      render(<FormField {...defaultProps} />);
      
      const input = screen.getByDisplayValue('test value');
      expect(input).not.toHaveAttribute('readonly');
    });
  });

  describe('Required Attribute', () => {
    test('has required attribute when required is true', () => {
      render(<FormField {...defaultProps} required={true} />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).toHaveAttribute('required');
    });

    test('does not have required attribute when required is false', () => {
      render(<FormField {...defaultProps} required={false} />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).not.toHaveAttribute('required');
    });

    test('defaults to not required when required is not provided', () => {
      render(<FormField {...defaultProps} />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input).not.toHaveAttribute('required');
    });
  });

  describe('Bootstrap Structure', () => {
    test('renders Form.Group with Row', () => {
      const { container } = render(<FormField {...defaultProps} />);
      
      const formGroup = container.querySelector('.mb-3.row');
      expect(formGroup).toBeInTheDocument();
    });

    test('label has correct column size', () => {
      const { container } = render(<FormField {...defaultProps} />);
      
      const label = container.querySelector('.col-sm-4');
      expect(label).toBeInTheDocument();
      expect(label.tagName).toBe('LABEL');
    });

    test('input wrapper has correct column size', () => {
      const { container } = render(<FormField {...defaultProps} />);
      
      const inputCol = container.querySelector('.col-sm-8');
      expect(inputCol).toBeInTheDocument();
    });
  });

  describe('Multiple Field Types', () => {
    test('renders email field correctly', () => {
      render(
        <FormField
          label="Email"
          value="test@example.com"
          name="email"
          type="email"
          onChange={jest.fn()}
          required={true}
        />
      );
      
      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('required');
      expect(input.value).toBe('test@example.com');
    });

    test('renders phone field correctly', () => {
      render(
        <FormField
          label="Phone"
          value="555-1234"
          name="phone"
          type="tel"
          onChange={jest.fn()}
        />
      );
      
      const input = screen.getByLabelText('Phone');
      expect(input).toHaveAttribute('type', 'tel');
      expect(input.value).toBe('555-1234');
    });

    test('renders text field correctly', () => {
      render(
        <FormField
          label="Name"
          value="John Doe"
          name="name"
          type="text"
          onChange={jest.fn()}
          required={true}
        />
      );
      
      const input = screen.getByLabelText('Name');
      expect(input).toHaveAttribute('type', 'text');
      expect(input).toHaveAttribute('required');
      expect(input.value).toBe('John Doe');
    });
  });

  describe('Edge Cases', () => {
    test('handles very long values', () => {
      const longValue = 'a'.repeat(1000);
      render(<FormField {...defaultProps} value={longValue} />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input.value).toBe(longValue);
    });

    test('handles special characters in value', () => {
      const specialValue = '!@#$%^&*()_+-=[]{}|;:,.<>?';
      render(<FormField {...defaultProps} value={specialValue} />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input.value).toBe(specialValue);
    });

    test('handles numeric values converted to string', () => {
      render(<FormField {...defaultProps} value="12345" />);
      
      const input = screen.getByLabelText('Test Label');
      expect(input.value).toBe('12345');
    });
  });

  describe('Accessibility', () => {
    test('label is properly associated with input', () => {
      render(<FormField {...defaultProps} />);
      
      const label = screen.getByText('Test Label');
      const input = screen.getByLabelText('Test Label');
      
      expect(label).toBeInTheDocument();
      expect(input).toBeInTheDocument();
    });

    test('input is keyboard accessible', () => {
      render(<FormField {...defaultProps} />);
      
      const input = screen.getByLabelText('Test Label');
      input.focus();
      
      expect(document.activeElement).toBe(input);
    });
  });
});
