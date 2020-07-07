import React, { FC } from 'react';
import { classNames } from '../utils';

export interface Props {
  className: string;
}

export const Button: FC<Props> = ({ children, className }) => {
  return (
    <button className={classNames('AppButton', className)}>{children}</button>
  );
};
