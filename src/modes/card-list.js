import { appendIcon, switchTo } from '../utils/dom-helper'
import addHotKeys from '../utils/hotkey'
import './card-list.less'
import addToggleMode from './addToggleMode'

export default function initCardListMode() {
  const toggleCardMode = addToggleMode({
    id: 'mode-button-cardList',
    on: 'full-stacked-chart',
    off: 'timeline-bar-chart',
    turnOn() {
      switchTo('card-mode')
    },
    turnOff() {
      switchTo('presentation-card-mode')
    },
  })

  addHotKeys({
    shortcutKeys: '1/l',
    modeId: '#mode-button-cardList',
    modeName: 'Card List',
    modeAction() {
      toggleCardMode()
    },
  })
}
