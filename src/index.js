import initCardifyTheme from "./switch";

setTimeout(() => {
  initCardifyTheme();
}, 3000);

if (module.hot) {
  module.hot.dispose(function () {
    console.log("模块即将被替换时");
  });

  module.hot.accept(function () {
    console.log("模块或其依赖项之一刚刚更新时");
  });
}
