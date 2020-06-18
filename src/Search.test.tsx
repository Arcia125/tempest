import React from 'react';
import { render } from '@testing-library/react';

import Search from './Search';

test('renders', () => {
  const { debug } = render(<Search />);
  debug();
});
