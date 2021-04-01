import { renderTimings } from '../components/Timings'
import addToggleMode from './addToggleMode'
import { switchTo } from '../utils/dom-helper'
import addCalendarTimestamp from './addCalendarTimestamp'
import './calendar.less'

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
