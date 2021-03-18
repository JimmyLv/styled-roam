import addCalendarTimestamp from "./addCalendarTimestamp";
import { renderReact } from "./components/render";
import { addToggleMode } from "./focus";
import { switchTo } from "./utils/helper";

export default function toggleCalendarTimestamp() {
  function turnOn() {
    switchTo("calendar-mode");
    renderReact();
    addCalendarTimestamp();
  }
  function turnOff() {
    switchTo("simple-calendar-mode");
  }

  return addToggleMode({
    id: "mode-toggle-calendar",
    on: "cube-add",
    off: "cube",
    styleContent: ``,
    turnOn,
    turnOff,
  });
}
