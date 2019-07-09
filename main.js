const electron = require("electron");
const path = require("path");

const { BrowserWindow, app, ipcMain } = electron;
const indexWindow = `file://${__dirname}/view/index/index.html`;

let mainWindow = null;

//打开添加音乐窗口
ipcMain.on("openAddView", (event, args) => {
  let addView = null;
  addView = new BrowserWindow({
    width: 400,
    height: 300,
    webPreferences: {
      nodeIntegration: true
    },
    parent: mainWindow
  });
  addView.loadFile("./view/add/add.html");
});

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 600,
    height: 400,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(indexWindow);
});
app.on("window-all-closed", () => {
  console.log("窗口已关闭...");
  app.quit();
});
