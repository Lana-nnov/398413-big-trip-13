import dayjs from "dayjs";

export const sortPointTime = (pointA, pointB) => {
  const durationPointA = dayjs(pointA.dateFinish).diff(dayjs(pointA.dateStart));
  const durationPointB = dayjs(pointB.dateFinish).diff(dayjs(pointB.dateStart));
  return durationPointB - durationPointA;
};

export const sortPointPrice = (priceA, priceB) => {
  return priceB.price - priceA.price;
};

export const isDatesEqual = (dateA, dateB) => {
  return (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, `D`);
};

export const getCurrentDate = () => {
  return dayjs();
};

export const isDatePast = (date) => {
  if (date < getCurrentDate()) {
    return true;
  }
  return false;
};

export const isDateFuture = (date) => {
  if (date > getCurrentDate()) {
    return true;
  }
  return false;
};

export const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

