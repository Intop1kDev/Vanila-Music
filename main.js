const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const { injectScript } = require('./injector');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js')
    },
    icon: path.join(__dirname, 'assets/icon.ico'),
    title: 'Vanila Music',
    frame: false,
    titleBarStyle: 'hidden',
  });

  win.loadURL('https://music.yandex.ru/');

  // Инжектируем скрипт для перетаскивания
  injectScript(win.webContents);

  // Обработчик для изменения заголовка
  win.webContents.on('page-title-updated', (event, title) => {
    event.preventDefault();
    win.setTitle('Vanila Music');
  });

  // Обработчики для управления окном
  ipcMain.handle('minimize-window', () => {
    win.minimize();
  });

  ipcMain.handle('maximize-window', () => {
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  ipcMain.handle('close-window', () => {
    win.close();
  });
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
