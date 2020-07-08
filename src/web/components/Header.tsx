import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Header.css';
import { HeaderContainer } from '../../components/HeaderContainer';
import SearchInput from '../../components/SearchInput';
import { useSearch } from '../../hooks';
import { Logo } from '../../components/Logo';
import { ContainedButton, Button } from '../../components/Button';
import { TypographyVariants } from '../../components/Typography';
import { classNames } from '../../utils';

const LoginLinks: FC<{ className?: string }> = ({ className }) => {
  const history = useHistory();
  return (
    <div className={classNames('LoginLinks', className)}>
      <Button
        variant={TypographyVariants.p}
        onClick={(e) => history.push('/login')}
      >
        Login
      </Button>
      <ContainedButton
        variant={TypographyVariants.p}
        color="orangeRed"
        onClick={(e) => history.push('/create-account')}
      >
        Create Account
      </ContainedButton>
    </div>
  );
};

export const Header: FC = (props) => {
  const { search, setter, handleSearch } = useSearch();

  return (
    <HeaderContainer className="HeaderContainer">
      <Link to="/">
        <Logo />
      </Link>
      <SearchInput
        variant="window"
        value={search}
        onChange={setter}
        onSearch={handleSearch}
      />
      <LoginLinks />
    </HeaderContainer>
  );
};
