import React, { FC, forwardRef } from 'react';

import './Button.css';
import { classNames } from '../utils';
import Typography, { Props as TypographyProps } from './Typography';
import { useStormScene } from '../hooks/useStormScene';

export interface Props extends TypographyProps {
  onClick: React.EventHandler<React.MouseEvent>;
}

export const Button: FC<Props> = forwardRef(
  ({ children, className, color, onClick, ...restProps }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref}
        className={classNames('AppButton', className, color)}
      >
        <Typography {...restProps}>{children}</Typography>
      </button>
    );
  }
);

export const ContainedButton: FC<Props> = ({ className, ...restProps }) => {
  return (
    <Button {...restProps} className={classNames('Contained', className)} />
  );
};

ContainedButton.defaultProps = {
  color: 'charcoal',
};

export const AnimatedButton: FC<Props> = ({
  className,
  children,
  ...restProps
}) => {
  const el = useStormScene();
  return (
    <Button
      {...restProps}
      ref={el}
      className={classNames('Animated', className)}
    >
      {children}
    </Button>
  );
};
