function $id(id) {
  return document.getElementById(id);
}
function $class(className) {
  return document.getElementsByClassName(className);
}
function $selector(selector) {
  return document.querySelector(selector);
}
function $selectorAll(selector) {
  return document.querySelectorAll(selector);
}

module.exports = {
  $id,
  $class,
  $selector,
  $selectorAll
};
