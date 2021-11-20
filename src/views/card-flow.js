import { appendIcon, switchTo } from '../utils/dom-helper'
import addHotKeys from '../utils/hotkey'
import './card-flow.less'

function updateCardsStickyTop() {
  setTimeout(() => {
    const cards = document.querySelectorAll('.rm-block__children.rm-level-0 > .roam-block-container');

    console.log({ cards });

    for (let i = 0; i < cards.length; i++) {
      cards[i].style.top = String(130 + (i - 1) * 70) + 'px';
    }
  }, 500)
}

export default function initCardFlowMode() {
  appendIcon('cardFlow', 'heat-grid', function () {
    switchTo('flow-mode')
    updateCardsStickyTop();
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
