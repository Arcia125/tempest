export const log = typeof window !== 'undefined' ? window.require ? window.require('electron-log') : {
  ...console,
  info: console.log,
  silly: console.log,
} : require('electron-log');
