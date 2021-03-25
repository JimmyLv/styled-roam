import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getDuration } from "./utils/datetime";

dayjs.extend(customParseFormat);

export default function addCalendarTimestamp() {
  [...document.querySelectorAll(".roam-log-page")].forEach((dateDocument) => {
    const dateTitle = dateDocument.querySelector("h1");
    const currentDateStr = (dateTitle && dateTitle.textContent) || "";
    console.log("currentDateStr", currentDateStr);

    const currentDay = dayjs().format("YYYY-MM-DD");
    console.log("currentDay", currentDay);

    let prevTimestamp = "00:00";
    let prevHeight = 0;
    let prevElement = null;

    [
      ...dateDocument.querySelectorAll(
        ".rm-level-0 > div.roam-block-container"
      ),
    ].forEach((el) => {
      // only support 22:00 and [11:00 - 11:30], TODO: add AM, PM support
      let timestamp =
        el.textContent && el.textContent.startsWith("[")
          ? el.textContent.substring(1, 6)
          : el.textContent.substring(0, 5);
      if (!new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).test(timestamp)) {
        // fallback to default create_time
        const createTime = Number(
          el.querySelector("[data-create-time]") &&
            el.querySelector("[data-create-time]").dataset &&
            el.querySelector("[data-create-time]").dataset.createTime
        );
        timestamp = dayjs(createTime).format().substring(11, 16);
        console.log(
          "createTime timestamp",
          dayjs(createTime).format(),
          timestamp
        );
      } else {
        console.log("manual timestamp", timestamp);
      }

      el.setAttribute("data-timestamp", timestamp);
      const duration = dayjs(`${currentDay} ${timestamp}`).diff(
        dayjs(`${currentDay} ${prevTimestamp}`),
        "minute"
      );
      console.log(`duration between ${prevTimestamp}~${timestamp}`, duration);
      const selfHeight = el.clientHeight;
      // const marginTop =
      //   duration - prevHeight >= 0 ? duration - prevHeight : 0;
      // start from 6:00 AM, each half time 30px/30mins
      const durationTop = getDuration(timestamp) - 360;
      el.style.top = `${durationTop}px`;
      if (duration - prevHeight < 0) {
        el.style.width = "50%";

        // 已经修改过上一个的 right，即上上个已经 left
        if (prevElement.style.right) {
          el.style.left = "50%";
        } else if (prevElement.style.left) {
          el.style.right = "50%";
        } else {
          prevElement.style.left = "50%";
          prevElement.style.width = "50%";
          el.style.right = "50%";
        }
      }

      prevElement = el;
      prevTimestamp = timestamp;
      prevHeight = selfHeight;
    });
  });
}
