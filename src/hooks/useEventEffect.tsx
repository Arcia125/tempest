import { useEffect } from 'react';

import { log } from '../utils';

const { ipcRenderer } = window.require('electron');

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
