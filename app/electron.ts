import {
  app,
  BrowserWindow,
  ipcMain,
  nativeImage
  } from 'electron';
import isDev from 'electron-is-dev';
import log from 'electron-log';
import LCUConnector from 'lcu-connector';
import fetch from 'node-fetch';
import path from 'path';
import {
  LCUConnection,
  LCUEventEmitter,
  LCUSocketTopic,
  LCUWebSocket
  } from './lcu';
import { getLcuUrl } from '../src/shared/getLcuUrl';
import { Channels } from '../src/shared/ipc';
import { LCUData } from '../src/shared/LCUData';
import { LCUPluginEvent } from '../src/shared/LCUPluginEvent';


// if (isDev) {
//   require('electron-reload')(__dirname);
// }

const iconUrl = path.resolve(__dirname, '..', '..', 'public', 'favicon.ico');

let mainWindow: BrowserWindow | null,
  socket: LCUWebSocket;

const indexHtmlPath = path.join(__dirname, '../../build/index.html');
const indexHtmlUrl = `file://${indexHtmlPath}`;
const lcuConnector = new LCUConnector();
const lcuConnection = new LCUConnection(lcuConnector).init();
const lcuEmitter = new LCUEventEmitter();

function createWindow() {
  // Create the browser window.
  const width = 800;
  const height = 600;
  mainWindow = new BrowserWindow({
    width,
    height,
    icon: nativeImage.createFromPath(iconUrl),
    autoHideMenuBar: true,
    minWidth: width * .9,
    minHeight: height * .9,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // and load the index.html of the app.     win.loadFile('index.html')
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : indexHtmlUrl);
  mainWindow.on('closed', () => (mainWindow = null));
}


app.whenReady().then(createWindow);

app.on('activate', () => {
  log.info('activate')
  if (mainWindow === null) createWindow();
});

app.on('browser-window-created', (event) => {
  ipcMain.on(Channels.GET_LCU_DATA, (event, data) => {
    log.info('received request for lcu-data');
    lcuConnection.getLCUData().then((data) => event.reply(Channels.LCU_DATA, data));
  });
  lcuConnection.getLCUData().then(data => {
    ipcMain.on(Channels.LCU_REQUEST, (event, eventData) => {
      log.info(Channels.LCU_REQUEST, eventData);
      fetch(getLcuUrl(lcuConnection.lcuData, eventData.endpoint, 'https'), {
        method: eventData.options.method,
      }).then(async (res: any) => {
        const response = await res.json();
        log.info(Channels.LCU_RESPONSE, response);
        event.reply(Channels.LCU_RESPONSE, response)
      }).catch(err => {
        log.error(err);
        event.reply(Channels.LCU_RESPONSE, { error: err });
      })
    });
    socket = new LCUWebSocket(data as LCUData, '');
    socket.onOpen(() => {
      socket.on(LCUSocketTopic.JSON_API_EVENT, (event: any) => {
        if (typeof event?.uri === 'string') lcuEmitter.handleJsonApiEvent(event);
        else log.error(`Unexpected event emitted by LCUWebSocket ${JSON.stringify(event)}`);
      });
      socket.subscribe(LCUSocketTopic.JSON_API_EVENT);
      lcuEmitter.registerWindowEmitters(mainWindow, Object.values(LCUPluginEvent))
    })
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

