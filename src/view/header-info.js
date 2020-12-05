import dayjs from "dayjs";
import AbstractView from "./abstract.js";
import {THIRD_POINT} from "../const.js";

const getInfoDestination = (points) => {
  const places = points.map(({place}) => place);
  const dateFirst = dayjs(points[0].dateStart).format(`MMM DD`);
  const dateSecond = dayjs(points[THIRD_POINT].dateFinish).format(`MMM DD`);

  const MAIN_COUNT_POINTS = 3;

  const createHeaderInfo = () => {
    return places.map((elem) => {
      return `${elem}`;
    }).slice(0, MAIN_COUNT_POINTS).join(` `);
  };

  const tripPoints = createHeaderInfo();

  return `<div class="trip-info__main">
              <h1 class="trip-info__title">${tripPoints}</h1>
              <p class="trip-info__dates">${dateFirst}&nbsp;&mdash;&nbsp;${dateSecond}</p>
            </div>`;
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
