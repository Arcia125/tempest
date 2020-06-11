import React, { FC } from 'react';

import './Profile.css';
import UsernamePlate from './UsernamePlate';
import RankedBadge, { Props as RankedBadgeProps } from './RankedBadge';
import MatchHistory from './MatchHistory';
// import { MatchHistory as IMatchHistory } from './types';
import { Maybe, MatchHistory as IMatchHistory } from './operations';
// import { MatchHistory } from './types';

export interface Props {
  profileIconId?: Maybe<string | number>;
  username?: Maybe<string>;
  summonerLevel?: Maybe<string | number>;
  matchHistory?: Maybe<IMatchHistory>;
  rankedBadgeProps?: RankedBadgeProps;
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
          profileIconId={String(profileIconId)}
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
