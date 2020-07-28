import React, { createContext, FC, useContext } from 'react';
import { useLcuDataConnection } from './hooks';
import { Channels } from './shared/ipc';
import { LCUData } from './shared/LCUData';
import { log } from './utils';

const { ipcRenderer } = window.require('electron');

export const lcuRequest = (endpoint: string, options: Partial<RequestInit>) => {
  return new Promise((resolve, reject) => {
    const handleIpcResponse = (event: any, data: any) => {
      log.silly(event, data);
      if (data.error) {
        reject(data.error);
      } else {
        resolve(data);
      }
      ipcRenderer.off(Channels.LCU_RESPONSE, handleIpcResponse);
    };
    ipcRenderer.on(Channels.LCU_RESPONSE, handleIpcResponse);
    ipcRenderer.send(Channels.LCU_REQUEST, {
      endpoint,
      options: { ...options },
    });
  });
};

export const lcuContext = createContext<LCUData | null>(null);

export const useLcuContext = () => useContext(lcuContext);

export const Provider: FC<{}> = ({ children }) => {
  const lcuData = useLcuDataConnection();

  return <lcuContext.Provider value={lcuData}>{children}</lcuContext.Provider>;
};

export const Consumer = lcuContext.Consumer;
