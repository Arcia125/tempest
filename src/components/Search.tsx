import React, { FC } from 'react';

import './Search.css';
import Typography, { TypographyVariants } from './Typography';
import StormIcon from './StormIcon';
import SearchInput from './SearchInput';
import { useSearch } from '../hooks';

export interface Props {}

const Search: FC<Props> = (props) => {
  const { search, handleSearch, setter } = useSearch();

  return (
    <div className="Search">
      <StormIcon className="Search-storm" />
      <main className="Search-main">
        <Typography className="Search-label" variant={TypographyVariants.h2}>
          Find a summoner
        </Typography>
        <SearchInput value={search} onChange={setter} onSearch={handleSearch} />
      </main>
    </div>
  );
};

export default Search;
