import { useEffect } from 'react';

const { ipcRenderer } = window.require('electron');

export const useEventEffect = (
  channel: string,
  onEvent: (
    sender: any,
    event: { eventType: string; uri: string; data: any }
  ) => any
) =>
  useEffect(() => {
    console.log(`listening to channel ${channel}`);
    ipcRenderer.on(channel, onEvent);
    return () => {
      ipcRenderer.removeListener(channel, onEvent);
    };
  }, [channel, onEvent]);
