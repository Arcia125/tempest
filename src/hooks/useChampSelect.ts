import { useState, useEffect } from 'react';
// import WebSocket from 'ws';
// import { useLcuContext } from './lcuData';


// const ws = new WebSocket();

export const useChampSelect = () => {
  // const lcuData = useLcuContext();
  // const listenToChampSelect = 
  const [inChampSelect, setInChampSelect] = useState(false);
  useEffect(() => {
    // if (!('username' in lcuData)) return;
    // let websocket = new LCUWebSocket(lcuData, '');
    // console.log(websocket);
    // websocket.onOpen(function () {
    //   console.log('opening websocket connection');
    //   websocket.on('OnJsonApiEvent' as , console.log);
    // })

    // websocket.on('message', console.log);
    // websocket.on('')
    // onChangeChampSelect();
    return () => {
      // websocket.off('message', console.log);
      // websocket.close();
      // offStartChampSelect();
    }
  }, [])
  return null;
};
