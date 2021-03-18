import initCardifyTheme from "./switch";
import "./css/card.less";
import "./css/gingko.less";
import "./css/calendar.less";
import "./css/share.less";

setTimeout(() => {
  initCardifyTheme();
}, 3000);

function appendCSSToPage(tagId, cssToAdd) {
  appendElementToPage(
    Object.assign(document.createElement("link"), {
      href: cssToAdd,
      rel: "stylesheet",
    }),
    tagId,
    "text/css"
  );
}

function appendElementToPage(element, tagId, typeT) {
  try {
    document.getElementById(tagId).remove();
  } catch (e) {} //Delete any existing reference
  Object.assign(element, { type: typeT, async: false, tagId: tagId });
  document.getElementsByTagName("head")[0].appendChild(element);
}

console.log("window.URLScriptServer", window.URLScriptServer);
if (window.URLScriptServer.includes("localhost")) {
  appendCSSToPage("cssCalendar", "http://localhost:8080/index.css");
} else {
  appendCSSToPage("cssCalendar", window.URLScriptServer + "js/index.css");
}

if (module.hot) {
  module.hot.dispose(function () {
    console.log("模块即将被替换时");
  });

  module.hot.accept(function () {
    console.log("模块或其依赖项之一刚刚更新时");
  });
}
