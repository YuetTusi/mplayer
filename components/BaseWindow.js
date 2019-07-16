const { BrowserWindow } = require("electron");

/**
 * @description 窗口类
 */
class BaseWindow extends BrowserWindow {
  constructor(options, filePath) {
    options.width = options.width || 400;
    options.height = options.height || 300;
    options.show = false; //默认不显示
    options.autoHideMenuBar = true; //隐藏菜单
    options.webPreferences = {
      nodeIntegration: true
    };
    options.parent = options.parent || null;
    super(options);
    if (filePath) {
      this.loadFile(filePath);
    }
    this.on("ready-to-show", event => {
      //当首次渲染完之后显示，改善用户体验
      this.show();
    });
  }
}

module.exports = BaseWindow;
