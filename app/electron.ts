import path from 'path';
import { app, BrowserWindow, nativeImage, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import LCUConnector from 'lcu-connector';

import { LCUWebSocket, LCUData, LCU_SOCKET_TOPIC } from './lcu';

const iconUrl = path.resolve(__dirname, 'favicon.ico');

let mainWindow: BrowserWindow | null, socket: LCUWebSocket;

const indexHtmlPath = path.join(__dirname, './build/index.html');
const indexHtmlUrl = `file://${indexHtmlPath}`;
const lcuConnector = new LCUConnector();
const lcuConnectionPromise = new Promise((resolve, reject) => {
  let resolved = false;
  lcuConnector.on('connect', async (data) => {
    // console.log('Connected to LCU', data);
    if (!resolved) {
      resolve(data);
      resolved = true;
    }
    if (mainWindow) mainWindow.webContents.send('lcu-data', data);
  });
});

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

  ipcMain.on('get-lcu-data', (event, data) => {
    lcuConnectionPromise.then((data) => event.reply('lcu-data', data));
  });
  lcuConnector.start();

  lcuConnectionPromise.then(data => {
    console.log('creating socket');
    socket = new LCUWebSocket(data as LCUData, '');
    socket.onOpen(() => {
      console.log('opened socket');
      socket.on(LCU_SOCKET_TOPIC.JSONAPIEVENT, console.log);
      socket.subscribe(LCU_SOCKET_TOPIC.JSONAPIEVENT);
    })
  })
}

app.whenReady().then(createWindow);


app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
