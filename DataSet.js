const Store = require("electron-store");
const uuid = require("uuid/v4");

/**
 * @description 持久化类
 */
class DataSet extends Store {
  constructor(options) {
    super(options);
    this._data = this.get("music") || [];
  }
  saveMusic(data) {
    this._data = data.map(item => {
      return {
        id: uuid(),
        name: item.name,
        path: item.path
      };
    });
    this.set("music", this._data);
    return this;
  }
  getMusic() {
    return this.get("music");
  }
  addMusic(data) {
    this._data = this.get("music");
    this._data.push({
      id: uuid(),
      path: data.path,
      name: data.name
    });
    this.set("music", this._data);
    return this;
  }
  removeMusic(id) {
    this._data = this.get("music");
    this._data = this._data.filter(item => item.id !== id);
    this.set("music", this._data);
    return this;
  }
  clearMusic() {
    this._data = [];
    this.clear();
  }
}

module.exports = DataSet;
