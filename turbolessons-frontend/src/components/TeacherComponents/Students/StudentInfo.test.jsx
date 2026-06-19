import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import StudentInfo from './StudentInfo';
import studentReducer, { setFormField, setIsUpdate } from './StudentSlice';

// Mock dependencies
jest.mock('@ntjohns1/react-oidc/okta-compat', () => ({
  useOktaAuth: () => ({
    oktaAuth: {
      getAccessToken: jest.fn(() => 'mock-access-token'),
    },
  }),
}));

jest.mock('../../../service/axiosConfig', () => ({
  setAccessToken: jest.fn(),
}));

describe('StudentInfo Component', () => {
  let store;
  const mockStudent = {
    id: '123',
    displayName: 'John Doe',
    email: 'john.doe@example.com',
    firstName: 'John',
    middleName: 'M',
    lastName: 'Doe',
    mobilePhone: '555-1234',
    primaryPhone: '555-5678',
    streetAddress: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    zipCode: '62701',
  };

  beforeEach(() => {
    // Create a fresh store for each test
    store = configureStore({
      reducer: {
        students: studentReducer,
      },
    });
    
    // Clear all mocks
    jest.clearAllMocks();
  });

  const renderComponent = (student = mockStudent) => {
    return render(
      <Provider store={store}>
        <StudentInfo student={student} />
      </Provider>
    );
  };

  describe('Rendering', () => {
    test('renders the component with student name in header', () => {
      renderComponent();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });

    test('renders all form fields with correct labels', () => {
      renderComponent();
      
      expect(screen.getByText('Email')).toBeInTheDocument();
      expect(screen.getByText('First Name')).toBeInTheDocument();
      expect(screen.getByText('Middle Name')).toBeInTheDocument();
      expect(screen.getByText('Last Name')).toBeInTheDocument();
      expect(screen.getByText('Mobile Phone')).toBeInTheDocument();
      expect(screen.getByText('Home Phone')).toBeInTheDocument();
      expect(screen.getByText('Address')).toBeInTheDocument();
      expect(screen.getByText('City')).toBeInTheDocument();
      expect(screen.getByText('State')).toBeInTheDocument();
      expect(screen.getByText('Zip Code')).toBeInTheDocument();
    });

    test('renders edit button', () => {
      renderComponent();
      const editButton = screen.getByRole('button');
      expect(editButton).toHaveClass('btn-round');
    });

    test('edit button contains edit icon', () => {
      const { container } = renderComponent();
      const editButton = screen.getByRole('button');
      expect(editButton.querySelector('svg')).toBeInTheDocument();
    });
  });

  describe('Field Value Display', () => {
    test('displays all student data correctly', () => {
      renderComponent();
      
      expect(screen.getByDisplayValue('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('John')).toBeInTheDocument();
      expect(screen.getByDisplayValue('M')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('555-1234')).toBeInTheDocument();
      expect(screen.getByDisplayValue('555-5678')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123 Main St')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Springfield')).toBeInTheDocument();
      expect(screen.getByDisplayValue('IL')).toBeInTheDocument();
      expect(screen.getByDisplayValue('62701')).toBeInTheDocument();
    });

    test('displays empty string for missing values', () => {
      const studentWithMissingData = {
        ...mockStudent,
        middleName: null,
        mobilePhone: undefined,
        streetAddress: '',
      };
      
      renderComponent(studentWithMissingData);
      
      // Should render empty strings for null/undefined values
      const inputs = screen.getAllByDisplayValue('');
      expect(inputs.length).toBeGreaterThan(0);
    });

    test('handles null values gracefully', () => {
      const studentWithNulls = {
        displayName: 'Jane Smith',
        email: null,
        firstName: null,
        middleName: null,
        lastName: null,
        mobilePhone: null,
        primaryPhone: null,
        streetAddress: null,
        city: null,
        state: null,
        zipCode: null,
      };
      
      renderComponent(studentWithNulls);
      
      // Component should render without errors
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    });
  });

  describe('Read-Only Fields', () => {
    test('all form fields are read-only', () => {
      renderComponent();
      
      const inputs = screen.getAllByDisplayValue(/./);
      inputs.forEach(input => {
        expect(input).toHaveAttribute('readonly');
      });
    });

    test('all form fields have plaintext class', () => {
      renderComponent();
      
      const inputs = screen.getAllByDisplayValue(/./);
      inputs.forEach(input => {
        expect(input).toHaveClass('form-control-plaintext');
      });
    });

    test('email field is read-only', () => {
      renderComponent();
      const emailInput = screen.getByDisplayValue('john.doe@example.com');
      expect(emailInput).toHaveAttribute('readonly');
      expect(emailInput).toHaveClass('form-control-plaintext');
    });

    test('first name field is read-only', () => {
      renderComponent();
      const firstNameInput = screen.getByDisplayValue('John');
      expect(firstNameInput).toHaveAttribute('readonly');
    });

    test('last name field is read-only', () => {
      renderComponent();
      const lastNameInput = screen.getByDisplayValue('Doe');
      expect(lastNameInput).toHaveAttribute('readonly');
    });
  });

  describe('Edit Button Functionality', () => {
    test('clicking edit button dispatches setIsUpdate(true)', () => {
      renderComponent();
      
      const editButton = screen.getByRole('button');
      fireEvent.click(editButton);
      
      const state = store.getState();
      expect(state.students.isUpdate).toBe(true);
    });

    test('clicking edit button initializes form state with student data', () => {
      renderComponent();
      
      const editButton = screen.getByRole('button');
      fireEvent.click(editButton);
      
      const state = store.getState();
      expect(state.students.formState.email).toBe('john.doe@example.com');
      expect(state.students.formState.firstName).toBe('John');
      expect(state.students.formState.middleName).toBe('M');
      expect(state.students.formState.lastName).toBe('Doe');
      expect(state.students.formState.mobilePhone).toBe('555-1234');
      expect(state.students.formState.primaryPhone).toBe('555-5678');
      expect(state.students.formState.streetAddress).toBe('123 Main St');
      expect(state.students.formState.city).toBe('Springfield');
      expect(state.students.formState.state).toBe('IL');
      expect(state.students.formState.zipCode).toBe('62701');
    });

    test('clicking edit button converts null values to empty strings', () => {
      const studentWithNulls = {
        ...mockStudent,
        middleName: null,
        mobilePhone: null,
      };
      
      renderComponent(studentWithNulls);
      
      const editButton = screen.getByRole('button');
      fireEvent.click(editButton);
      
      const state = store.getState();
      expect(state.students.formState.middleName).toBe('');
      expect(state.students.formState.mobilePhone).toBe('');
    });

    test('edit button is clickable', () => {
      renderComponent();
      
      const editButton = screen.getByRole('button');
      expect(editButton).not.toBeDisabled();
    });
  });

  describe('Component Structure', () => {
    test('renders within a Card component', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.card-user')).toBeInTheDocument();
    });

    test('has correct Card structure with Header and Body', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.card-header')).toBeInTheDocument();
      expect(container.querySelector('.card-body')).toBeInTheDocument();
    });

    test('header contains student name and edit button', () => {
      const { container } = renderComponent();
      const header = container.querySelector('.card-header');
      expect(header).toContainElement(screen.getByText('John Doe'));
      expect(header).toContainElement(screen.getByRole('button'));
    });

    test('body contains form with all fields', () => {
      const { container } = renderComponent();
      const body = container.querySelector('.card-body');
      const form = body.querySelector('form');
      expect(form).toBeInTheDocument();
      
      // Check that form contains all field groups (FormField uses mb-3)
      const formGroups = form.querySelectorAll('.mb-3');
      expect(formGroups.length).toBe(10); // 10 fields
    });
  });

  describe('Bootstrap Grid Layout', () => {
    test('uses Row and Col components for layout', () => {
      const { container } = renderComponent();
      const rows = container.querySelectorAll('.row');
      expect(rows.length).toBeGreaterThan(0);
    });

    test('labels use correct column size', () => {
      const { container } = renderComponent();
      const labels = container.querySelectorAll('.col-sm-4');
      expect(labels.length).toBeGreaterThan(0);
    });

    test('input columns use correct size', () => {
      const { container } = renderComponent();
      const inputCols = container.querySelectorAll('.col-sm-8');
      expect(inputCols.length).toBeGreaterThan(0);
    });

    test('form groups have correct margin class', () => {
      const { container } = renderComponent();
      const formGroups = container.querySelectorAll('.mb-3');
      expect(formGroups.length).toBe(10);
    });
  });

  describe('Props Handling', () => {
    test('handles different student objects correctly', () => {
      const differentStudent = {
        displayName: 'Jane Smith',
        email: 'jane@example.com',
        firstName: 'Jane',
        middleName: 'A',
        lastName: 'Smith',
        mobilePhone: '555-9999',
        primaryPhone: '555-8888',
        streetAddress: '456 Oak Ave',
        city: 'Chicago',
        state: 'IL',
        zipCode: '60601',
      };
      
      renderComponent(differentStudent);
      
      expect(screen.getByText('Jane Smith')).toBeInTheDocument();
      expect(screen.getByDisplayValue('jane@example.com')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Smith')).toBeInTheDocument();
    });

    test('re-renders when student prop changes', () => {
      const { rerender } = renderComponent();
      
      const newStudent = {
        ...mockStudent,
        displayName: 'Jane Doe',
        firstName: 'Jane',
      };
      
      rerender(
        <Provider store={store}>
          <StudentInfo student={newStudent} />
        </Provider>
      );
      
      expect(screen.getByText('Jane Doe')).toBeInTheDocument();
      expect(screen.getByDisplayValue('Jane')).toBeInTheDocument();
    });
  });

  describe('Field Order', () => {
    test('displays fields in correct order', () => {
      const { container } = renderComponent();
      const labels = Array.from(container.querySelectorAll('.form-label')).map(
        label => label.textContent
      );
      
      expect(labels).toEqual([
        'Email',
        'First Name',
        'Middle Name',
        'Last Name',
        'Mobile Phone',
        'Home Phone',
        'Address',
        'City',
        'State',
        'Zip Code',
      ]);
    });
  });

  describe('Accessibility', () => {
    test('form fields are keyboard accessible', () => {
      renderComponent();
      
      const inputs = screen.getAllByDisplayValue(/./);
      inputs.forEach(input => {
        input.focus();
        expect(document.activeElement).toBe(input);
      });
    });

    test('edit button is keyboard accessible', () => {
      renderComponent();
      
      const editButton = screen.getByRole('button');
      editButton.focus();
      expect(document.activeElement).toBe(editButton);
    });
  });

  describe('Edge Cases', () => {
    test('handles student with only required fields', () => {
      const minimalStudent = {
        displayName: 'Minimal User',
        email: 'minimal@example.com',
      };
      
      renderComponent(minimalStudent);
      
      expect(screen.getByText('Minimal User')).toBeInTheDocument();
      expect(screen.getByDisplayValue('minimal@example.com')).toBeInTheDocument();
    });

    test('handles very long values', () => {
      const studentWithLongValues = {
        ...mockStudent,
        streetAddress: 'A'.repeat(200),
      };
      
      renderComponent(studentWithLongValues);
      
      const addressInput = screen.getByDisplayValue('A'.repeat(200));
      expect(addressInput).toBeInTheDocument();
    });

    test('handles special characters in values', () => {
      const studentWithSpecialChars = {
        ...mockStudent,
        firstName: "O'Brien",
        lastName: 'Smith-Jones',
        streetAddress: '123 Main St. #4B',
      };
      
      renderComponent(studentWithSpecialChars);
      
      expect(screen.getByDisplayValue("O'Brien")).toBeInTheDocument();
      expect(screen.getByDisplayValue('Smith-Jones')).toBeInTheDocument();
      expect(screen.getByDisplayValue('123 Main St. #4B')).toBeInTheDocument();
    });
  });
});
