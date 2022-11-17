export default function addToggleMode({ id, on, turnOn, off, turnOff }) {
  var modeIcon = document.createElement('div')
  modeIcon.id = id
  modeIcon.className = `bp3-button bp3-minimal bp3-icon-${off} bp3-small`

  var wrapper = document.querySelector('.rm-topbar')
  // wrapper.appendChild(modeIcon)

  function toggleMode() {
    if (
      [].find.call(modeIcon.classList, (name) => name === 'bp3-icon-' + on)
    ) {
      modeIcon.className = `bp3-button bp3-minimal bp3-icon-${off} bp3-small`
      turnOff?.()
    } else {
      modeIcon.className = `bp3-button bp3-minimal bp3-icon-${on} bp3-small`
      turnOn?.()
    }
  }

  modeIcon.addEventListener('click', toggleMode)

  return { modeIcon, toggleMode }
}
