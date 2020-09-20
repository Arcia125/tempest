import React, { FC, useContext } from 'react';
import ControlledSearchInput from './ControlledSearchInput';
import './Search.css';
import Typography, { TypographyVariants } from './Typography';
import { themeContext, ThemeMode } from '../theme';
// import StormIcon from './StormIcon';

export interface Props {}

const Search: FC<Props> = (props) => {
  const { theme } = useContext(themeContext);

  return (
    <div className="Search">
      {/* <StormIcon className="Search-storm" /> */}
      <main className="Search-main">
        <Typography className="Search-label" variant={TypographyVariants.h2}>
          Find a summoner
        </Typography>
        <ControlledSearchInput
          variant={theme.mode === ThemeMode.DARK_GPU ? 'window' : 'opaque'}
          autoFocus
        />
      </main>
    </div>
  );
};

export default Search;
