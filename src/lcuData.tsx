import React, { createContext, FC, useContext } from 'react';

import { LCUData } from './shared/LCUData';
import { Channels } from './shared/ipc';
import { useLcuDataConnection } from './hooks';
import { log } from './utils';

const { ipcRenderer } = window.require('electron');

export const lcuRequest = (endpoint: string, options: Partial<RequestInit>) => {
  return new Promise((resolve, reject) => {
    ipcRenderer.on(Channels.LCU_RESPONSE, (event: any, data: any) => {
      log.silly(event, data);
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

export const Provider: FC<{}> = ({ children }) => {
  const lcuData = useLcuDataConnection();

  return <lcuContext.Provider value={lcuData}>{children}</lcuContext.Provider>;
};

export const Consumer = lcuContext.Consumer;
