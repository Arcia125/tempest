import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders', () => {
  const { debug} = render(<App />);
  debug();
});
