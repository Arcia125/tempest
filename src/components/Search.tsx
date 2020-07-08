import React, { FC } from 'react';

import './Search.css';
import Typography, { TypographyVariants } from './Typography';
import StormIcon from './StormIcon';
import SearchInput from './SearchInput';
import { useSearch } from '../hooks';

export interface Props {
  variant: 'window' | 'opaque';
}

const Search: FC<Props> = (props) => {
  const { search, handleSearch, setter } = useSearch();

  return (
    <div className="Search">
      {/* <StormIcon className="Search-storm" /> */}
      <main className="Search-main">
        <Typography className="Search-label" variant={TypographyVariants.h2}>
          Find a summoner
        </Typography>
        <SearchInput
          variant={props.variant}
          value={search}
          onChange={setter}
          onSearch={handleSearch}
        />
      </main>
    </div>
  );
};

export default Search;
