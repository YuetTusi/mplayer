// const path = require("path");
const electron = require("electron");
const BaseWindow = require("./components/BaseWindow");
const { dialog, app, ipcMain } = electron;
const DataSet = require("./DataSet");
const { $id } = require("./utils/domHelper");
const DEFAULT_VIEW = `./view/index/index.html`;

let mainWindow = null;
let store = new DataSet();

//打开添加音乐窗口
ipcMain.on("openAddView", (event, args) => {
  let addView = null;
  addView = new BaseWindow(
    {
      width: 400,
      height: 300,
      webPreferences: {
        nodeIntegration: true
      },
      parent: mainWindow
    },
    "./view/add/add.html"
  );
});
//打开添加曲目窗口
ipcMain.on("open-add-dialog", (event, args) => {
  dialog.showOpenDialog(
    {
      title: "选择曲目",
      properties: ["openFile", "multiSelections"],
      filters: [{ name: "musics", extensions: ["mp3"] }]
    },
    filePaths => {
      // event.reply("data-songs", filePaths);
      event.sender.send("data-songs", filePaths); //将文件列表发送回add.js
    }
  );
});
//导入曲目
ipcMain.on("import-song", (event, args) => {
  try {
    store.saveMusic(args);
    dialog.showMessageBox(
      {
        type: "info",
        title: "消息",
        message: "导入曲目成功",
        buttons: ["OK"]
      },
      () => {
        //当用户新导入了歌曲，渲染列表
        mainWindow.send("render-music-list", store.getMusic());
      }
    );
  } catch (error) {
    dialog.showErrorBox("消息", "导入曲目出错");
  }
});

app.on("ready", () => {
  mainWindow = new BaseWindow(
    {
      width: 600,
      height: 400,
      webPreferences: {
        nodeIntegration: true
      }
    },
    DEFAULT_VIEW
  );
  //当打开主窗口时，发送数据给index渲染歌曲列表
  mainWindow.webContents.on("did-finish-load", () => {
    let musics = new DataSet().getMusic();
    // console.log(musics);
    mainWindow.send("render-music-list", musics);
  });
});
app.on("window-all-closed", () => {
  app.quit();
});

// function loadMusic() {
//   let musics = new DataSet().getMusic();

//   console.log(musics);
//   let $songList = $id("song-list");
//   // $songList.innerHTML = musics.map(item => {
//   //   let template = `<i class="fa fa-play"></i><span data-path="${
//   //     item.path
//   //   }" data-id="${item.id}">${item.name}</span>
//   //     <i class="fa fa-trash"></i>`;
//   // });
// }

//18001096761 乔
