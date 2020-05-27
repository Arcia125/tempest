import React from 'react';
import PropTypes from 'prop-types';

import './UsernamePlate.css';

const UsernamePlate = ({ username }) => {
  return <div className="UsernamePlate">{username}</div>;
};

UsernamePlate.propTypes = {};

export default UsernamePlate;
