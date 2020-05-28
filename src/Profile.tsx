import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './Profile.css';
import UsernamePlate from './UsernamePlate';
import RankedBadge from './RankedBadge';
import MatchHistory from './MatchHistory';

export interface Props {
  username: string;
  league: string;
  rank: string;
  summonerLevel: string;
}

const Profile: FC<Props> = ({ username, league, rank, summonerLevel }) => {
  return (
    <div className="Profile">
      <div>
        <UsernamePlate username={username} summonerLevel={summonerLevel} />
        <RankedBadge league={league} rank={rank} />
      </div>
      <MatchHistory />
    </div>
  );
};

Profile.propTypes = {};

export { Profile };
