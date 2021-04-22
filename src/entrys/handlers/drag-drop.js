import { getUids } from 'roam-client'
import { getCurrentPageUid } from '../roam'
import { handleFiles } from './handle-files'

export const interceptImageDrop = (event) => {
  const items = event.dataTransfer?.items
  const images = handleFiles(items)
  if (images) {
    event.stopPropagation()
    event.preventDefault()
  }

  Array.from(document.getElementsByClassName('dnd-drop-bar'))
    .map((c) => c)
    .forEach((c) => (c.style.display = 'none'))
}

export const getDropTarget = (element) => {
  const separator = element.parentElement
  const childrenContainer = separator.parentElement
  const index = Array.from(childrenContainer.children).findIndex((c) => c === separator)
  const offset = Array.from(childrenContainer.children).reduce(
    (prev, cur, ind) => (cur.classList.contains('roam-block-container') && ind < index ? prev + 1 : prev),
    0,
  )
  const parentBlock = childrenContainer.previousElementSibling.getElementsByClassName('roam-block')
  const parentUid = parentBlock ? getUids(parentBlock).blockUid : getCurrentPageUid()
  return {
    parentUid,
    offset,
  }
}
