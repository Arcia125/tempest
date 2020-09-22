import React, { createContext, FC, useContext } from 'react';
import { v4 as uuid } from 'uuid';
import { useLcuDataConnection } from './hooks';
import { Channels } from './shared/ipc';
import { LCUData } from './shared/LCUData';
import { log } from './utils';

const { ipcRenderer } = window.require('electron');

export const lcuRequest = (endpoint: string, options: Partial<RequestInit>) => {
  return new Promise((resolve, reject) => {
    const requestId = uuid();
    const handleIpcResponse = (event: any, response: any) => {
      // if this isn't the response for this request, skip it by returning
      if (response.requestId !== requestId) return;

      log.silly(event, response);
      if (response.error) {
        reject(response.error);
      } else {
        resolve(response.data);
      }

      // request fulfilled!
      ipcRenderer.off(Channels.LCU_RESPONSE, handleIpcResponse);
    };

    // listen for responses
    ipcRenderer.on(Channels.LCU_RESPONSE, handleIpcResponse);

    // send request
    ipcRenderer.send(Channels.LCU_REQUEST, {
      id: requestId,
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
