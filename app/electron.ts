import path from 'path';
import { app, BrowserWindow, nativeImage, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import LCUConnector from 'lcu-connector';

import { LCUPluginEvent } from '../src/shared/LCUPluginEvent';
import { LCUData } from '../src/shared/LCUData';
import { LCUSocketTopic, LCUConnection, LCUWebSocket, LCUEventEmitter } from './lcu';

const iconUrl = path.resolve(__dirname, 'favicon.ico');

let mainWindow: BrowserWindow | null,
  socket: LCUWebSocket;

const indexHtmlPath = path.join(__dirname, './build/index.html');
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
  // mainWindow.loadURL('http://localhost:3000');
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : indexHtmlUrl);
  mainWindow.on('closed', () => (mainWindow = null));
}


app.whenReady().then(createWindow);

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

app.on('browser-window-created', (event) => {
  ipcMain.on('get-lcu-data', (event, data) => {
    lcuConnection.getLCUData().then((data) => event.reply('lcu-data', data));
  });

  lcuConnection.getLCUData().then(data => {
    socket = new LCUWebSocket(data as LCUData, '');
    socket.onOpen(() => {
      socket.on(LCUSocketTopic.JSON_API_EVENT, (event: any) => {
        if (typeof event?.uri === 'string') lcuEmitter.handleJsonApiEvent(event);
        else console.error(`Unexpected event emitted by LCUWebSocket ${JSON.stringify(event)}`);
        // if (event?.uri?.includes('champ-select')) console.log(event);
        // else if (typeof event['uri'] === 'string') console.log(event.uri);
      });
      socket.subscribe(LCUSocketTopic.JSON_API_EVENT);
      lcuEmitter.registerWindowEmitters(mainWindow, Object.values(LCUPluginEvent))
    })
  })
});



// lcuEmitter.on(LCUPluginEvent.CHAMP_SELECT, event => {
//   ipcMain.emit(LCUPluginEvent.CHAMP_SELECT, event);
// });

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

