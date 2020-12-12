import dayjs from "dayjs";
import AbstractView from "./abstract.js";

const getListPoint = (point) => {
  const {place, type, dateStart, dateFinish, isFavorite} = point;
  const favoriteClassName = isFavorite ? `event__favorite-btn--active` : ` `;
  const dateFirst = dayjs(dateStart).format(`HH:mm`);
  const dateSecond = dayjs(dateFinish).format(`HH:mm`);
  const dateDay = dayjs(dateStart).format(`MMM DD`);
  const diff = dayjs(dateFinish).diff(dayjs(dateStart));

  const getToHouresMinutes = (ms) => {
    // const days = Math.floor(ms / (24*60*60*1000));
    const daysms = ms % (24 * 60 * 60 * 1000);
    const hours = Math.floor((daysms) / (60 * 60 * 1000));
    const hoursms = ms % (60 * 60 * 1000);
    const minutes = Math.floor((hoursms) / (60 * 1000));
    // const minutesms = ms % (60 * 1000);
    return hours + `H ` + minutes + `M`;
  };

  return `<li class="trip-events__item">
              <div class="event">
                <time class="event__date" datetime="2019-03-18">${dateDay}</time>
                <div class="event__type">
                  <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
                </div>
                <h3 class="event__title">${type} ${place}</h3>
                <div class="event__schedule">
                  <p class="event__time">
                    <time class="event__start-time">${dateFirst}</time>
                    &mdash;
                    <time class="event__end-time">${dateSecond}</time>
                  </p>
                  <p class="event__duration">${getToHouresMinutes(diff)}</p>
                </div>
                <p class="event__price">
                  &euro;&nbsp;<span class="event__price-value">20</span>
                </p>
                <h4 class="visually-hidden">Offers:</h4>
                <ul class="event__selected-offers">
                  <li class="event__offer">
                    <span class="event__offer-title">Order Uber</span>
                    &plus;&euro;&nbsp;
                    <span class="event__offer-price">20</span>
                  </li>
                </ul>
                <button class="event__favorite-btn ${favoriteClassName}" type="button">
                  <span class="visually-hidden">Add to favorite</span>
                  <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
                    <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
                  </svg>
                </button>
                <button class="event__rollup-btn" type="button">
                  <span class="visually-hidden">Open event</span>
                </button>
              </div>
            </li>`;
};

class ListPoint extends AbstractView {
  constructor(point) {
    super();
    this._element = null;
    this._point = point;
    this._clickHandler = this._clickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return getListPoint(this._point);
  }

  _clickHandler() {
    this._callback.click();
  }

  setEditClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._clickHandler);
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector(`.event__favorite-btn`).addEventListener(`click`, this._favoriteClickHandler);
  }
}

export {ListPoint};
