import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { HeaderContainer } from '../../components/HeaderContainer';
import SearchInput from '../../components/SearchInput';
import { useSearch } from '../../hooks';
import { Logo } from '../../components/Logo';
import { ContainedButton } from '../../components/Button';
import { TypographyVariants } from '../../components/Typography';

const LoginLinks = () => {
  const history = useHistory();
  return (
    <ContainedButton
      variant={TypographyVariants.p}
      color="orangeRed"
      onClick={(e) => history.push('/create-account')}
    >
      Create Account
    </ContainedButton>
  );
};

export const Header: FC = (props) => {
  const { search, setter, handleSearch } = useSearch();
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo />
      </Link>
      <SearchInput value={search} onChange={setter} onSearch={handleSearch} />
      <LoginLinks />
    </HeaderContainer>
  );
};
