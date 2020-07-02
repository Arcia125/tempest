import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import './Header.css';
import { RiotImage } from './RiotImage';
import { RiotImageType } from '../types';
import Typography, { TypographyVariants } from './Typography';
import { CurrentSummonerResponse } from '../shared/LCUResponses';

interface Props {
  summoner?: CurrentSummonerResponse;
}

const Header: FC<Props> = ({ summoner }) => {
  return (
    <header className="App-header">
      {/* <Link to="/">
          <Logo />
        </Link> */}
      {summoner && (
        <Link to={`/summoner/profile/${summoner.displayName}`}>
          <RiotImage
            className="profile-icon"
            type={RiotImageType.PROFILEICON}
            name={summoner.profileIconId?.toString() || ''}
          />
          <Typography variant={TypographyVariants.h2}>
            {summoner.displayName}
          </Typography>
        </Link>
      )}
    </header>
  );
};

export default Header;
