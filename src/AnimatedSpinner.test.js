import React from 'react';
import { render } from '@testing-library/react';

import AnimatedSpinner from './AnimatedSpinner';

test('renders', () => {
  const { debug } = render(<AnimatedSpinner />);
  debug();
});
