import { appendIcon, switchTo } from '../utils/dom-helper'
import addHotKeys from '../utils/hotkey'
import { updateCardsStickyTop } from '../utils/update-cards-sticky-top'
import './card-flow.less'

export default function initCardFlowMode() {
  appendIcon('cardFlow', 'heat-grid', function () {
    switchTo('flow-mode')
    updateCardsStickyTop()
  })

  window.addEventListener('locationchange', updateCardsStickyTop)

  addHotKeys({
    shortcutKeys: '2/w',
    modeId: '#mode-button-cardFlow',
    modeName: 'Card Flow',
    modeAction() {
      switchTo('flow-mode')
    },
  })
}
