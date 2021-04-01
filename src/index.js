import initModes from './views'
import { appendCSSToPage } from './utils/dom-helper'

setTimeout(() => {
  initModes()
}, 3000)

console.log('window.URLScriptServer', window.URLScriptServer)
if (window.URLScriptServer.includes('localhost')) {
  appendCSSToPage('cssCalendar', 'http://localhost:8080/index.css')
} else {
  appendCSSToPage('cssCalendar', window.URLScriptServer + 'js/index.css')
}

if (module.hot) {
  module.hot.dispose(function () {
    console.log('模块即将被替换时')
  })

  module.hot.accept(function () {
    console.log('模块或其依赖项之一刚刚更新时')
  })
}
