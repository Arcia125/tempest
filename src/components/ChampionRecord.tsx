import React, { FC } from 'react';
import './ChampionRecord.css';
import { RiotImage } from './RiotImage';
import Typography, { TypographyVariants } from './Typography';
import { RiotImageType } from '../types';
import {
  getImageNameByChampionKey,
  ChampionRecord as IChampionRecord,
  getChampionName,
} from '../data';
import { ColorRange } from '../utils';

export interface Props {
  champRecord: IChampionRecord['any'] & { key: string };
}

const winPctColorRange = new ColorRange([
  { min: 0, color: 'text' },
  { min: 50, color: 'accent4' },
  { min: 65, color: 'accent0' },
]);

export const ChampionRecord: FC<Props> = ({ champRecord }) => {
  const winPct =
    champRecord.win === 0
      ? 0
      : (champRecord.win / (champRecord.win + champRecord.loss)) * 100;
  const championName = getChampionName(champRecord.key);
  return (
    <div className="ChampionRecord" key={champRecord.key}>
      <RiotImage
        className="ChampionRecord-champion-image"
        alt={championName}
        type={RiotImageType.CHAMPION}
        name={getImageNameByChampionKey(String(champRecord.key))}
      />
      <div className="ChampionRecord-info">
        <div className="ChampionRecord-info-top">
          <Typography fontWeight="600" variant={TypographyVariants.p}>
            {championName}
          </Typography>
        </div>
        <div className="ChampionRecord-info-bottom">
          <Typography
            className="ChampionRecord-win-pct"
            variant={TypographyVariants.p}
            color={winPctColorRange.interpolate(winPct)}
          >
            {winPct}%
          </Typography>
          <Typography
            className="ChampionRecord-win-count"
            variant={TypographyVariants.xs}
          >
            {champRecord.win}W
          </Typography>
          <Typography
            className="ChampionRecord-divider"
            variant={TypographyVariants.xs}
          >
            /
          </Typography>
          <Typography
            className="ChampionRecord-loss-count"
            variant={TypographyVariants.xs}
          >
            {champRecord.loss}L
          </Typography>
        </div>
      </div>
    </div>
  );
};
