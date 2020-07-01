import React, {
  createContext,
  useState,
  useEffect,
  FC,
  useContext,
} from 'react';

import { LCUData } from './shared/LCUData';
import { Channels } from './shared/ipc';

const { ipcRenderer } = window.require('electron');

export const lcuRequest = (endpoint: string, options: Partial<RequestInit>) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.on(Channels.LCU_RESPONSE, (event: any, data: any) => {
      console.log(event, data);
      resolve(data);
    });
    ipcRenderer.send(Channels.LCU_REQUEST, {
      endpoint,
      options: { ...options },
    });
  });
};

export const lcuContext = createContext<LCUData | {}>({});

export const useLcuContext = () => useContext(lcuContext);

export const useLcuDataConnection = () => {
  const [lcuData, setLcuData] = useState({});

  useEffect(() => {
    const handleLcuData: (event: any, ...args: any[]) => void = (
      event,
      data
    ) => {
      console.log('received lcuData', data);
      setLcuData(data);
    };
    ipcRenderer.on(Channels.LCU_DATA, handleLcuData);
    ipcRenderer.send(Channels.GET_LCU_DATA, '');
    console.log('asking for lcu-data');
    return () => {
      ipcRenderer.off(Channels.LCU_DATA, handleLcuData);
    };
  }, []);

  return lcuData;
};

export const Provider: FC<{}> = ({ children }) => {
  const lcuData = useLcuDataConnection();

  return <lcuContext.Provider value={lcuData}>{children}</lcuContext.Provider>;
};

export const Consumer = lcuContext.Consumer;
