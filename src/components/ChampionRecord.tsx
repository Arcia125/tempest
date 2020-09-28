import React from 'react';
import { getImageNameByChampionKey } from '../data';
import Typography, { TypographyVariants } from './Typography';
import { RiotImage } from './RiotImage';
import { RiotImageType } from '../types';

export function ChampionRecord({ champRecord }: any): JSX.Element {
  return (
    <div key={champRecord.key}>
      <RiotImage
        type={RiotImageType.CHAMPION}
        name={getImageNameByChampionKey(String(champRecord.key))}
      />
      <Typography variant={TypographyVariants.p}>
        {champRecord.win === 0
          ? 0
          : (champRecord.win / (champRecord.win + champRecord.loss)) * 100}
        %
      </Typography>
    </div>
  );
}
