const {
  contextBridge,
  ipcRenderer
} = require('electron')

contextBridge.exposeInMainWorld('electron', {
  changeWindowSize: (width, height) => ipcRenderer.invoke('changeWindowSize', width, height),
  session: ipcRenderer.invoke('session')
})