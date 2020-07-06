import { useEffect } from 'react';

import { log } from '../utils';

type useEventEffectFn = (
  channel: string,
  onEvent: (
    sender: any,
    event: { eventType: string; uri: string; data: any }
  ) => any
) => void;

let useEventEffect: useEventEffectFn;
if (typeof window.require === 'function') {
  const { ipcRenderer } = window.require('electron');

  useEventEffect = (channel, onEvent) =>
    useEffect(() => {
      log.silly(`listening to channel ${channel}`);
      ipcRenderer.on(channel, onEvent);

      return () => {
        ipcRenderer.removeListener(channel, onEvent);
      };
    }, [channel, onEvent]);
} else {
  useEventEffect = () => {
    throw new Error(
      'useEventEffect is not supported outside of electron context'
    );
  };
}

export { useEventEffect };
