import React, { FC } from 'react';

import './HeaderContainer.css';
import { classNames } from '../utils';

export interface Props {
  className?: string;
}

export const HeaderContainer: FC<Props> = ({ children, className }) => (
  <header className={classNames('App-header', className)}>{children}</header>
);
