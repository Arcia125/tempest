import React, { useState, useEffect } from 'react';
import { listen } from '../utils';

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

export function useWindowControls() {
  const { isMaximized } = useMaximized();
  const handleMinimize = (e: React.MouseEvent) => {
    e.target.blur();
    remote.BrowserWindow.getFocusedWindow().minimize();
  };

  const handleMaximizeRestore = (e: React.MouseEvent) => {
    e.target.blur();
    const win = remote.BrowserWindow.getFocusedWindow();
    win.isMaximized() ? win.restore() : win.maximize();
  };

  const handleClose = (e: React.MouseEvent) => {
    e.target.blur();
    remote.BrowserWindow.getFocusedWindow().close();
  };

  return { isMaximized, handleMinimize, handleMaximizeRestore, handleClose };
}
