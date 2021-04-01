import hotkeys from 'hotkeys-js'
import tippy from 'tippy.js'

export default function addHotKeys({ shortcutKeys, modeId, modeName, modeAction }) {
  if (shortcutKeys.includes('/')) {
    shortcutKeys.split('/').forEach((key) =>
      hotkeys(`alt+shift+${key}`, async function (event, handler) {
        event.preventDefault()
        await modeAction()
      }),
    )
  }

  tippy(modeId, {
    content: `${modeName}<sup>mode</sup> <span style="font-size:7pt">(Alt-Shift-${shortcutKeys})</span>`,
    allowHTML: true,
    theme: 'light-border',
  })
}
