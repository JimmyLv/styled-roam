import addCalendarTimestamp from './addCalendarTimestamp'
import addToggleMode from './addToggleMode'
import { renderTimings } from './components/render'
import { switchTo } from './utils/helper'

export default function toggleCalendarTimestamp() {
  function turnOn() {
    switchTo('calendar-mode')
    renderTimings()
    addCalendarTimestamp()
  }
  function turnOff() {
    switchTo('simple-calendar-mode')
  }

  return addToggleMode({
    id: 'mode-toggle-calendar',
    on: 'cube-add',
    off: 'cube',
    turnOn,
    turnOff,
  })
}
