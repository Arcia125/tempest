import { render } from '@testing-library/react';
import React from 'react';
import SearchInput from './SearchInput';

const Test = () => {
  return <SearchInput onSearch={() => {}} variant="window" />;
};

test('renders', () => {
  const { debug } = render(<Test />);
  debug();
});
