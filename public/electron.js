const path = require('path');
const { app, BrowserWindow, nativeImage } = require('electron');
const isDev = require('electron-is-dev');
const LCUConnector = require('lcu-connector');

const iconUrl = path.resolve(__dirname, 'favicon.ico');

let mainWindow;

const indexHtmlPath = path.join(__dirname, './build/index.html');
const indexHtmlUrl = `file://${indexHtmlPath}`;
const lcuConnector = new LCUConnector();

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: nativeImage.createFromPath(iconUrl),
    autoHideMenuBar: true,
  });
  // and load the index.html of the app.     win.loadFile('index.html')
  // mainWindow.loadURL('http://localhost:3000');
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : indexHtmlUrl);
  mainWindow.on('closed', () => (mainWindow = null));
  lcuConnector.start();
}

app.whenReady().then(createWindow);

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

lcuConnector.on('connect', async (data) => {
  console.log(data);
  mainWindow.webContents.send('lcu-data', data);
});
