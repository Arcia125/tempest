import React from 'react';
import PropTypes from 'prop-types';

import './RankedBadge.css';

const RankedBadge = ({ league, rank }) => {
  return (
    <div className="RankedBadge">
      <p>{league}</p>
      <p>{rank}</p>
    </div>
  );
};

RankedBadge.propTypes = {};

export default RankedBadge;
