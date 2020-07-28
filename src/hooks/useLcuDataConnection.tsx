import { useEffect, useState } from 'react';
import { Channels } from '../shared/ipc';
import { log } from '../utils';

const { ipcRenderer } = window.require('electron');

export const useLcuDataConnection = () => {
  const [lcuData, setLcuData] = useState(null);

  useEffect(() => {
    const handleLcuData: (event: any, ...args: any[]) => void = (
      event,
      data
    ) => {
      log.silly('received lcuData', data);
      setLcuData(data);
    };
    ipcRenderer.on(Channels.LCU_DATA, handleLcuData);
    log.silly('asking for lcu-data');
    ipcRenderer.send(Channels.GET_LCU_DATA, '');
    return () => {
      ipcRenderer.off(Channels.LCU_DATA, handleLcuData);
    };
  }, []);

  return lcuData;
};
