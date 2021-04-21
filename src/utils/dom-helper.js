export function createSpacer() {
  const spacer = document.createElement('div')
  spacer.className = `rm-topbar__spacer-sm`
  return spacer
}

export function appendIcon(mode, icon, clickHandler) {
  const iconElement = document.createElement('div')
  iconElement.id = `mode-button-${mode}`
  iconElement.className = `bp3-button bp3-minimal bp3-small bp3-icon-${icon} mode-button`
  iconElement.setAttribute('style', 'position:relative;left:2px')
  iconElement.onclick = clickHandler
  document.querySelector('.rm-topbar').appendChild(iconElement)

  const spacer = createSpacer()
  document.querySelector('.rm-topbar').appendChild(spacer)
}

export function switchTo(mode) {
  console.log(`🎨 switch styled-roam to ${mode} mode.`)
  const classList = document.querySelector('html').classList
  const previousMode = localStorage.getItem('INIT_MODE') || 'document'
  classList.toggle(previousMode)
  classList.toggle(mode)
  localStorage.setItem('INIT_MODE', mode)
}

export function generateStyleScript(styleContent) {
  var styleScript = document.createElement('style')
  styleScript.innerHTML = styleContent

  return styleScript
}

export function appendCSSToPage(tagId, cssToAdd) {
  appendElementToPage(
    Object.assign(document.createElement('link'), {
      href: cssToAdd,
      rel: 'stylesheet',
    }),
    tagId,
    'text/css',
  )
}

export function appendCSSToPageByEnv(tagId, cssToAdd) {
  console.log('window.URLScriptServer', window.URLScriptServer)
  if (window.URLScriptServer.includes('localhost')) {
    appendCSSToPage(tagId, `http://localhost:8080/${cssToAdd}`)
  } else {
    appendCSSToPage(tagId, `${window.URLScriptServer}js/${cssToAdd}`)
  }
}

function appendElementToPage(element, tagId, typeT) {
  try {
    document.getElementById(tagId).remove()
  } catch (e) {} //Delete any existing reference
  Object.assign(element, { type: typeT, async: false, tagId: tagId })
  document.getElementsByTagName('head')[0].appendChild(element)
}
