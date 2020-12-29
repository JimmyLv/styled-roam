import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { addToggleMode } from "./focus";

dayjs.extend(customParseFormat);

export default function addCalendarTimestamp() {
  setInterval(() => {
    const currentTimestamp = dayjs().format("hh:mm A");
    console.log("currentTimestamp", currentTimestamp);
  }, 60000);

  function toggleCalendarTimestamp() {
    const currentDateStr = document.querySelector(
      ".roam-article .rm-title-display"
    ).textContent;
    console.log("currentDateStr", currentDateStr);
    // console.log("currentDateStr", dayjs(currentDateStr, "MMMM DD, YYYY"));

    if (!currentDateStr.includes(", 2020")) return;

    const currentDay = dayjs().format("YYYY-MM-DD");
    console.log("currentDay", currentDay);
    let prevTimestamp = "00:00";

    document
      .querySelectorAll(".roam-article .rm-level-0 > div.roam-block-container")
      .forEach((el) => {
        var timestamp = el.textContent.substring(0, 5); // only support 22:00, TODO: support 10:00 PM
        if (!new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).test(timestamp)) {
          return;
        }

        console.log("timestamp", timestamp);
        el.setAttribute("data-timestamp", timestamp);
        if (prevTimestamp) {
          const duration = dayjs(`${currentDay} ${timestamp}`).diff(
            dayjs(`${currentDay} ${prevTimestamp}`),
            "minute"
          );
          console.log("duration", duration);
          el.style.paddingTop = duration + "px";
          el.style.background =
            "linear-gradient(130deg,#ff7a18,#af002d 41.07%,#319197 76.05%)";
        }

        prevTimestamp = timestamp;
      });
  }

  const toggleCalendarIcon = addToggleMode({
    id: "mode-toggle-calendar",
    on: "cube-add",
    off: "cube",
    styleContent: `.roam-article .rm-level-0 > .roam-block-container:before {
    content: attr(data-timestamp);
    height: 1px;
    position: relative;
    right: 50px;
    top: 5px
  }
  .rm-block-main.rm-block__self, .rm-block__children {
    background: white;
  }
`,
  });

  function toggleCalendarMode() {
    toggleCalendarIcon();
    toggleCalendarTimestamp();
  }
  return toggleCalendarMode;
}
