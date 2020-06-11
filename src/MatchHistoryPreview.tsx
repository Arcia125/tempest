import React, { FC } from 'react';

import './MatchHistoryPreview.css';
import { RiotImageType } from './types';
import { RiotImage } from './RiotImage';
import { getImageNameByChampionKey } from './riotAsset';
import { championsByKey } from './championData';
import { MatchHistoryItem, Maybe } from './operations';

export interface Props {
  matchHistoryItem?: Maybe<MatchHistoryItem>;
}

export const MatchHistoryPreview: FC<Props> = ({ matchHistoryItem }) => (
  <div className="MatchHistoryPreview">
    <div
      className="MatchHistoryPreview-wl-tab"
      style={{ backgroundColor: 'red' }}
    />
    <RiotImage
      className="MatchHistoryPreview-champion-image"
      type={RiotImageType.CHAMPION}
      name={getImageNameByChampionKey(String(matchHistoryItem?.champion))}
      alt={
        matchHistoryItem?.champion
          ? championsByKey[matchHistoryItem.champion].name
          : ''
      }
    />
    <div>{/* <span>{matchHistoryItem}</span> */}</div>
  </div>
);
