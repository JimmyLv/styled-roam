import initCalendarMode from './modes/calendar'
import initCardListMode from './modes/card-list'
import initDocumentMode from './modes/document'
import initDownloadMode from './modes/download'
import initCardFlowMode from './modes/card-flow'
import initFocusMode from './modes/focus'
import addHotKeys from './utils/hotkey'

const initialMode = localStorage.getItem('INIT_MODE') || 'document'
document.querySelector('html').classList.add(initialMode)

export default function initModes() {
  initDownloadMode()
  initCardListMode()
  initCardFlowMode()
  initDocumentMode()
  initCalendarMode()
  initFocusMode()

  addHotKeys({
    shortcutKeys: 'u',
    modeId: '#unlink-finder-icon',
    modeName: 'Find Unlink',
    async modeAction() {
      document.querySelector('#unlink-finder-icon').click()
    },
  })

  addHotKeys({
    shortcutKeys: 'r',
    modeId: '#toggle-reading-mode',
    modeName: 'Toggle Reading',
    async modeAction() {
      document.querySelector('#toggle-reading-mode').click()
    },
  })

  console.log('🎨 started styled-roam.')
}
