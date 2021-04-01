import { MODES } from '../modes'

export function createSpacer() {
  const spacer = document.createElement('div')
  spacer.className = `rm-topbar__spacer-sm`
  return spacer
}

export function appendIcon(type, clickHandler) {
  const mode = MODES[type]
  const icon = document.createElement('div')
  icon.id = `mode-button-${type}`
  icon.className = `bp3-button bp3-minimal bp3-small ${mode.icon} mode-button`
  icon.setAttribute('style', 'position:relative;left:2px')
  icon.onclick = clickHandler
  document.querySelector('.rm-topbar').appendChild(icon)

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

function appendElementToPage(element, tagId, typeT) {
  try {
    document.getElementById(tagId).remove()
  } catch (e) {} //Delete any existing reference
  Object.assign(element, { type: typeT, async: false, tagId: tagId })
  document.getElementsByTagName('head')[0].appendChild(element)
}
