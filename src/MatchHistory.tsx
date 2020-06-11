import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './MatchHistory.css';
import { MatchHistory as IMatchHistory } from './operations';
import { MatchHistoryList } from './MatchHistoryList';
import { Maybe } from './operations';

export interface Props {
  matchHistory?: Maybe<IMatchHistory>;
}

const MatchHistory: FC<Props> = ({ matchHistory }) => {
  return (
    <div className="MatchHistory">
      {<MatchHistoryList matchHistory={matchHistory} />}
    </div>
  );
};

MatchHistory.propTypes = {};

export default MatchHistory;
