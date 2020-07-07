import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { HeaderContainer } from '../../components/HeaderContainer';
import SearchInput from '../../components/SearchInput';
import { useSearch } from '../../hooks';
import { Logo } from '../../components/Logo';

export const Header: FC = (props) => {
  const { search, setter, handleSearch } = useSearch();
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo />
      </Link>
      <SearchInput value={search} onChange={setter} onSearch={handleSearch} />
    </HeaderContainer>
  );
};
