const path = require('path');
const { app, BrowserWindow, nativeImage, ipcMain } = require('electron');
const isDev = require('electron-is-dev');
const LCUConnector = require('lcu-connector');

const iconUrl = path.resolve(__dirname, 'favicon.ico');

let mainWindow;

const indexHtmlPath = path.join(__dirname, './build/index.html');
const indexHtmlUrl = `file://${indexHtmlPath}`;
const lcuConnector = new LCUConnector();
const lcuDataPromise = new Promise((resolve, reject) => {
  let resolved = false;
  lcuConnector.on('connect', async (data) => {
    console.log('Connected to LCU', data);
    if (!resolved) {
      resolve(data);
      resolved = true;
    }
    if (mainWindow) mainWindow.webContents.send('lcu-data', data);
  });
});

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: nativeImage.createFromPath(iconUrl),
    autoHideMenuBar: true,
    minWidth: 665,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  // and load the index.html of the app.     win.loadFile('index.html')
  // mainWindow.loadURL('http://localhost:3000');
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : indexHtmlUrl);
  mainWindow.on('closed', () => (mainWindow = null));

  ipcMain.on('get-lcu-data', (event, data) => {
    lcuDataPromise.then((data) => event.reply('lcu-data', data));
  });
  lcuConnector.start();
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
