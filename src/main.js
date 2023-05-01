const path = require('path')
const {
  app,
  BrowserWindow,
  ipcMain,
  shell
} = require('electron');

let createWindow = () => {
  let win;
  if (Object.keys(session).length === 0 || session.username === '' || session.password === '') {
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
    win.loadFile('./src/public/login/index.html')
  } else {
    win = new BrowserWindow({
      width: 1250,
      height: 725,
      autoHideMenuBar: true,
      resizable: false,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js'),
        devTools: false
      }
    })
    win.loadFile('./src/public/menu/index.html')
  }
  ipcMain.handle('changeWindowSize', (event, width, height) => win.setBounds({ width: width, height: height }))
  ipcMain.handle('session', () => session)
}

app.once('ready', () => {
  createWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  console.log('hi')
  if (process.platform !== 'darwin') {
    app.quit()
  }
})