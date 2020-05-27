import React from 'react';
import PropTypes from 'prop-types';

import UsernamePlate from './UsernamePlate';
import RankedBadge from './RankedBadge';
import MatchHistory from './MatchHistory';

const Profile = (props) => {
  return (
    <div>
      <div>
        <UsernamePlate username="Arcia125" />
        <RankedBadge league="Ranked Solo" rank="Silver 4" />
      </div>
      <MatchHistory />
    </div>
  );
};

Profile.propTypes = {};

export { Profile };
