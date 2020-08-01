import React, { FC, useState, useEffect } from 'react';
import { FiX, FiMaximize, FiCopy, FiMinus } from 'react-icons/fi';
import { classNames, listen } from '../utils';
import { Button } from './Button';
import { TypographyVariants } from './Typography';

interface Props {
  className?: string;
}
const { remote } = window.require('electron');

function useMaximizedListener(
  setIsMaximized: React.Dispatch<React.SetStateAction<null>>
) {
  useEffect(() => {
    const unlisten = listen(window, 'resize', () => {
      const maximized = remote.BrowserWindow.getFocusedWindow()?.isMaximized();
      setIsMaximized(maximized);
    });
    return () => {
      unlisten();
    };
  }, [setIsMaximized]);
}

function useMaximized() {
  const [isMaximized, setIsMaximized] = useState(null);

  useMaximizedListener(setIsMaximized);

  return { isMaximized };
}

const WindowControls: FC<Props> = ({ className }) => {
  const { isMaximized } = useMaximized();
  const handleMinimize = () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
  };

  const handleMaximizeRestore = () => {
    const win = remote.BrowserWindow.getFocusedWindow();
    win.isMaximized() ? win.restore() : win.maximize();
  };

  const handleClose = () => {
    remote.BrowserWindow.getFocusedWindow().close();
  };

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
