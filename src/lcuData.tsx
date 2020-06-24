import React, { createContext, useState, useEffect, FC } from 'react';
const { ipcRenderer } = window.require('electron');

const lcuContext = createContext({});

export const useLcuData = () => {
  const [lcuData, setLcuData] = useState({});
  useEffect(() => {
    const handleLcuData: (event: any, ...args: any[]) => void = (
      event,
      data
    ) => {
      setLcuData(data);
    };
    ipcRenderer.on('lcu-data', handleLcuData);
    ipcRenderer.send('get-lcu-data', '');
    return () => {
      ipcRenderer.off('lcu-data', handleLcuData);
    };
  }, []);

  return lcuData;
};

export const Provider: FC<{}> = ({ children }) => {
  const lcuData = useLcuData();

  return <lcuContext.Provider value={lcuData}>{children}</lcuContext.Provider>;
};

export const Consumer = lcuContext.Consumer;
