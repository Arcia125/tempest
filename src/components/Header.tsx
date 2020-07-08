import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import { RiotImage } from './RiotImage';
import { RiotImageType } from '../types';
import Typography, { TypographyVariants } from './Typography';
import { CurrentSummonerResponse } from '../shared/LCUResponses';
import { useSearch } from '../hooks';
import SearchInput from './SearchInput';
import StatusIndicator from './StatusIndicator';
import { MatchMaking } from '../types';
import BadgeLayout from './BadgeLayout';
import { HeaderContainer } from './HeaderContainer';

interface Props {
  summoner?: CurrentSummonerResponse;
  matchMaking: MatchMaking.Data;
}

const Header: FC<Props> = ({ summoner, matchMaking }) => {
  const { search, handleSearch, setter } = useSearch();

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
      <SearchInput
        variant="opaque"
        value={search}
        onChange={setter}
        onSearch={handleSearch}
      />
    </HeaderContainer>
  );
};

export default Header;
