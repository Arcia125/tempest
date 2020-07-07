import React, { FC } from 'react';

import './Button.css';
import { classNames } from '../utils';
import Typography, { Props as TypographyProps } from './Typography';

export interface Props extends TypographyProps {
  onClick: React.EventHandler<React.MouseEvent>;
}

export const Button: FC<Props> = ({
  children,
  className,
  color,
  onClick,
  ...restProps
}) => {
  return (
    <button
      onClick={onClick}
      className={classNames('AppButton', className, color)}
    >
      <Typography {...restProps}>{children}</Typography>
    </button>
  );
};

export const ContainedButton: FC<Props> = ({ className, ...restProps }) => {
  return (
    <Button {...restProps} className={classNames('Contained', className)} />
  );
};

ContainedButton.defaultProps = {
  color: 'charcoal',
};
