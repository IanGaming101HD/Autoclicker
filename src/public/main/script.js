const { ipcRenderer } = require('electron')
const button = document.getElementById('button')

let status = false

function toggleButton() {
    if (status) {
        status = false
        button.innerText = 'Stop'
        ipcRenderer.send('start-clicking')
    } else if (!status) {
        status = true
        button.innerText = 'Start'
        ipcRenderer.send('stop-clicking')
    }
}

button.addEventListener('click', () => toggleButton)