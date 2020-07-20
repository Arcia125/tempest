import React, { FC, useContext } from 'react';
import './Search.css';
import SearchInput from './SearchInput';
import Typography, { TypographyVariants } from './Typography';
import { useSearch } from '../hooks';
import { themeContext, ThemeMode } from '../theme';
// import StormIcon from './StormIcon';

export interface Props {}

const Search: FC<Props> = (props) => {
  const { search, handleSearch, setter } = useSearch();
  const { theme } = useContext(themeContext);

  return (
    <div className="Search">
      {/* <StormIcon className="Search-storm" /> */}
      <main className="Search-main">
        <Typography className="Search-label" variant={TypographyVariants.h2}>
          Find a summoner
        </Typography>
        <SearchInput
          variant={theme.mode === ThemeMode.DARK_GPU ? 'window' : 'opaque'}
          value={search}
          onChange={setter}
          onSearch={handleSearch}
        />
      </main>
    </div>
  );
};

export default Search;
