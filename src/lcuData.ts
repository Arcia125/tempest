import { createContext, useState, useEffect } from 'react';
const { ipcRenderer } = window.require('electron');

export const lcuContext = createContext({});

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
}
