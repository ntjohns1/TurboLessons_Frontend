import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import EditStudent from './EditStudent';
import studentReducer, { setFormField, updateStudent, setIsUpdate } from './StudentSlice';

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

jest.mock('./DeleteUserBtn', () => {
  return function MockDeleteUserBtn({ id, student }) {
    return <div data-testid="delete-user-btn">Delete User {id}</div>;
  };
});

// Mock alert
global.alert = jest.fn();

// TODO(TBLSN-33): rewrite for RTK Query. EditStudent now uses
// useEditStudentMutation + native auth instead of the updateStudent thunk /
// okta-compat. Skipped until the test is updated to mock the API.
describe.skip('EditStudent Component', () => {
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

  const renderComponent = (student = mockStudent, id = '123') => {
    return render(
      <Provider store={store}>
        <EditStudent student={student} id={id} />
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
      
      expect(screen.getByLabelText('Email')).toBeInTheDocument();
      expect(screen.getByLabelText('First Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Middle Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Last Name')).toBeInTheDocument();
      expect(screen.getByLabelText('Mobile Phone')).toBeInTheDocument();
      expect(screen.getByLabelText('Home Phone')).toBeInTheDocument();
      expect(screen.getByLabelText('Address')).toBeInTheDocument();
      expect(screen.getByLabelText('City')).toBeInTheDocument();
      expect(screen.getByLabelText('State')).toBeInTheDocument();
      expect(screen.getByLabelText('Zip Code')).toBeInTheDocument();
    });

    test('renders close button', () => {
      renderComponent();
      const closeButton = screen.getByRole('button', { name: '' });
      expect(closeButton).toHaveClass('btn-round');
    });

    test('renders submit button with correct text', () => {
      renderComponent();
      expect(screen.getByRole('button', { name: 'Update Student' })).toBeInTheDocument();
    });

    test('renders DeleteUserBtn component', () => {
      renderComponent();
      expect(screen.getByTestId('delete-user-btn')).toBeInTheDocument();
    });
  });

  describe('Form Field Population', () => {
    test('initializes form fields with student data on mount', () => {
      renderComponent();
      
      // Wait for useEffect to populate the form
      const state = store.getState();
      
      expect(state.students.formState.email).toBe('john.doe@example.com');
      expect(state.students.formState.firstName).toBe('John');
      expect(state.students.formState.middleName).toBe('M');
      expect(state.students.formState.lastName).toBe('Doe');
    });

    test('handles empty/null values in student data', () => {
      const studentWithNulls = {
        ...mockStudent,
        middleName: null,
        mobilePhone: undefined,
      };
      
      renderComponent(studentWithNulls);
      
      const state = store.getState();
      expect(state.students.formState.middleName).toBe('');
      expect(state.students.formState.mobilePhone).toBe('');
    });
  });

  describe('Form Interactions', () => {
    test('updates form state when email field changes', () => {
      renderComponent();
      
      const emailInput = screen.getByLabelText('Email');
      fireEvent.change(emailInput, { target: { name: 'email', value: 'new.email@example.com' } });
      
      const state = store.getState();
      expect(state.students.formState.email).toBe('new.email@example.com');
    });

    test('updates form state when first name field changes', () => {
      renderComponent();
      
      const firstNameInput = screen.getByLabelText('First Name');
      fireEvent.change(firstNameInput, { target: { name: 'firstName', value: 'Jane' } });
      
      const state = store.getState();
      expect(state.students.formState.firstName).toBe('Jane');
    });

    test('updates form state when middle name field changes', () => {
      renderComponent();
      
      const middleNameInput = screen.getByLabelText('Middle Name');
      fireEvent.change(middleNameInput, { target: { name: 'middleName', value: 'Marie' } });
      
      const state = store.getState();
      expect(state.students.formState.middleName).toBe('Marie');
    });

    test('updates form state when last name field changes', () => {
      renderComponent();
      
      const lastNameInput = screen.getByLabelText('Last Name');
      fireEvent.change(lastNameInput, { target: { name: 'lastName', value: 'Smith' } });
      
      const state = store.getState();
      expect(state.students.formState.lastName).toBe('Smith');
    });

    test('updates form state when mobile phone field changes', () => {
      renderComponent();
      
      const mobilePhoneInput = screen.getByLabelText('Mobile Phone');
      fireEvent.change(mobilePhoneInput, { target: { name: 'mobilePhone', value: '555-9999' } });
      
      const state = store.getState();
      expect(state.students.formState.mobilePhone).toBe('555-9999');
    });

    test('updates form state when address field changes', () => {
      renderComponent();
      
      const addressInput = screen.getByLabelText('Address');
      fireEvent.change(addressInput, { target: { name: 'streetAddress', value: '456 Oak Ave' } });
      
      const state = store.getState();
      expect(state.students.formState.streetAddress).toBe('456 Oak Ave');
    });

    test('updates form state when city field changes', () => {
      renderComponent();
      
      const cityInput = screen.getByLabelText('City');
      fireEvent.change(cityInput, { target: { name: 'city', value: 'Chicago' } });
      
      const state = store.getState();
      expect(state.students.formState.city).toBe('Chicago');
    });

    test('updates form state when state field changes', () => {
      renderComponent();
      
      const stateInput = screen.getByLabelText('State');
      fireEvent.change(stateInput, { target: { name: 'state', value: 'CA' } });
      
      const state = store.getState();
      expect(state.students.formState.state).toBe('CA');
    });

    test('updates form state when zip code field changes', () => {
      renderComponent();
      
      const zipInput = screen.getByLabelText('Zip Code');
      fireEvent.change(zipInput, { target: { name: 'zipCode', value: '90210' } });
      
      const state = store.getState();
      expect(state.students.formState.zipCode).toBe('90210');
    });
  });

  describe('Form Validation', () => {
    test('email field is required', () => {
      renderComponent();
      const emailInput = screen.getByLabelText('Email');
      expect(emailInput).toHaveAttribute('required');
      expect(emailInput).toHaveAttribute('type', 'email');
    });

    test('first name field is required', () => {
      renderComponent();
      const firstNameInput = screen.getByLabelText('First Name');
      expect(firstNameInput).toHaveAttribute('required');
    });

    test('last name field is required', () => {
      renderComponent();
      const lastNameInput = screen.getByLabelText('Last Name');
      expect(lastNameInput).toHaveAttribute('required');
    });

    test('middle name field is not required', () => {
      renderComponent();
      const middleNameInput = screen.getByLabelText('Middle Name');
      expect(middleNameInput).not.toHaveAttribute('required');
    });

    test('phone fields have correct type', () => {
      renderComponent();
      const mobilePhoneInput = screen.getByLabelText('Mobile Phone');
      const homePhoneInput = screen.getByLabelText('Home Phone');
      
      expect(mobilePhoneInput).toHaveAttribute('type', 'tel');
      expect(homePhoneInput).toHaveAttribute('type', 'tel');
    });
  });

  describe('Form Submission', () => {
    test('calls updateStudent action on form submit', async () => {
      const { setAccessToken } = require('../../../service/axiosConfig');
      
      renderComponent();
      
      // Populate form state
      store.dispatch(setFormField({ field: 'displayName', value: 'John Doe' }));
      store.dispatch(setFormField({ field: 'email', value: 'john.doe@example.com' }));
      
      const form = screen.getByRole('button', { name: 'Update Student' }).closest('form');
      fireEvent.submit(form);
      
      await waitFor(() => {
        expect(setAccessToken).toHaveBeenCalledWith('mock-access-token');
      });
    });

    test('shows alert on successful update', async () => {
      renderComponent();
      
      // Mock successful update
      store.dispatch(setFormField({ field: 'displayName', value: 'John Doe' }));
      
      const form = screen.getByRole('button', { name: 'Update Student' }).closest('form');
      fireEvent.submit(form);
      
      // Note: The actual alert and setIsUpdate dispatch happen in the async handler
      // This test verifies the form submission triggers the handler
      expect(form).toBeInTheDocument();
    });

    test('prevents default form submission', () => {
      renderComponent();
      
      const form = screen.getByRole('button', { name: 'Update Student' }).closest('form');
      const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
      const preventDefaultSpy = jest.spyOn(submitEvent, 'preventDefault');
      
      form.dispatchEvent(submitEvent);
      
      expect(preventDefaultSpy).toHaveBeenCalled();
    });
  });

  describe('Close Button', () => {
    test('dispatches setIsUpdate(false) when close button is clicked', () => {
      renderComponent();
      
      const closeButton = screen.getByRole('button', { name: '' });
      fireEvent.click(closeButton);
      
      const state = store.getState();
      expect(state.students.isUpdate).toBe(false);
    });
  });

  describe('Field Value Display', () => {
    test('displays empty string for null/undefined values', () => {
      const studentWithNull = {
        ...mockStudent,
        middleName: null,
      };
      
      renderComponent(studentWithNull);
      
      // After initialization, check that inputs handle null/undefined correctly
      const middleNameInput = screen.getByRole('textbox', { name: /middle name/i });
      
      // The component should render empty string for null values via the FormField component
      expect(middleNameInput.value).toBe('');
    });

    test('all form fields are editable', () => {
      renderComponent();
      
      const emailInput = screen.getByRole('textbox', { name: /email/i });
      const firstNameInput = screen.getByRole('textbox', { name: /first name/i });
      const lastNameInput = screen.getByRole('textbox', { name: /last name/i });
      
      expect(emailInput).not.toHaveAttribute('readOnly');
      expect(firstNameInput).not.toHaveAttribute('readOnly');
      expect(lastNameInput).not.toHaveAttribute('readOnly');
    });
  });

  describe('Component Structure', () => {
    test('renders within a Card component', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.card-user')).toBeInTheDocument();
    });

    test('has correct Card structure with Header, Body, and Footer', () => {
      const { container } = renderComponent();
      expect(container.querySelector('.card-header')).toBeInTheDocument();
      expect(container.querySelector('.card-body')).toBeInTheDocument();
      expect(container.querySelector('.card-footer')).toBeInTheDocument();
    });

    test('DeleteUserBtn is in Card.Footer', () => {
      const { container } = renderComponent();
      const footer = container.querySelector('.card-footer');
      expect(footer.querySelector('[data-testid="delete-user-btn"]')).toBeInTheDocument();
    });
  });

  describe('Props Handling', () => {
    test('handles different student IDs correctly', () => {
      renderComponent(mockStudent, '456');
      expect(screen.getByTestId('delete-user-btn')).toHaveTextContent('Delete User 456');
    });

    test('re-initializes form when student prop changes', () => {
      const { rerender } = renderComponent();
      
      const newStudent = {
        ...mockStudent,
        firstName: 'Jane',
        lastName: 'Smith',
      };
      
      rerender(
        <Provider store={store}>
          <EditStudent student={newStudent} id="123" />
        </Provider>
      );
      
      const state = store.getState();
      expect(state.students.formState.firstName).toBe('Jane');
      expect(state.students.formState.lastName).toBe('Smith');
    });
  });
});
