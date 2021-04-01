import toggleCalendarTimestamp from './modes/calendar'
import { toggleFocusMode } from './modes/focus'
import { appendIcon, switchTo } from './utils/dom-helper'
import addHotKeys from './utils/hotkey'
import { shareAndDownloadImage } from './utils/share-image'

const initialMode = localStorage.getItem('INIT_MODE') || 'document'
document.querySelector('html').classList.add(initialMode)

appendIcon('download', shareAndDownloadImage)
appendIcon('cardList', function () {
  switchTo('card-mode')
})
appendIcon('cardFlow', function () {
  switchTo('flow-mode')
})
appendIcon('document', function () {
  switchTo('document-mode')
})

const toggleCalendarMode = toggleCalendarTimestamp()

export default function initModes() {
  addHotKeys({
    shortcutKeys: 'alt+shift+1/l',
    modeId: '#mode-button-cardList',
    modeName: 'Card List',
    modeAction() {
      switchTo('card-mode')
    },
  })

  addHotKeys({
    shortcutKeys: 'alt+shift+2',
    modeId: '#mode-button-cardFlow',
    modeName: 'Card Flow',
    modeAction() {
      switchTo('flow-mode')
    },
  })
  addHotKeys({
    shortcutKeys: 'alt+shift+3',
    modeId: '#mode-button-document',
    modeName: 'Document',
    modeAction() {
      switchTo('document-mode')
    },
  })
  addHotKeys({
    shortcutKeys: 'alt+shift+4/c',
    modeId: '#mode-button-calendar',
    modeName: 'Calendar',
    modeAction() {
      toggleCalendarMode()
    },
  })
  addHotKeys({
    shortcutKeys: 'alt+shift+5/f',
    modeId: '#mode-button-focus',
    modeName: 'Focus',
    modeAction() {
      toggleFocusMode()
    },
  })
  addHotKeys({
    shortcutKeys: 'alt+shift+d',
    modeId: '#mode-button-download',
    modeName: 'Share Card',
    async modeAction() {
      await shareAndDownloadImage()
    },
  })
  addHotKeys({
    shortcutKeys: 'alt+shift+u',
    modeId: '#unlink-finder-icon',
    modeName: 'Find Unlink',
    async modeAction() {
      document.querySelector('#unlink-finder-icon').click()
    },
  })

  console.log('🎨 started styled-roam.')
}
