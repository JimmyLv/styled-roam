export function createSpacer() {
  const spacer = document.createElement('div')
  spacer.className = `rm-topbar__spacer-sm`
  return spacer
}

const MODES = {
  cardList: { text: "Card List", icon: "bp3-icon-full-stacked-chart" },
  cardFlow: { text: "Card Flow", icon: "bp3-icon-heat-grid" },
  document: { text: "Document", icon: "bp3-icon-horizontal-bar-chart" },
};

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
  document.querySelector('html').classList = mode
  localStorage.setItem('INIT_MODE', mode)
}

export function generateStyleScript(styleContent) {
  var styleScript = document.createElement('style')
  styleScript.innerHTML = styleContent

  return styleScript
}
