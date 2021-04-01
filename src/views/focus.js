import addHotKeys from '../utils/hotkey'
import addToggleMode from './addToggleMode'
import './focus.less'

export default function initFocusMode() {
  const toggleFocusMode = addToggleMode({
    id: 'mode-toggle-focus',
    on: 'eye-on',
    off: 'eye-open',
    turnOn() {
      document.querySelector('html').classList.add('focus-mode')
    },
    turnOff() {
      document.querySelector('html').classList.remove('focus-mode')
    },
  })

  addHotKeys({
    shortcutKeys: '5/f',
    modeId: '#mode-toggle-focus',
    modeName: 'Focus',
    modeAction() {
      toggleFocusMode()
    },
  })
}
