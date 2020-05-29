import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './Profile.css';
import UsernamePlate from './UsernamePlate';
import RankedBadge from './RankedBadge';
import MatchHistory from './MatchHistory';
import { MatchHistory as IMatchHistory, LeagueEntries } from './types';

export interface Props {
  username: string;
  league: string;
  rank: string;
  summonerLevel: string;
  matchHistory: IMatchHistory;
  leagueEntries: LeagueEntries;
}

const Profile: FC<Props> = ({
  username,
  league,
  rank,
  summonerLevel,
  matchHistory,
}) => {
  return (
    <div className="Profile">
      <div>
        <UsernamePlate username={username} summonerLevel={summonerLevel} />
        <RankedBadge league={league} rank={rank} />
      </div>
      <MatchHistory matchHistory={matchHistory} />
    </div>
  );
};

Profile.propTypes = {};

export { Profile };
