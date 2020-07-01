import React, { FC } from 'react';
import { Link } from 'react-router-dom';

import { Summoner } from './operations';
import { RiotImage } from './RiotImage';
import { RiotImageType } from './types';
import Typography, { TypographyVariants } from './Typography';

interface Props {
  summoner?: Summoner;
}

const Header: FC<Props> = ({ summoner }) => {
  return (
    <header className="App-header">
      {/* <Link to="/">
          <Logo />
        </Link> */}
      {summoner && (
        <Link to={`/summon/profile/${summoner.name}`}>
          <RiotImage
            className="profile-icon"
            type={RiotImageType.PROFILEICON}
            name={summoner.profileIconId?.toString() || ''}
          />
          <Typography variant={TypographyVariants.h2}>
            {summoner.name}
          </Typography>
        </Link>
      )}
    </header>
  );
};

export default Header;
