import React, { FC } from 'react';

import './Profile.css';
import UsernamePlate from './UsernamePlate';
import RankedBadge, { Props as RankedBadgeProps } from './RankedBadge';
import MatchHistory from './MatchHistory';
import { Maybe, MatchHistory as IMatchHistory } from '../operations';

export interface Props {
  profileIconId?: Maybe<string | number>;
  username?: Maybe<string>;
  summonerLevel?: Maybe<string | number>;
  summonerId?: Maybe<string>;
  matchHistory?: Maybe<IMatchHistory>;
  rankedBadgeProps?: RankedBadgeProps;
}

const Profile: FC<Props> = ({
  profileIconId,
  username,
  summonerLevel,
  matchHistory,
  rankedBadgeProps,
  summonerId,
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
      <div className="Profile-right">
        <MatchHistory matchHistory={matchHistory} summonerId={summonerId} />
      </div>
    </div>
  );
};

export { Profile };
