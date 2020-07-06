import { useState, useEffect } from 'react';

import { log } from '../utils';
import { Channels } from '../shared/ipc';

const { ipcRenderer } = window.require('electron');

export const useLcuDataConnection = () => {
  const [lcuData, setLcuData] = useState({});

  useEffect(() => {
    const handleLcuData: (event: any, ...args: any[]) => void = (
      event,
      data
    ) => {
      log.silly('received lcuData', data);
      setLcuData(data);
    };
    ipcRenderer.on(Channels.LCU_DATA, handleLcuData);
    ipcRenderer.send(Channels.GET_LCU_DATA, '');
    log.silly('asking for lcu-data');
    return () => {
      ipcRenderer.off(Channels.LCU_DATA, handleLcuData);
    };
  }, []);

  return lcuData;
};
