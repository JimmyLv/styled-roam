import { html } from 'htm/react'
import React from 'react'
import ReactDOM from 'react-dom'
import tippy from 'tippy.js'
import addCalendarTimestamp from '../modes/addCalendarTimestamp'
import { getTimeNow } from '../utils/datetime'
import './Timings.less'

export default function Timings() {
  const duration = getTimeNow()
  const [currentTime, setCurrentTime] = React.useState(duration[0])
  const [marginTop, setMarginTop] = React.useState(duration[1])

  React.useEffect(() => {
    tippy('#timing-dot', {
      theme: 'light-border',
      onShow(instance) {
        const tippyContent = instance.reference.dataset.tippyContent
        instance.popper.hidden = !tippyContent
        console.log('current time', tippyContent)
        instance.setContent(tippyContent)
      },
    })

    function refreshTimestamp() {
      addCalendarTimestamp()

      const relative = getTimeNow()
      setCurrentTime(relative[0])
      // start from 6:00 AM, each half time 30px/30mins
      setMarginTop(relative[1] - 360)
    }
    refreshTimestamp()
    const interval = setInterval(refreshTimestamp, 60000)
    return () => clearInterval(interval)
  }, [])

  return html`<div className="timings">
    <div className="timing-current" style="${{ marginTop: marginTop }}">
      <span id="timing-dot" data-tippy-content=${currentTime}></span>
    </div>
    <div><span className="timing-whole"> 06:00 </span> AM</div>
    <div className="timing-half">06:30</div>
    <div><span className="timing-whole"> 07:00 </span> AM</div>
    <div className="timing-half">07:30</div>
    <div><span className="timing-whole"> 08:00 </span> AM</div>
    <div className="timing-half">08:30</div>
    <div><span className="timing-whole"> 09:00 </span> AM</div>
    <div className="timing-half">09:30</div>
    <div><span className="timing-whole"> 10:00 </span> AM</div>
    <div className="timing-half">10:30</div>
    <div><span className="timing-whole"> 11:00 </span> AM</div>
    <div className="timing-half">11:30</div>
    <div><span className="timing-whole"> 12:00 </span> AM</div>
    <div className="timing-half">12:30</div>
    <div><span className="timing-whole"> 13:00 </span> PM</div>
    <div className="timing-half">13:30</div>
    <div><span className="timing-whole"> 14:00 </span> PM</div>
    <div className="timing-half">14:30</div>
    <div><span className="timing-whole"> 15:00 </span> PM</div>
    <div className="timing-half">15:30</div>
    <div><span className="timing-whole"> 16:00 </span> PM</div>
    <div className="timing-half">16:30</div>
    <div><span className="timing-whole"> 17:00 </span> PM</div>
    <div className="timing-half">17:30</div>
    <div><span className="timing-whole"> 18:00 </span> PM</div>
    <div className="timing-half">18:30</div>
    <div><span className="timing-whole"> 19:00 </span> PM</div>
    <div className="timing-half">19:30</div>
    <div><span className="timing-whole"> 20:00 </span> PM</div>
    <div className="timing-half">20:30</div>
    <div><span className="timing-whole"> 21:00 </span> PM</div>
    <div className="timing-half">21:30</div>
    <div><span className="timing-whole"> 22:00 </span> PM</div>
    <div className="timing-half">22:30</div>
    <div><span className="timing-whole"> 23:00 </span> PM</div>
    <div className="timing-half">23:30</div>
    <div style="${{ borderTop: '1px solid' }}" className="night-time">
      <span className="timing-whole"> 00:00 </span> AM
    </div>
    <div className="timing-half">00:30</div>
    <div><span className="timing-whole"> 01:00 </span> AM</div>
    <div className="timing-half">01:30</div>
    <div><span className="timing-whole"> 02:00 </span> AM</div>
    <div className="timing-half">02:30</div>
    <div><span className="timing-whole"> 03:00 </span> AM</div>
    <div className="timing-half">03:30</div>
    <div><span className="timing-whole"> 04:00 </span> AM</div>
    <div className="timing-half">04:30</div>
    <div><span className="timing-whole"> 05:00 </span> AM</div>
    <div
      className="timing-half"
      style="${{
        width: '100vw',
        borderBottom: '#dadce0 1px solid',
        borderTop: 'none',
      }}"
    >
      05:30
    </div>
  </div> `
}

export function renderTimings() {
  const root = document.getElementsByTagName('timings-root')[0] || document.createElement('timings-root')
  document.querySelector('.flex-v-box.roam-log-container').prepend(root)

  ReactDOM.render(html`<${Timings} />`, root)
}
