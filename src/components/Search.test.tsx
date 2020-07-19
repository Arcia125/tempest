import { render } from '@testing-library/react';
import React from 'react';
import Search from './Search';

test('renders', () => {
  const { debug } = render(<Search />);
  debug();
});
