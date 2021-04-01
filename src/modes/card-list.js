import { appendIcon, switchTo } from '../utils/dom-helper'
import addHotKeys from '../utils/hotkey'
import './card-list.less'

export default function initCardListMode() {
  appendIcon('cardList', function () {
    switchTo('card-mode')
  })
  addHotKeys({
    shortcutKeys: '1/l',
    modeId: '#mode-button-cardList',
    modeName: 'Card List',
    modeAction() {
      switchTo('card-mode')
    },
  })
}
