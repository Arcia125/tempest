import React, { FC, useContext } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import BadgeLayout from './BadgeLayout';
import ControlledSearchInput from './ControlledSearchInput';
import './Header.css';
import { HeaderContainer } from './HeaderContainer';
import { RiotImage } from './RiotImage';
import StatusIndicator from './StatusIndicator';
import Typography, { TypographyVariants } from './Typography';
import WindowControls from './WindowControls';
import {
  CurrentSummonerResponse,
  CurrentRegionResponse,
} from '../shared/LCUResponses';
import { themeContext, ThemeMode } from '../theme';
import { RiotImageType } from '../types';
import { MatchMaking } from '../types';

interface Props {
  region?: CurrentRegionResponse;
  summoner?: CurrentSummonerResponse;
  matchMaking: MatchMaking.Data;
}

const Header: FC<Props> = ({ summoner, matchMaking, region }) => {
  const { theme } = useContext(themeContext);
  return (
    <HeaderContainer className="HeaderContainer">
      {summoner && (
        <Link
          to={`/summoner/profile/${region?.webRegion}/${summoner.displayName}`}
        >
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
          <ControlledSearchInput
            className="Header-SearchInput"
            variant={theme.mode === ThemeMode.DARK_GPU ? 'window' : 'opaque'}
          />
        </Route>
      </Switch>
      <WindowControls />
    </HeaderContainer>
  );
};

export default Header;
