import React from 'react';
import { useSearch } from '../hooks';
import SearchInput, { Props as SearchInputProps } from './SearchInput';

type Props = Omit<
  SearchInputProps,
  'onSearch' | 'handleSearch' | 'setter' | 'region' | 'setRegion'
>;

const ControlledSearchInput = (props: Props) => {
  const { search, handleSearch, setter, region, setRegion } = useSearch();
  return (
    <SearchInput
      {...props}
      region={region}
      setRegion={setRegion}
      value={search}
      onChange={setter}
      onSearch={handleSearch}
    />
  );
};

export default ControlledSearchInput;
