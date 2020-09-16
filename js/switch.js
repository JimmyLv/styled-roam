document.querySelector('html').classList = 'card-mode'

const appendButton = function (type, clickHandler) {
  const buttonText = {
    cardList: 'Card List',
    cardFlow: 'Card Flow',
    document: 'Document',
  }[type]
  const navbar = document.querySelector('.roam-topbar > .flex-h-box')
  let hasMenuIcon = navbar.firstChild.classList.contains('bp3-icon-menu')
  let targetElement = hasMenuIcon ? navbar.childNodes[1] : navbar.firstChild

  targetElement.style.display = 'flex'
  targetElement.style.justifyContent = 'center'

  const button = document.createElement('button')
  button.name = buttonText
  button.className = `mode-button bp3-button bp3-minimal bp3-small ${type}`
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

appendButton('cardList', switchToCardList)
appendButton('cardFlow', switchToCardFlow)
appendButton('document', switchToDocument)

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
