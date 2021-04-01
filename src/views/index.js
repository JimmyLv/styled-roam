import initCalendarMode from './calendar'
import initCardListMode from './card-list'
import initDocumentMode from './document'
import initDownloadMode from './download'
import initCardFlowMode from './card-flow'
import initFocusMode from './focus'
import addHotKeys from '../utils/hotkey'
import './index.less'

const initialMode = localStorage.getItem('INIT_MODE') || 'document'
document.querySelector('html').classList.add(initialMode)

export default function initModes() {
  initCardListMode()
  initCardFlowMode()
  initDocumentMode()
  initCalendarMode()
  initFocusMode()
  initDownloadMode()

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
