import dayjs from "dayjs";

export function getDuration(time) {
  const [h, m] = time.split(":");
  return Number(h) * 60 + Number(m);
}

export const getTimeNow = () => {
  const time = dayjs().format("HH:mm");
  const duration = getDuration(time);
  return [time, duration];
};
