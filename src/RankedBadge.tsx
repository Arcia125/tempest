import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './RankedBadge.css';
import Typography, { TypographyVariants } from './Typography';

export interface Props {
  tier: string;
  rank: string | number;
  queue: string;
}

const RankedBadge: FC<Props> = ({ tier, rank, queue }) => {
  return (
    <div className="RankedBadge">
      <Typography variant={TypographyVariants.p}>{queue}</Typography>
      <img
        className="RankedBadge-emblem"
        src={`${
          process.env.PUBLIC_URL
        }ranked-emblems/${tier?.toLowerCase()}.png`}
      />
      <div className="RankedBadge-tier-rank">
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
