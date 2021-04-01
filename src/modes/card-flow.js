import { appendIcon, switchTo } from '../utils/dom-helper';
import addHotKeys from '../utils/hotkey';
import './card-flow.less'

export default function initCardFlowMode() {
  appendIcon('cardFlow', function () {
    switchTo('flow-mode')
  })

  addHotKeys({
    shortcutKeys: '2/w',
    modeId: '#mode-button-cardFlow',
    modeName: 'Card Flow',
    modeAction() {
      switchTo('flow-mode')
    },
  })
}
