import { generateStyleScript } from "./helper";

export function addToggleMode({
  id = "mode-toggle-focus",
  on = "eye-on",
  off = "eye-open",
  styleContent = "",
}) {
  var styleScript = generateStyleScript(styleContent);

  var modeIcon = document.createElement("div");
  modeIcon.id = id;
  modeIcon.className = `bp3-button bp3-minimal bp3-icon-${off} bp3-small`;

  var wrapper = document.querySelector(".roam-topbar .flex-h-box");
  wrapper.appendChild(modeIcon);

  function toggleMode() {
    if (
      [].find.call(modeIcon.classList, (name) => {
        return name === "bp3-icon-" + on;
      })
    ) {
      modeIcon.className = `bp3-button bp3-minimal bp3-icon-${off} bp3-small`;
      document.head.removeChild(styleScript);
    } else {
      modeIcon.className = `bp3-button bp3-minimal bp3-icon-${on} bp3-small`;
      document.head.appendChild(styleScript);
    }
  }

  modeIcon.addEventListener("click", toggleMode);

  return toggleMode;
}
