import hotkeys from 'hotkeys-js'
import tippy from 'tippy.js'
import 'tippy.js/themes/light-border.css'

export default function addHotKeys({ shortcutKeys, modeId, modeName, modeAction }) {
  shortcutKeys.split('/').forEach((key) => {
    hotkeys(`alt+shift+${key}`, async function (event, handler) {
      event.preventDefault()
      await modeAction()
    })
  })

  tippy(modeId, {
    content: `<div style='padding: 1px 2px 0'>${modeName}<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-${shortcutKeys.toUpperCase()})</span></div>`,
    allowHTML: true,
    theme: 'light-border',
    placement: 'left',
    arrow: false,
  })
}
