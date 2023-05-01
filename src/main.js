const path = require('path')
const {
  app,
  BrowserWindow,
  ipcMain,
  shell
} = require('electron');

let createWindow = () => {
  let win;
  win = new BrowserWindow({
    width: 450,
    height: 310,
    icon: './src/icon.png',
    autoHideMenuBar: true,
    resizable: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      devTools: false
    }
  })
  win.loadFile('./src/public/main/index.html')
}
// ipcMain.handle('function', (event, width, height) => function)
// ipcMain.handle('variable', () => variable)

app.once('ready', () => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})