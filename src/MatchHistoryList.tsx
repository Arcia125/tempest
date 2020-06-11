import React, { FC } from 'react';
import { MatchHistoryPreview } from './MatchHistoryPreview';
import { Maybe, MatchHistory } from './operations';

export interface Props {
  matchHistory?: Maybe<MatchHistory>;
}

export const MatchHistoryList: FC<Props> = ({ matchHistory }) => (
  <>
    {matchHistory?.matches?.map((matchHistoryItem, i) => (
      <MatchHistoryPreview key={i} matchHistoryItem={matchHistoryItem} />
    ))}
  </>
);
