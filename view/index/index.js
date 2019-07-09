const { ipcRenderer } = require("electron");

const $btnOpenAddView = document.getElementById("btnOpenAddView");
$btnOpenAddView.addEventListener("click", event => {
  ipcRenderer.send("openAddView");
});
