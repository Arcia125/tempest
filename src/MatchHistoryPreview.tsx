import React, { FC } from 'react';

import { MatchHistoryItem, RiotImageType } from './types';
import { RiotImage } from './RiotImage';
import { getImageNameByChampionKey } from './riotAsset';
import { championsByKey } from './championData';

export interface Props {
  matchHistoryItem: MatchHistoryItem;
}

export const MatchHistoryPreview: FC<Props> = ({ matchHistoryItem }) => (
  <div className="MatchHistoryPreview">
    <div className="MatchHistoryPreview-wl-tab" />
    <RiotImage
      type={RiotImageType.CHAMPION}
      name={getImageNameByChampionKey(String(matchHistoryItem.champion))}
      alt={championsByKey[matchHistoryItem.champion].name}
    />
    <div>{/* <span>{matchHistoryItem}</span> */}</div>
  </div>
);
