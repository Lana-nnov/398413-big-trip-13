import dayjs from "dayjs";
// import he from "he";
import SmartView from "./smart.js";
import {TYPES, PLACES} from "../const.js";
import {TYPES_WITH_OFFERS, generateDescription} from "../mock/point.js";
import {getCurrentDate} from "../utils/points.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const BLANK_POINT = {
  price: `0`,
  place: ``,
  dateStart: dayjs(getCurrentDate()).format(`DD/MM/YY-HH:mm`),
  dateFinish: dayjs(getCurrentDate()).format(`DD/MM/YY-HH:mm`),
  description: ``,
  photos: [],
  type: [`taxi`],
  offers: TYPES_WITH_OFFERS[`Taxi`].offers,
  isFavorite: false
};

const getEventEditTemplate = (data) => {
  const {description, place, price, type, dateStart, dateFinish, photos, offers} = data;
  console.log(data)

  const createPlacesList = () => {    
    return PLACES.map((elem) => {
      return `<option value="${elem}"></option>`;
    }).join(``);
  };

  const createPhotoList = () => {
    return photos.map((elem) => {
      return `<img class="event__photo" src="${elem.src}" alt=""${elem.description}">`;
    }).join(``);
  };

  const dateFirst = dayjs(dateStart).format(`DD/MM/YY-HH:mm`);
  const dateSecond = dayjs(dateFinish).format(`DD/MM/YY-HH:mm`);
  const photosList = createPhotoList();
  const isSubmitDisabled = (place === ``);

  const getEventTypeList = () => {
    const getTypeItem = (types) => {
      return types.map((typeItem) => {
        const typeInLowerCase = typeItem.toLowerCase();
        return `<div class="event__type-item">
            <input id="event-type-${typeInLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeInLowerCase}"
            ${type === typeItem ? `checked` : ` `}>
            <label class="event__type-label  event__type-label--${typeInLowerCase}" for="event-type-${typeInLowerCase}-1">${typeInLowerCase}
            </label>
            </div>`;
      }).join(``);
    };
    return `
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${getTypeItem(TYPES)}
          </fieldset>
      </div>`;
  };

  const getOffersList = () => {
    const getOfferTitle = (offersItems) => {
      if (offersItems.length > 0) {
        return `<h3 class="event__section-title  event__section-title--offers">Offers</h3>`;
      }
      return `<span></span>`;
    };

    const getOfferItem = (offersBlocks) => {
      return offersBlocks.map((elem) => {
        return `<div class="event__offer-selector">
                  <input class="event__offer-checkbox  visually-hidden" id="event-offer-${elem.name.replace(/ /g, `-`)}" type="checkbox" name="event-offer-luggage">
                    <label class="event__offer-label" for="event-offer-${elem.name.replace(/ /g, `-`)}">
                        <span class="event__offer-title">${elem.name}</span>
                        &plus;&euro;&nbsp;
                        <span class="event__offer-price">${elem.price}</span>
                  </label>
                </div>`;
      }).join(``);
    };

    return `${getOfferTitle(offers)}<div class="event__available-offers">${getOfferItem(Object.values(offers))}</div>`;
  };

  return `<li class="trip-events__item">
              <form class="event event--edit" action="#" method="post">
                <header class="event__header">
                  <div class="event__type-wrapper">
                    <label class="event__type  event__type-btn" for="event-type-toggle-1">
                      <span class="visually-hidden">Choose event type</span>
                      <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
                    </label>
                    <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
                    ${getEventTypeList()}
                  </div>
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">                     
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${place}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createPlacesList()}
                    </datalist>
                  </div>
                  <div class="event__field-group  event__field-group--time">
                    <label class="visually-hidden" for="event-start-time-1">From</label>
                    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dateFirst}>
                    &mdash;
                    <label class="visually-hidden" for="event-end-time-1">To</label>
                    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dateSecond}>
                  </div>
                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" type="number" name="event-price" value="${price}">
                  </div>
                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}>Save</button>
                  <button class="event__reset-btn" type="reset">Delete</button>
                  <button class="event__rollup-btn" type="button">
                    <span class="visually-hidden">Open event</span>
                  </button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">                    
                    



                      <!--<div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-1" type="checkbox" name="event-offer-comfort" checked>
                        <label class="event__offer-label" for="event-offer-comfort-1">
                          <span class="event__offer-title">Switch to comfort class</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">100</span>
                        </label>
                      </div>
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-meal-1" type="checkbox" name="event-offer-meal">
                        <label class="event__offer-label" for="event-offer-meal-1">
                          <span class="event__offer-title">Add meal</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">15</span>
                        </label>
                      </div>
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-seats-1" type="checkbox" name="event-offer-seats">
                        <label class="event__offer-label" for="event-offer-seats-1">
                          <span class="event__offer-title">Choose seats</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">5</span>
                        </label>
                      </div>
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-train-1" type="checkbox" name="event-offer-train">
                        <label class="event__offer-label" for="event-offer-train-1">
                          <span class="event__offer-title">Travel by train</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">40</span>
                        </label>
                      </div>-->
                    </div>
                  </section>
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${isSubmitDisabled ? `` : description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${photosList}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};

class FormEdit extends SmartView {
  constructor(point = BLANK_POINT) {
    super();
    this._element = null;
    this._datepicker = null;
    this._point = point;
    this._data = FormEdit.parsePointToData(point);
    this._clickHandler = this._clickHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._offerCheckedHandler = this._offerCheckedHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._rollUpClickHandler = this._rollUpClickHandler.bind(this);
    this._dueFirstDateChangeHandler = this._dueFirstDateChangeHandler.bind(this);
    this._dueSecondtDateChangeHandler = this._dueSecondtDateChangeHandler.bind(this);
    this._setInnerHandlers();
    this._setDatepicker();
  }

  getTemplate() {
    return getEventEditTemplate(this._data);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(FormEdit.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._clickHandler);
  }

  /*
  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.card__delete`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  setRollUpClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollUpClickHandler);
  }*/

  _setDatepicker() {
    if (this._datepicker) {
      // В случае обновления компонента удаляем вспомогательные DOM-элементы,
      // которые создает flatpickr при инициализации
      this._datepicker.destroy();
      this._datepicker = null;
    }

    if (this._data.dateStart) {
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this._datepicker = flatpickr(
          this.getElement().querySelector(`#event-start-time-1`),
          {
            dateFormat: `d/m/y H:i`,
            defaultDate: this._data.dateStart,
            onChange: this._dueFirstDateChangeHandler // На событие flatpickr передаём наш колбэк
          }
      );
    }

    if (this._data.dateFinish) {
      // flatpickr есть смысл инициализировать только в случае,
      // если поле выбора даты доступно для заполнения
      this._datepicker = flatpickr(
          this.getElement().querySelector(`#event-end-time-1`),
          {
            dateFormat: `d/m/y H:i`,
            defaultDate: this._data.dateFinish,
            onChange: this._dueSecondtDateChangeHandler // На событие flatpickr передаём наш колбэк
          }
      );
    }
  }

  _dueFirstDateChangeHandler([userDate]) {
    // По заданию дедлайн у задачи устанавливается без учёта времеми,
    // но объект даты без времени завести нельзя,
    // поэтому будем считать срок у всех задач -
    // это 23:59:59 установленной даты
    this.updateData({
      dateStart: dayjs(userDate).hour(23).minute(59).second(59).toDate()
    });
  }

  _dueSecondtDateChangeHandler([userDate]) {
    // По заданию дедлайн у задачи устанавливается без учёта времеми,
    // но объект даты без времени завести нельзя,
    // поэтому будем считать срок у всех задач -
    // это 23:59:59 установленной даты

    this.updateData({
      dateFinish: dayjs(userDate).hour(23).minute(59).second(59).toDate()
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const city = PLACES.find((elem) => elem === evt.target.value);
    if (city) {
      this.updateData({
        place: city,
        description: generateDescription()
      });
    }
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      price: evt.target.value
    });
  }

  _offerCheckedHandler(evt) {
    const target = evt.target.id.slice(12).replace(/\W/g, ` `);
    const offers = this._data.offers.slice();
    const objIndex = offers.findIndex((obj) => obj.name === target);
    offers[objIndex].isChecked = true;
    this.updateData({
      offers
    });
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      type: evt.target.value,
      offers: TYPES_WITH_OFFERS[evt.target.value[0].toUpperCase() + evt.target.value.slice(1)].offers
    });
  }

  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(FormEdit.parseDataToPoint(this._data));
  }

  _rollUpClickHandler(evt) {
    evt.preventDefault();
    this._callback.rollupClick(FormEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector(`.event__reset-btn`).addEventListener(`click`, this._formDeleteClickHandler);
  }

  setRollUpClickHandler(callback) {
    this._callback.rollupClick = callback;
    this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollUpClickHandler);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector(`.event__input--destination`)
      .addEventListener(`change`, this._destinationChangeHandler);
    this.getElement()
      .querySelector(`.event__type-list`)
      .addEventListener(`change`, this._typeChangeHandler);
    this.getElement()
      .querySelector(`.event__input--price`)
      .addEventListener(`change`, this._priceChangeHandler);
    if (this.getElement().querySelector(`.event__offer-checkbox`)) {
      let array = Array.from(this.getElement().querySelectorAll(`.event__offer-checkbox`));
      array.forEach((element) => {
        element.addEventListener(`click`, this._offerCheckedHandler);
      });
    }
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setDeleteClickHandler(this._callback.deleteClick);
    this.setRollUpClickHandler(this._callback.rollupClick);
    this._setDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
  }

  static parsePointToData(point) {
    return Object.assign({}, point);
  }

  static parseDataToPoint(data) {
    return Object.assign({}, data);
  }
}

export {FormEdit};
