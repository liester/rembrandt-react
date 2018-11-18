export const pad = num => {
  return (`0${num}`).slice(-2);
};
export const hhmmss = secs => {
  let minutes = Math.floor(secs / 60);
  secs = secs % 60;
  const hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
};
