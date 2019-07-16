const { ipcRenderer } = require("electron");
const path = require("path");
const { $id } = require("../../utils/domHelper");

let $btnAddSong = $id("btnAddSong");
let $btnImportSong = $id("btnImportSong");

let musicData = [];

//添加曲目
$btnAddSong.addEventListener("click", event => {
  //打开选择曲目对话框
  ipcRenderer.send("open-add-dialog", "打开选择曲目对话框");
});
//导入曲目
$btnImportSong.addEventListener("click", event => {
  ipcRenderer.send("import-song", musicData);
});

ipcRenderer.on("data-songs", (event, args) => {
  let list = args.map((item, i) => {
    let name = path.basename(item);
    let musicPath = item;
    musicData.push({
      name,
      path: musicPath
    });
    let template = `<li class="list-group-item"><i></i><span data-path="${musicPath}">${name}</span></li>`;
    return template;
  });

  $id("music-list").innerHTML = list;
});
