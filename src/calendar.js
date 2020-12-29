import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { renderReact } from "./components/render";
import { addToggleMode } from "./focus";
import "./css/timings.less";
import { switchTo } from "./utils/helper";

dayjs.extend(customParseFormat);

export default function addCalendarTimestamp() {
  function toggleCalendarTimestamp() {
    [...document.querySelectorAll(".roam-log-page")].forEach((dateDocument) => {
      const dateTitle = dateDocument.querySelector("h1");
      const currentDateStr = (dateTitle && dateTitle.textContent) || "";
      console.log("currentDateStr", currentDateStr);

      if (!currentDateStr.includes(", 2020")) return;

      const currentDay = dayjs().format("YYYY-MM-DD");
      console.log("currentDay", currentDay);

      let prevTimestamp = "00:00";
      let prevHeight = 0;

      [
        ...dateDocument.querySelectorAll(
          ".rm-level-0 > div.roam-block-container"
        ),
      ].forEach((el) => {
        // only support 22:00, TODO: support 10:00 PM
        let timestamp = el.textContent && el.textContent.substring(0, 5);
        if (!new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).test(timestamp)) {
          // fallback to default create_time
          const createTime = dateDocument.querySelector("[data-create-time]")
            .dataset.createTime;
          timestamp = new Date(createTime).toTimeString().substring(0, 5);
        }

        console.log("timestamp", timestamp);
        el.setAttribute("data-timestamp", timestamp);
        const duration = dayjs(`${currentDay} ${timestamp}`).diff(
          dayjs(`${currentDay} ${prevTimestamp}`),
          "minute"
        );
        console.log("duration", duration);
        const selfHeight = el.clientHeight;
        const marginTop =
          duration - prevHeight >= 0 ? duration - prevHeight : 0;
        el.style.marginTop = `${marginTop}px`;

        prevTimestamp = timestamp;
        prevHeight = selfHeight;
      });
    });
  }

  function turnOn() {
    switchTo("calendar-mode");
    renderReact();
    toggleCalendarTimestamp();
  }
  function turnOff() {
    switchTo("document-mode");
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
