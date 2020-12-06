import {TYPES} from "../const.js";
import {PLACES} from "../const.js";
import {DESCRIPTIONS} from "../const.js";
import {FHOTOS_COUNT} from "../const.js";
import {getRandomInteger} from "../utils/common.js";
import {shuffleArray} from "../utils/common.js";
import dayjs from "dayjs";

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const descriptionBlock = [];
  for (let i = 0; i <= randomIndex; i++) {
    descriptionBlock.push(DESCRIPTIONS[i]);
  }
  return shuffleArray(descriptionBlock).join(` `);
};

const generateDateStart = () => {
  const maxDaysGap = 30;
  const minHoursGap = 1;
  const maxHoursGap = 4;
  const daysGap = getRandomInteger(0, maxDaysGap);
  const hoursGap = getRandomInteger(minHoursGap, maxHoursGap);
  return dayjs().add(daysGap, `day`).add(hoursGap, `hour`).toDate();
};

const generateDateFinish = (firstDate) => {
  const maxHoursGap = 24;
  const maxMinutesGap = 60;
  const hoursGap = getRandomInteger(0, maxHoursGap);
  const minutesGap = getRandomInteger(0, maxMinutesGap);
  return dayjs(firstDate).add(hoursGap, `hour`). add(minutesGap, `minute`).toDate();
};

const getRandomPlace = () => {
  const randomIndex = getRandomInteger(0, PLACES.length - 1);
  return PLACES[randomIndex];
};

const getRandomType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const getPhotosBlock = () => {
  const photosBlock = new Array(FHOTOS_COUNT).fill().map(() => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });
  const randomIndex = getRandomInteger(1, photosBlock.length);
  return (photosBlock).slice(0, randomIndex);
};

// const isFavorite = Boolean(getRandomInteger(0, 1));

const generatePoint = () => {
  const dateStart = generateDateStart();
  return {
    place: getRandomPlace(),
    dateStart,
    dateFinish: generateDateFinish(dateStart),
    description: generateDescription(),
    photos: getPhotosBlock(),
    type: getRandomType(),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

export {generatePoint};
