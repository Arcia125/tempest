import React, { FC } from 'react';
import PropTypes from 'prop-types';

import './UsernamePlate.css';
import Typography, { TypographyVariants } from './Typography';
import { createClassNameGenerator } from './createClassNameGenerator';
import { RiotImage } from './RiotImage';
import { RiotImageType } from './types';

export interface Props {
  profileIconId: string;
  username: string;
  summonerLevel: string | number;
  className?: string;
}

const classNameGenerator = createClassNameGenerator('UsernamePlate');

const UsernamePlate: FC<Props> = ({
  profileIconId,
  username,
  summonerLevel,
  className,
}) => {
  return (
    <div className={classNameGenerator(className)}>
      <RiotImage
        className="profile-icon"
        type={RiotImageType.PROFILEICON}
        name={profileIconId}
      />
      <Typography variant={TypographyVariants.h2}>{username}</Typography>
    </div>
  );
};

UsernamePlate.propTypes = {};

export default UsernamePlate;
