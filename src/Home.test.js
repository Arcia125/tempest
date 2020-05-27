import React from 'react';
import { render } from '@testing-library/react';
import Home from './Home';

test('renders', () => {
  const { debug } = render(<Home />);
  debug();
});
