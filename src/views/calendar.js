import { renderTimings } from '../components/Timings'
import { switchTo } from '../utils/dom-helper'
import addHotKeys from '../utils/hotkey'
import addCalendarTimestamp from './addCalendarTimestamp'
import addToggleMode from './addToggleMode'
import './calendar.less'

export default function initCalendarMode() {
  const toggleCalendarMode = addToggleMode({
    id: 'mode-toggle-calendar',
    on: 'cube-add',
    off: 'cube',
    turnOn() {
      switchTo('calendar-mode')
      renderTimings()
      addCalendarTimestamp()
    },
    turnOff() {
      switchTo('simple-calendar-mode')
    },
  })

  addHotKeys({
    shortcutKeys: '4/c',
    modeId: '#mode-toggle-calendar',
    modeName: 'Calendar',
    modeAction() {
      toggleCalendarMode()
    },
  })
}
