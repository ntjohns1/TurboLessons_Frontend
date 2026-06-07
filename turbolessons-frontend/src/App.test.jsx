import React from 'react';
import { createRoot } from 'react-dom/client';
import { MemoryRouter } from 'react-router-dom';
import { act } from 'react-dom/test-utils';

// Mock Okta so auth state is deterministic and no real redirect/PKCE runs.
jest.mock('@okta/okta-react', () => ({
  Security: ({ children }) => children,
  LoginCallback: () => null,
  useOktaAuth: () => ({
    authState: null,
    oktaAuth: {
      setOriginalUri: jest.fn(),
      signInWithRedirect: jest.fn(),
      getAccessToken: jest.fn(),
      authStateManager: { subscribe: jest.fn(), unsubscribe: jest.fn() },
    },
  }),
}));

import App from './App';

let container;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  document.body.removeChild(container);
  container = null;
});

it('renders without crashing and shows the auth loading state', async () => {
  await act(async () => {
    const root = createRoot(container);
    root.render(<MemoryRouter><App /></MemoryRouter>);
  });

  // At the root route with no authenticated session, RequiredAuth renders
  // the LoadingSpinner while the Okta auth state resolves.
  const spinners = container.querySelectorAll('.spinner-grow');
  expect(spinners.length).toBeGreaterThan(0);
});
