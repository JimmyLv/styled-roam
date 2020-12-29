export function createSpacer() {
  const spacer = document.createElement('div')
  spacer.setAttribute('style', 'flex: 0 0 3px')
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
  document.querySelector('.roam-topbar .flex-h-box').appendChild(icon)

  const spacer = createSpacer()
  document.querySelector('.roam-topbar .flex-h-box').appendChild(spacer)
}

const appendButton = function (type, clickHandler) {
  const mode = MODES[type];
  const navbar = document.querySelector(".roam-topbar > .flex-h-box");
  let hasMenuIcon = navbar.firstChild.classList.contains("bp3-icon-menu");
  let targetElement = hasMenuIcon ? navbar.childNodes[1] : navbar.firstChild;

  targetElement.style.display = "flex";
  targetElement.style.justifyContent = "center";

  const button = document.createElement("button");
  button.name = mode.text;
  button.className = `mode-button bp3-button bp3-minimal bp3-small ${mode.icon} ${type}`;
  button.onclick = clickHandler;

  targetElement.appendChild(button);
};

export function switchTo(mode) {
  document.querySelector('html').classList = mode
  localStorage.setItem('INIT_MODE', mode)
}

export function generateStyleScript(styleContent) {
  var styleScript = document.createElement('style')
  styleScript.innerHTML = styleContent

  return styleScript
}
