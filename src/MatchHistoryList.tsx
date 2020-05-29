import React, { FC } from 'react';
import { MatchHistory } from './types';
import { MatchHistoryPreview } from './MatchHistoryPreview';

export interface Props {
  matchHistory: MatchHistory;
}

export const MatchHistoryList: FC<Props> = ({ matchHistory }) => (
  <>
    {matchHistory.matches.map((matchHistoryItem, i) => (
      <MatchHistoryPreview key={i} matchHistoryItem={matchHistoryItem} />
    ))}
  </>
);
