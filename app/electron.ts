import path from 'path';
import { app, BrowserWindow, nativeImage, ipcMain } from 'electron';
import isDev from 'electron-is-dev';
import LCUConnector from 'lcu-connector';
import { LCUConnection, LCUWebSocket, LCUData, LCU_SOCKET_TOPIC } from './lcu';

const iconUrl = path.resolve(__dirname, 'favicon.ico');

let mainWindow: BrowserWindow | null,
  socket: LCUWebSocket;

const indexHtmlPath = path.join(__dirname, './build/index.html');
const indexHtmlUrl = `file://${indexHtmlPath}`;
const lcuConnector = new LCUConnector();
const lcuConnection = new LCUConnection(lcuConnector).init();

// const lcuConnectionPromise = createLCUConnectionPromise(lcuConnector).then(data => {
//   if (mainWindow) mainWindow.webContents.send('lcu-data', data);
//   return data;
// });

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
    console.log('creating socket');
    socket = new LCUWebSocket(data as LCUData, '');
    socket.onOpen(() => {
      console.log('opened socket');
      socket.on(LCU_SOCKET_TOPIC.JSON_API_EVENT, (event: any) => {
        if (event?.uri?.includes('champ-select')) console.log(event);
        else if (typeof event['uri'] === 'string') console.log(event.uri);
      });
      socket.subscribe(LCU_SOCKET_TOPIC.JSON_API_EVENT);
    })
  })
});


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
