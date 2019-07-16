const { ipcRenderer } = require("electron");
const { $id } = require("../../utils/domHelper");

const $btnOpenAddView = document.getElementById("btnOpenAddView");
$btnOpenAddView.addEventListener("click", event => {
  ipcRenderer.send("openAddView");
});

ipcRenderer.on("render-music-list", (event, musics) => {
  let $musicList = musics.reduce((html, current) => {
    html += `<li class="list-group-item">
      <i class="fa fa-play"></i><span data-path="${current.path}" data-id="${
      current.id
    }">${current.name}</span>
      <i class="fa fa-trash"></i>
    </li>`;
    return html;
  }, "");
  $id("song-list").innerHTML = $musicList;
});
