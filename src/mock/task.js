import {TYPES} from "../const.js";
import {PLACES} from "../const.js";
import {DESCRIPTIONS} from "../const.js";
import {FHOTOS_COUNT} from "../const.js";
import {getRandomInteger} from "../utils.js";
import {shuffleArray} from "../utils.js";
  
const generateDescription = () => {  
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);     
  const descriptionBlock = [];
  
  for (let i = 0; i <= randomIndex; i++) {
    descriptionBlock.push(DESCRIPTIONS[i]);
  }  

  return shuffleArray(descriptionBlock).join(' ');
};
  
const getRandomPlace = () => {  
  const randomIndex = getRandomInteger(0, PLACES.length - 1);
  return PLACES[randomIndex];
};

const getRandomType = () => {  
  const randomIndex = getRandomInteger(0, TYPES.length - 1);
  return TYPES[randomIndex];
};

const showPhotos = () => {
  const photosBlock = new Array(FHOTOS_COUNT).fill().map(() => {
    return `http://picsum.photos/248/152?r=${Math.random()}`;
  });  
  
  const randomIndex = getRandomInteger(1, photosBlock.length);   
  return (photosBlock).slice(0, randomIndex);
};  

const isFavorite = Boolean(getRandomInteger(0, 1));

const generatePoint = () => {
   return {
    place: getRandomPlace(),
    description: generateDescription(),
    photos: showPhotos(),
    type: getRandomType(),   
	  isFavorite: Boolean(getRandomInteger(0, 1))
  };
};

export {generatePoint};
