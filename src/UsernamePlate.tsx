import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './UsernamePlate.css';

export interface Props {
  username: string;
  summonerLevel: string | number;
}

const UsernamePlate: FC<Props> = ({ username, summonerLevel }) => {
  return <div className="UsernamePlate">{username}</div>;
};

UsernamePlate.propTypes = {};

export default UsernamePlate;
