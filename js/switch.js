document.querySelector('html').classList = 'card-mode'

const MODES = {
  cardList: { text: 'Card List', icon: 'bp3-icon-full-stacked-chart'},
  cardFlow: { text: 'Card Flow', icon: 'bp3-icon-heat-grid'},
  document: { text: 'Document', icon: 'bp3-icon-horizontal-bar-chart'},
}

function appendIcon(type, clickHandler) {
  const mode = MODES[type]
  const icon = document.createElement("div")
  icon.id=`mode-button-${type}`
  icon.className = `bp3-button bp3-minimal bp3-small ${mode.icon}`
  icon.setAttribute('style','position:relative;left:2px')
  icon.onclick = clickHandler
  const spacer = document.createElement("div")
  spacer.setAttribute('style','flex: 0 0 3px')
  document.querySelector('.roam-topbar .flex-h-box').appendChild(spacer)
  document.querySelector('.roam-topbar .flex-h-box').appendChild(icon)
}

const appendButton = function (type, clickHandler) {
  const mode = MODES[type]
  const navbar = document.querySelector('.roam-topbar > .flex-h-box')
  let hasMenuIcon = navbar.firstChild.classList.contains('bp3-icon-menu')
  let targetElement = hasMenuIcon ? navbar.childNodes[1] : navbar.firstChild

  targetElement.style.display = 'flex'
  targetElement.style.justifyContent = 'center'

  const button = document.createElement('button')
  button.name = mode.text
  button.className = `mode-button bp3-button bp3-minimal bp3-small ${mode.icon} ${type}`
  button.onclick = clickHandler

  targetElement.appendChild(button)
}

const switchToCardList = function () {
  document.querySelector('html').classList = 'card-mode'
  document.querySelector('.zoom-path-view.rm-zoom').firstChild.click()
}

const switchToEditCard = function () {
  document.querySelector('html').classList = 'edit-mode'
  let selected = document.querySelector('textarea[autocapitalize="none"]')
  if (selected) {
    selected.parentNode.parentNode.parentNode.querySelector('.simple-bullet-inner').click()
  } else {
    document.querySelector('.block-highlight-blue').querySelector('.simple-bullet-inner').click()
  }
}

const switchToDocument = function () {
  document.querySelector('html').classList = 'document-mode'
  // document.querySelector('.zoom-path-view.rm-zoom').firstChild.click()
}

const switchToCardFlow = function () {
  document.querySelector('html').classList = 'flow-mode'
}

appendIcon('cardList', switchToCardList)
appendIcon('cardFlow', switchToCardFlow)
appendIcon('document', switchToDocument)

setTimeout(() => {
  hotkeys('alt+shift+1', function (event, handler) {
    event.preventDefault()
    switchToCardList()
  })
  hotkeys('alt+shift+2', function (event, handler) {
    event.preventDefault()
    switchToCardFlow()
  })
  hotkeys('alt+shift+3', function (event, handler) {
    event.preventDefault()
    switchToDocument()
  })
}, 8000)
