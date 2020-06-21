import React, { FC, useState } from 'react';

import './Search.css';
import Typography, { TypographyVariants } from './Typography';
import StormIcon from './StormIcon';
import SearchInput from './SearchInput';
import { useHistory } from 'react-router';

export interface Props {}

const Search: FC<Props> = (props) => {
  const [search, setSearch] = useState('');
  const setter: React.ChangeEventHandler<HTMLInputElement> = (event) =>
    setSearch(event.target.value);
  const history = useHistory();

  const handleSearch = () => {
    if (search) history.push(`/summoner/profile/${search}`);
  };

  return (
    <div className="Search">
      <StormIcon className="Search-storm" />
      <main className="Search-main">
        <Typography id="Search-label" variant={TypographyVariants.h2}>
          Find a summoner
        </Typography>
        <SearchInput value={search} onChange={setter} onSearch={handleSearch} />
      </main>
    </div>
  );
};

export default Search;
