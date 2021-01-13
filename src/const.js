export const TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`,`Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];

export const PLACES = [`Kyev`, `Moscow`, `Erevan`, `Monako`, `Riga`, `Paris`, `Vilnius`, `Doha`, `Manila`];

export const DESCRIPTIONS = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `In rutrum ac purus sit amet tempus.`,
  'Phasellus eros mauris, condimentum sed nibh vitae.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam.'
];

export const OFFERS = {
  AddLuggage: {name: 'Add luggage',
  price: '30', isChecked: false},
  SwitchToComfortClass: {name: 'Switch to comfort class',
  price: '100', isChecked: false},
  AddMeal: {name: 'Add meal',
  price: '15', isChecked: false},
  AddSeats: {name: 'Choose seats',
  price: '5', isChecked: false},
  TravelByTrain: {name: 'Travel by train',
  price: '40', isChecked: false},
  TravelByTaxi: {name: 'Travel by taxi',
  price: '10', isChecked: false},
  AddInsurance: {name: 'AddInsurance',
  price: '100', isChecked: false},  
};  

export const SortType = {  
  DEFAULT: `default`,
  BY_TIME: `time-down`,
  BY_PRICE: `price-down`
};

export const UserAction = {
  UPDATE_POINT: `UPDATE_POINT`,
  ADD_POINT: `ADD_POINT`,
  DELETE_POINT: `DELETE_POINT`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
};

export const FilterType = {
  EVERYTHING: `everything`,
  FUTURE: `future`,
  PAST: `past`
};

export const FHOTOS_COUNT = 5;
export const LIST_COUNT = 10;
export const THIRD_POINT = 2;
export const MIN_PRICE = 10;
export const MAX_PRICE = 1000;
