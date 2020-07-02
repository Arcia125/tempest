import React, { FC } from 'react';

import './MatchHistory.css';
import { MatchHistory as IMatchHistory, Maybe } from '../operations';
import { MatchHistoryList } from './MatchHistoryList';

export interface Props {
  matchHistory?: Maybe<IMatchHistory>;
  summonerId?: Maybe<string>;
}

const MatchHistory: FC<Props> = ({ matchHistory, summonerId }) => {
  return (
    <div className="MatchHistory">
      {<MatchHistoryList matchHistory={matchHistory} summonerId={summonerId} />}
    </div>
  );
};

export default MatchHistory;
