import { switchTo } from '../utils/dom-helper';
import addHotKeys from '../utils/hotkey';
import addToggleMode from './addToggleMode';
import './card-list.less';

export default function initCardListMode() {
  const { toggleMode: toggleCardMode }  = addToggleMode({
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
