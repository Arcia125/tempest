import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import { RiotImage } from './RiotImage';
import { RiotImageType } from '../types';
import Typography, { TypographyVariants } from './Typography';
import { CurrentSummonerResponse } from '../shared/LCUResponses';
import { useSearch } from '../hooks/useSearch';
import SearchInput from './SearchInput';
import StatusIndicator from './StatusIndicator';
import * as matchMakingTypes from '../matchMakingTypes';
import BadgeLayout from './BadgeLayout';

interface Props {
  summoner?: CurrentSummonerResponse;
  matchMaking: matchMakingTypes.Data;
}

const Header: FC<Props> = ({ summoner, matchMaking }) => {
  const { search, handleSearch, setter } = useSearch();

  return (
    <header className="App-header">
      {/* <Link to="/">
          <Logo />
        </Link> */}
      {summoner && (
        <Link to={`/summoner/profile/${summoner.displayName}`}>
          {/* <div className="profile-icon"> */}
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
          {/* </div> */}
          <Typography variant={TypographyVariants.h2}>
            {summoner.displayName}
          </Typography>
        </Link>
      )}
      <SearchInput value={search} onChange={setter} onSearch={handleSearch} />
    </header>
  );
};

export default Header;
