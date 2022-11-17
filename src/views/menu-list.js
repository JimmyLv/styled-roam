import { html } from 'htm/react'
import { render } from 'react-dom'
import tippy from 'tippy.js'
import './menu-list.less'
import MenuList from '../components/MenuList'

export default function initMenuListMode() {
  const targetElementId = 'mode-button-menuList'
  appendMenuListIcon(targetElementId)
  createMenuListContent()

  const dropdownElement = creatDropdownWrapper()
  const menuList = document.getElementById('menu-list-content')

  tippy(`#${targetElementId}`, {
    content: dropdownElement,
    allowHTML: true,
    theme: 'light-border',
    trigger: 'click',
    interactive: true,
    onShow: () => {
      dropdownElement.appendChild(menuList)
    },
    onHidden: () => {
      document.body.appendChild(menuList)
    },
  })
}

function appendMenuListIcon(targetElementId) {
  var modeIcon = document.createElement('div')
  modeIcon.id = targetElementId
  modeIcon.className = `bp3-button bp3-minimal bp3-icon-full-stacked-chart bp3-small`

  var wrapper = document.querySelector('.rm-topbar')
  wrapper.appendChild(modeIcon)
}

function createMenuListContent() {
  const menuListContent = document.createElement('div')
  menuListContent.id = 'menu-list-content'
  document.body.appendChild(menuListContent)
  render(html`<${MenuList} />`, document.getElementById('menu-list-content'))
}

function creatDropdownWrapper() {
  const dropdownElement = document.createElement('div')
  dropdownElement.className = 'menu-list-dropdown'
  document.body.append(dropdownElement)
  return dropdownElement
}
