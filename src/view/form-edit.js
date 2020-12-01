import dayjs from "dayjs";
import {createElement} from "../utils.js";
import {TYPES} from "../const.js";

const getFormEdit = (point) => {
  const {description, place, type, dateStart, dateFinish, photos} = point;
  const createPhotoList = () => {
    return photos.map((elem) => {
      return `<img class="event__photo" src="${elem}" alt="Event photo">`;
    }).join(``);
  };

  const dateFirst = dayjs(dateStart).format(`DD/MM/YY-hh:mm`);
  const dateSecond = dayjs(dateFinish).format(`DD/MM/YY-hh:mm`);
  const photosList = createPhotoList();

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
                      ${type}
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${place}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      <option value="Amsterdam"></option>
                      <option value="${place}"></option>
                      <option value="Chamonix"></option>
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
                    <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
                  </div>
                  <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
                  <button class="event__reset-btn" type="reset">Cancel</button>
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                    <h3 class="event__section-title  event__section-title--offers">Offers</h3>
                    <div class="event__available-offers">
                      <div class="event__offer-selector">
                        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" checked>
                        <label class="event__offer-label" for="event-offer-luggage-1">
                          <span class="event__offer-title">Add luggage</span>
                          &plus;&euro;&nbsp;
                          <span class="event__offer-price">30</span>
                        </label>
                      </div>
                      <div class="event__offer-selector">
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
                      </div>
                    </div>
                  </section>
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${description}</p>                    
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

class FormEdit {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate() {
    return getFormEdit(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  };
};

export {FormEdit};
