import {PLACES} from "../const.js";
import {DESCRIPTIONS} from "../const.js";
import {FHOTOS_COUNT} from "../const.js";
import {OFFERS} from "../const.js";
import {getRandomInteger} from "../utils/common.js";
import {shuffleArray} from "../utils/common.js";
import dayjs from "dayjs";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

export const generateDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
  const descriptionBlock = [];
  for (let i = 0; i <= randomIndex; i++) {
    descriptionBlock.push(DESCRIPTIONS[i]);
  }
  return shuffleArray(descriptionBlock).join(` `);
};

const getRandomOffers = () => {
  const randomIndex = getRandomInteger(0, Object.values(OFFERS).length - 1);
  const offerBlock = [];
  for (let i = 0; i < randomIndex; i++) {
    offerBlock.push(Object.values(OFFERS)[i]);
  }
  return offerBlock;
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

const getPhotosBlock = () => {
  const photosBlock = new Array(FHOTOS_COUNT).fill().map(() => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });
  const randomIndex = getRandomInteger(1, photosBlock.length);
  return (photosBlock).slice(0, randomIndex);
};

const getRandomType = () => {
  const randomIndex = getRandomInteger(0, Object.keys(TYPES_WITH_OFFERS).length - 1);
  return Object.keys(TYPES_WITH_OFFERS)[randomIndex];
};


export const TYPES_WITH_OFFERS = {
  Taxi: {type: `Taxi`,
    offers: getRandomOffers()
  },
  Bus: {type: `Bus`,
    offers: shuffleArray(getRandomOffers())
  },
  Train: {type: `Train`,
    offers: shuffleArray(getRandomOffers())
  },
  Ship: {type: `Taxi`,
    offers: shuffleArray(getRandomOffers())
  },
  Transport: {type: `Transport`,
    offers: shuffleArray(getRandomOffers())
  },
  Drive: {type: `Drive`,
    offers: shuffleArray(getRandomOffers())
  },
  Flight: {type: `Flight`,
    offers: shuffleArray(getRandomOffers())
  },
  CheckIn: {type: `Check-in`,
    offers: shuffleArray(getRandomOffers())
  },
  Sightseeing: {type: `Sightseeing`,
    offers: shuffleArray(getRandomOffers())
  },
  Restaurant: {type: `Restaurant`,
    offers: shuffleArray(getRandomOffers())
  }
};

const generatePoint = () => {
  const dateStart = generateDateStart();
  const type = getRandomType();
  return {
    id: generateId(),
    place: getRandomPlace(),
    dateStart,
    dateFinish: generateDateFinish(dateStart),
    description: generateDescription(),
    photos: getPhotosBlock(),
    type: TYPES_WITH_OFFERS[type][`type`],
    offers: TYPES_WITH_OFFERS[type][`offers`],
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

export {generatePoint};
