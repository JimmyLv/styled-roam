document.querySelector('html').classList = 'card-mode'

const appendButton = function (innerText, clickHandler) {
  let targetElement = document.querySelector('.bp3-icon-menu+div')
  targetElement.style.color = 'green'
  targetElement.style.display = 'flex'
  targetElement.style.justifyContent = 'center'

  const button = document.createElement('button')
  button.innerHTML = innerText
  button.onclick = clickHandler

  targetElement.appendChild(button)
}

appendButton('card', function () {
  document.querySelector('html').classList = 'card-mode'
})

appendButton('document', function () {
  document.querySelector('html').classList = 'document-mode'
})

appendButton('list', function () {
  document.querySelector('html').classList = 'list-mode'
})
