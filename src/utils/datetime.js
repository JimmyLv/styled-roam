import dayjs from "dayjs";

export const getRelativeDuration = (targetTime = undefined) => {
  const time = dayjs(targetTime).format("HH:MM");

  const [h, m] = time.split(":");
  const marginTop = Number(h) * 60 + Number(m);
  return [time, marginTop];
};
