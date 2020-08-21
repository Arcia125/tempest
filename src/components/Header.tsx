import React, { FC, useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import BadgeLayout from './BadgeLayout';
import './Header.css';
import { HeaderContainer } from './HeaderContainer';
import { RiotImage } from './RiotImage';
import SearchInput from './SearchInput';
import StatusIndicator from './StatusIndicator';
import Typography, { TypographyVariants } from './Typography';
import { useSearch } from '../hooks';
import { CurrentSummonerResponse } from '../shared/LCUResponses';
import { themeContext, ThemeMode } from '../theme';
import { RiotImageType } from '../types';
import { MatchMaking } from '../types';
import WindowControls from './WindowControls';

interface Props {
  summoner?: CurrentSummonerResponse;
  matchMaking: MatchMaking.Data;
}

const Header: FC<Props> = ({ summoner, matchMaking }) => {
  const { search, handleSearch, setter } = useSearch();

  const { theme } = useContext(themeContext);

  return (
    <HeaderContainer className="HeaderContainer">
      {summoner && (
        <Link to={`/summoner/profile/${summoner.displayName}`}>
          <BadgeLayout>
            <RiotImage
              type={RiotImageType.PROFILEICON}
              name={summoner.profileIconId?.toString() || ''}
            />
            <StatusIndicator
              status={
                matchMaking?.isCurrentlyInQueue ? 'searching' : 'creating'
              }
              className="status-indicator"
            />
          </BadgeLayout>
          <Typography variant={TypographyVariants.h2}>
            {summoner.displayName}
          </Typography>
        </Link>
      )}
      <Switch>
        <Route exact path="/">
          <div />
        </Route>
        <Route>
          <SearchInput
            variant={theme.mode === ThemeMode.DARK_GPU ? 'window' : 'opaque'}
            value={search}
            onChange={setter}
            onSearch={handleSearch}
          />
        </Route>
      </Switch>
      <WindowControls />
    </HeaderContainer>
  );
};

export default Header;
