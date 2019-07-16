const { ipcRenderer } = require("electron");
const { $id } = require("../../utils/domHelper");
let musicAudio = new Audio(); //AudioPlayer
musicAudio.addEventListener("loadedmetadata", event => {
  console.log(event.duration);
});
musicAudio.addEventListener("timeupdate", event => {
  renderPlayTime(event.timeStamp, musicAudio.duration);
});

function renderPlayTime(current, total) {
  $id("info").innerHTML = `<h4></h4><span>${current} / ${total}</span>`;
}

const $btnOpenAddView = document.getElementById("btnOpenAddView");
$btnOpenAddView.addEventListener("click", event => {
  ipcRenderer.send("openAddView");
});

const $songList = $id("song-list");
$songList.addEventListener("click", event => {
  let { target } = event;
  let icon = target.getAttribute("class");
  if (icon === "fa fa-trash") {
    let { id } = event.target.dataset;
    //删除
  } else {
    if (icon === "fa fa-play") {
      target.setAttribute("class", "fa fa-pause");
      musicAudio.src = target.dataset.path;

      musicAudio.play();
    } else {
      target.setAttribute("class", "fa fa-play");
      musicAudio.pause();
    }
  }
});

ipcRenderer.on("render-music-list", (event, musics) => {
  let $musicList = musics.reduce((html, current) => {
    html += `<li class="list-group-item">
      <i class="fa fa-play" data-path="${current.path}" data-name="${
      current.name
    }"></i><span data-id="${current.id}">${current.name}</span>
      <i class="fa fa-trash" data-id="${current.id}"></i>
    </li>`;
    return html;
  }, "");
  $id("song-list").innerHTML = $musicList;
});
