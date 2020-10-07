import React, { FC } from 'react';
import { FiX, FiMaximize, FiCopy, FiMinus } from 'react-icons/fi';
import { classNames } from '../utils';
import { Button } from './Button';
import { TypographyVariants } from './Typography';
import { useWindowControls } from '../hooks/useWindowControls';
import './WindowControls.css';
interface Props {
  className?: string;
}

const WindowControls: FC<Props> = ({ className }) => {
  const {
    isMaximized,
    handleMinimize,
    handleMaximizeRestore,
    handleClose,
  } = useWindowControls();

  return (
    <div className={classNames('WindowControls', className)}>
      <Button
        tabIndex="-1"
        onClick={handleMinimize}
        variant={TypographyVariants.p}
      >
        <FiMinus />
      </Button>
      <Button
        tabIndex="-1"
        onClick={handleMaximizeRestore}
        variant={TypographyVariants.p}
      >
        {isMaximized ? <FiCopy /> : <FiMaximize />}
      </Button>
      <Button
        tabIndex="-1"
        onClick={handleClose}
        variant={TypographyVariants.p}
      >
        <FiX />
      </Button>
    </div>
  );
};

export default WindowControls;
