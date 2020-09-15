function appendScriptToPage(tagId, script) {
  appendElementToPage(Object.assign(document.createElement('script'), { src: script }), tagId, 'text/javascript')
}

function appendCSSToPage(tagId, cssToAdd) {
  appendElementToPage(Object.assign(document.createElement('link'), {
    href: cssToAdd,
    rel: 'stylesheet',
  }), tagId, 'text/css')
}

function appendElementToPage(element, tagId, typeT) {
  try { document.getElementById(tagId).remove() } catch (e) {}  //Delete any existing reference
  Object.assign(element, { type: typeT, async: false, tagId: tagId })
  document.getElementsByTagName('head')[0].appendChild(element)
}

appendCSSToPage('cssCardList', window.URLScriptServer + 'css/card.css')
appendCSSToPage('cssCardChain', window.URLScriptServer + 'css/gingko.css')
appendScriptToPage('switchMode', window.URLScriptServer + 'js/switch.js')
