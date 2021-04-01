import { appendIcon, switchTo } from '../utils/dom-helper'
import addHotKeys from '../utils/hotkey'

export default function initDocumentMode() {
  appendIcon('document', function () {
    switchTo('document-mode')
  })
  addHotKeys({
    shortcutKeys: '3',
    modeId: '#mode-button-document',
    modeName: 'Document',
    modeAction() {
      switchTo('document-mode')
    },
  })
}
