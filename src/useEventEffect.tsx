import { useEffect } from 'react';

const { ipcRenderer } = window.require('electron');
const log = window.require('electron-log');

export const useEventEffect = (
  channel: string,
  onEvent: (
    sender: any,
    event: { eventType: string; uri: string; data: any }
  ) => any
) =>
  useEffect(() => {
    log.silly(`listening to channel ${channel}`);
    ipcRenderer.on(channel, onEvent);
    return () => {
      ipcRenderer.removeListener(channel, onEvent);
    };
  }, [channel, onEvent]);
