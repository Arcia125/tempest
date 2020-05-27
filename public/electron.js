const path = require('path');
const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');

let mainWindow;

const indexHtmlPath = path.join(__dirname, './build/index.html');
const indexHtmlUrl = `file://${indexHtmlPath}`;
const browserWindowOpts = { width: 800, height: 600 };

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow(browserWindowOpts);
  // and load the index.html of the app.     win.loadFile('index.html')
  // mainWindow.loadURL('http://localhost:3000');
  mainWindow.loadURL(isDev ? 'http://localhost:3000' : indexHtmlUrl);
  mainWindow.on('closed', () => mainWindow = null);
}

app.on('ready', createWindow);

app.on('activate', () => {
  if(mainWindow === null) createWindow(); 
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
})
