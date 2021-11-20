import { appendIcon, switchTo } from '../utils/dom-helper'
import addHotKeys from '../utils/hotkey'
import './tree-table.less'
import { updateCardsStickyTop } from '../utils/update-cards-sticky-top';

export default function initTreeTableMode() {
  appendIcon('treeTable', 'th', function () {
    switchTo('table-mode')
    updateCardsStickyTop('0px')
  })

  addHotKeys({
    shortcutKeys: '6/t',
    modeId: '#mode-button-treeTable',
    modeName: 'Tree Table',
    modeAction() {
      switchTo('table-mode')
    },
  })
}
