document.querySelector('html').classList = 'card-mode'

const appendButton = function (type, clickHandler) {
  const innerText = {
    cardList: 'Card List',
    editCard: 'Edit Card',
    document: 'Document',
  }[type]
  const navbar = document.querySelector('.roam-topbar > .flex-h-box')
  let hasMenuIcon = navbar.firstChild.classList.contains('bp3-icon-menu')
  let targetElement = hasMenuIcon ? navbar.childNodes[1] : navbar.firstChild

  targetElement.style.display = 'flex'
  targetElement.style.justifyContent = 'center'

  const button = document.createElement('button')
  button.innerHTML = innerText
  button.className = 'mode-button' + ' ' + type
  button.onclick = clickHandler

  targetElement.appendChild(button)
}

appendButton('cardList', function () {
  document.querySelector('html').classList = 'card-mode'
  document.querySelector('.zoom-path-view.rm-zoom').firstChild.click()
})

appendButton('editCard', function () {
  document.querySelector('html').classList = 'edit-mode'
  let selected = document.querySelector('textarea[autocapitalize="none"]')
  if (selected) {
    selected.parentNode.parentNode.parentNode.querySelector('.simple-bullet-inner').click()
  }
})

appendButton('document', function () {
  document.querySelector('html').classList = 'document-mode'
})
