import React, { FC } from 'react';

import './Profile.css';
import UsernamePlate from './UsernamePlate';
import RankedBadge, { Props as RankedBadgeProps } from './RankedBadge';
import MatchHistory from './MatchHistory';
import { MatchHistory as IMatchHistory } from './types';

export interface Props {
  profileIconId: string | number;
  username: string;
  summonerLevel: string | number;
  matchHistory: IMatchHistory;
  rankedBadgeProps: RankedBadgeProps;
}

const Profile: FC<Props> = ({
  profileIconId,
  username,
  summonerLevel,
  matchHistory,
  rankedBadgeProps,
}) => {
  return (
    <div className="Profile">
      <div className="Profile-left">
        <UsernamePlate
          className="Profile-UsernamePlate"
          profileIconId={profileIconId}
          username={username}
          summonerLevel={summonerLevel}
        />
        <RankedBadge {...rankedBadgeProps} />
      </div>
      <MatchHistory matchHistory={matchHistory} />
    </div>
  );
};

export { Profile };
