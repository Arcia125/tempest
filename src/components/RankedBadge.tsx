import React, { FC } from 'react';

import './RankedBadge.css';
import Typography, { TypographyVariants } from './Typography';
import { Maybe } from '../operations';
import { pubUrl } from '../utils';

export interface Props {
  tier?: Maybe<string>;
  rank?: Maybe<string | number>;
  queue?: Maybe<string>;
}

const getEmblemUrl = (tier: string) =>
  pubUrl(`ranked-emblems/${tier.toLowerCase()}.png`);

const RankedBadge: FC<Props> = ({ tier, rank, queue }) => {
  return !(tier && rank && queue) ? null : (
    <div className="RankedBadge">
      <img
        className="RankedBadge-emblem"
        // src={`${
        //   process.env.PUBLIC_URL
        // }/ranked-emblems/${tier.toLowerCase()}.png`}
        src={getEmblemUrl(tier)}
        alt={`Ranked emblem - ${tier}`}
      />
      <div className="RankedBadge-tier-rank">
        <Typography variant={TypographyVariants.p}>{queue}</Typography>
        <Typography variant={TypographyVariants.p} textTransform="capitalize">
          {tier}
        </Typography>
        <Typography className="RankedBadge-rank" variant={TypographyVariants.p}>
          {rank}
        </Typography>
      </div>
    </div>
  );
};

RankedBadge.propTypes = {};

export default RankedBadge;
