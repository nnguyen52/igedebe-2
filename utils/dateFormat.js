import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
export const dateFormat = (data) => {
  try {
    return `${
      new Date(data * 1000).toDateString().split(' ').splice(1)[0] +
      ' ' +
      new Date(data * 1000).toDateString().split(' ').splice(1)[1] +
      ', ' +
      new Date(data * 1000).toDateString().split(' ').splice(1)[2]
    } (${dayjs().to(dayjs(`${new Date(data * 1000).toDateString()}`))}  )`;
  } catch (err) {
    return console.log(err);
  }
};
