import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './MatchHistory.css';
import { MatchHistory as IMatchHistory } from './types';
import { MatchHistoryList } from './MatchHistoryList';

export interface Props {
  matchHistory: IMatchHistory;
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
