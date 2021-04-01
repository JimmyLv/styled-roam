import addToggleMode from './addToggleMode'
import { toggleClass } from './utils/helper'

export const toggleFocusMode = addToggleMode({
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
