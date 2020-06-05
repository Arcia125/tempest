import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './Profile.css';
import UsernamePlate from './UsernamePlate';
import RankedBadge, { Props as RankedBadgeProps } from './RankedBadge';
import MatchHistory from './MatchHistory';
import { MatchHistory as IMatchHistory } from './types';

export interface Props {
  username: string;
  summonerLevel: string | number;
  matchHistory: IMatchHistory;
  rankedBadgeProps: RankedBadgeProps;
}

const Profile: FC<Props> = ({
  username,
  summonerLevel,
  matchHistory,
  rankedBadgeProps,
}) => {
  return (
    <div className="Profile">
      <div className="Profile-left">
        <UsernamePlate username={username} summonerLevel={summonerLevel} />
        <RankedBadge {...rankedBadgeProps} />
      </div>
      <MatchHistory matchHistory={matchHistory} />
    </div>
  );
};

Profile.propTypes = {};

export { Profile };
