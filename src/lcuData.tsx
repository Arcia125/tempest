// import React, {
//   createContext,
//   useState,
//   useEffect,
//   FC,
//   useContext,
// } from 'react';

// import { LCUData } from './lcu';

// const { ipcRenderer } = window.require('electron');

// export const lcuContext = createContext<LCUData | {}>({});

// export const useLcuContext = () => useContext(lcuContext);

// export const useLcuDataConnection = () => {
//   const [lcuData, setLcuData] = useState({});

//   useEffect(() => {
//     const handleLcuData: (event: any, ...args: any[]) => void = (
//       event,
//       data
//     ) => {
//       setLcuData(data);
//     };
//     ipcRenderer.on('lcu-data', handleLcuData);
//     ipcRenderer.send('get-lcu-data', '');
//     return () => {
//       ipcRenderer.off('lcu-data', handleLcuData);
//     };
//   }, []);

//   return lcuData;
// };

// export const Provider: FC<{}> = ({ children }) => {
//   const lcuData = useLcuDataConnection();

//   return <lcuContext.Provider value={lcuData}>{children}</lcuContext.Provider>;
// };

// export const Consumer = lcuContext.Consumer;
