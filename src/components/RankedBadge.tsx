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
        <Typography
          className="RankedBadge-queue"
          variant={TypographyVariants.p}
          fontWeight="300"
        >
          {queue}
        </Typography>
        <Typography
          variant={TypographyVariants.p}
          textTransform="capitalize"
          fontWeight="600"
          color="accent4"
        >
          {tier} {rank}
        </Typography>
      </div>
    </div>
  );
};

RankedBadge.propTypes = {};

export default RankedBadge;
