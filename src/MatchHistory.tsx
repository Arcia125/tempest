import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './MatchHistory.css';
import { MatchHistory as IMatchHistory, Summoner } from './operations';
import { MatchHistoryList } from './MatchHistoryList';
import { Maybe } from './operations';

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

MatchHistory.propTypes = {};

export default MatchHistory;
