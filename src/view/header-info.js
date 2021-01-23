import dayjs from "dayjs";
import AbstractView from "./abstract.js";
import {THIRD_POINT} from "../const.js";
import {reducer} from "../utils/points.js";

const getInfoDestination = (points) => {
  const places = points.map(({place}) => place);
  const prices = points.map(({price}) => +price);
  const dateFirst = dayjs(points[0].dateStart).format(`MMM DD`);
  // const dateSecond = dayjs(points[THIRD_POINT].dateFinish).format(`MMM DD`);
  const mySetPlaces = new Set (places);
  const placesArray = Array.from(mySetPlaces);

  const MAIN_COUNT_POINTS = 3;

  const createHeaderInfo = () => {
    if (placesArray.length >= MAIN_COUNT_POINTS) {
      return placesArray.map((elem) => {
        return `${elem}`;
      }).slice(0, MAIN_COUNT_POINTS).join(` `);
    } else {
      return placesArray.map((elem) => {
        return `${elem}`;
      }).join(` `);
    }
  };

  const createDateSecond = () => {
    if (placesArray.length >= MAIN_COUNT_POINTS) {
      const pointObject = points.find((elem) => elem.place === placesArray[THIRD_POINT]);
        return dayjs(pointObject.dateFinish).format(`MMM DD`);
      } else {
        const pointObject = points.find((elem) => elem.place === placesArray[placesArray.length - 1]);
        return dayjs(pointObject.dateFinish).format(`MMM DD`);
    }
  }  

  const createHeaderPriceInfo = () => {
    return prices.reduce(reducer);
  };

  const tripPoints = createHeaderInfo(points);
  const tripPrice = createHeaderPriceInfo();

  return `<section class="trip-main__trip-info  trip-info"><div class="trip-info__main">
              <h1 class="trip-info__title">${tripPoints}</h1>
              <p class="trip-info__dates">${dateFirst}&nbsp;&mdash;&nbsp;${createDateSecond()}</p>
            </div>
            <p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${tripPrice}</span>
            </p>
            </section>`;
};

class InfoDestination extends AbstractView {
  constructor(points) {
    super();
    this._element = null;
    this._points = points;
  }

  getTemplate() {
    return getInfoDestination(this._points);
  }
}

export {InfoDestination};
