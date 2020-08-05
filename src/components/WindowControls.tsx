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
      <Button onClick={handleMinimize} variant={TypographyVariants.p}>
        <FiMinus />
      </Button>
      <Button onClick={handleMaximizeRestore} variant={TypographyVariants.p}>
        {isMaximized ? <FiCopy /> : <FiMaximize />}
      </Button>
      <Button onClick={handleClose} variant={TypographyVariants.p}>
        <FiX />
      </Button>
    </div>
  );
};

export default WindowControls;
