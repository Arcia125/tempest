import React, { FC, forwardRef, PropsWithChildren } from 'react';
import './Button.css';
import Typography, { Props as TypographyProps } from './Typography';
import { useStormScene } from '../hooks';
import { classNames } from '../utils';

export interface Props extends PropsWithChildren<TypographyProps> {
  onClick?: React.EventHandler<React.MouseEvent>;
  tabIndex: string;
}

export const Button = forwardRef<FC<Props>, Props>(
  ({ children, className, color, onClick, tabIndex, ...restProps }, ref) => {
    return (
      <button
        onClick={onClick}
        ref={ref as any}
        tabIndex={tabIndex as any}
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
  color: 'fg1',
};

export const AnimatedButton: FC<Props> = ({
  className,
  children,
  ...restProps
}) => {
  const [el] = useStormScene();
  return (
    <Button
      {...restProps}
      ref={el as any}
      className={classNames('Animated', className)}
    >
      {children}
    </Button>
  );
};
