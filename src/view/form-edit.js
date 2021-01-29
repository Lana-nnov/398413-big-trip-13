import dayjs from "dayjs";
import SmartView from "./smart.js";
import flatpickr from "flatpickr";
import "../../node_modules/flatpickr/dist/flatpickr.min.css";

const types = [];

const getEventEditTemplate = (data, destinations, options, isNewPoint) => {
  const {description, place, type, dateStart, offers, dateFinish, photos, isDisabled, isSaving, isDeleting} = data;
  let {price} = data;

  data.price = Math.trunc(Number(price));

  const createPlacesList = () => {
    return destinations.map((elem) => {
      return `<option value="${elem.name}"></option>`;
    }).join(``);
  };

  const createOffersList = (disabled) => {
    return offers.map((elem) => {
      return `<div class="event__available-offers">
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${elem.title.replace(/ /g, `-`)}" 
        type="checkbox" name="event-offer-${elem.title.replace(/ /g, `-`)}" ${disabled ? `disabled` : ``}${elem.isChecked ? `checked` : ``}>
        <label class="event__offer-label" for="event-offer-${elem.title.replace(/ /g, `-`)}">
          <span class="event__offer-title">${elem.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${elem.price}</span>
        </label>
      </div>`;
    }).join(``);
  };

  const createPhotoList = () => {
    return photos.map((elem) => {
      return `<img class="event__photo" src="${elem.src}" alt=""${elem.description}">`;
    }).join(``);
  };

  const dateFirst = dayjs(dateStart).format(`DD/MM/YY-HH:mm`);
  const dateSecond = dayjs(dateFinish).format(`DD/MM/YY-HH:mm`);
  const isSubmitDisabled = (place === `` || dayjs(dateFinish).diff(dayjs(dateStart)) < 0);

  const createDateList = (disabled) => {
    return `<div class="event__field-group  event__field-group--time">
    <label class="visually-hidden" for="event-start-time-1">From</label>
    <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value=${dateFirst}
    ${disabled ? `disabled` : ``}>
    &mdash;
    <label class="visually-hidden" for="event-end-time-1">To</label>
    <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value=${dateSecond}
    ${disabled ? `disabled` : ``}>
  </div>`;
  };

  const createTypesList = () => {
    return options.map((elem) => {
      types.push(elem.type);
    });
  };

  const getEventTypeList = (disabled) => {
    createTypesList();
    const mySetTypes = new Set(types);
    const typesArray = Array.from(mySetTypes);
    const getTypeItem = (array) => {
      return array.map((typeItem) => {
        const typeInLowerCase = typeItem.toLowerCase();
        return `<div class="event__type-item">
            <input id="event-type-${typeInLowerCase}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${typeInLowerCase}"
            ${type === typeItem ? `checked` : ` `}
            ${disabled ? `disabled` : ``}>
            <label class="event__type-label  event__type-label--${typeInLowerCase}" for="event-type-${typeInLowerCase}-1">${typeInLowerCase}
            </label>
            </div>`;
      }).join(``);
    };
    return `
        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${getTypeItem(typesArray)}
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
                    ${getEventTypeList(isDisabled)}
                  </div>
                  <div class="event__field-group  event__field-group--destination">
                    <label class="event__label  event__type-output" for="event-destination-1">                     
                    </label>
                    <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" 
                    value="${place}" list="destination-list-1">
                    <datalist id="destination-list-1">
                      ${createPlacesList()}
                    </datalist>
                  </div>
                  ${createDateList(isDisabled)}
                  <div class="event__field-group  event__field-group--price">
                    <label class="event__label" for="event-price-1">
                      <span class="visually-hidden">Price</span>
                      &euro;
                    </label>
                    <input class="event__input  event__input--price" id="event-price-1" min="0" type="number" name="event-price" value="${price}"
                    ${isDisabled ? `disabled` : ``}>
                  </div>
                  <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? `disabled` : ``}
                  ${isDisabled ? `disabled` : ``}>${isSaving ? `Saving...` : `Save`}</button>
                  ${isNewPoint ? `<button class="event__reset-btn" type="reset" >Cancel</button>` : `<button class="event__reset-btn" type="reset" ${isDisabled ? `disabled` : ``}>${isDeleting ? `Deleting...` : `Delete`}</button>`}
                  ${isNewPoint ? ` ` : `<button class="event__rollup-btn" type="button" ${isDisabled ? `disabled` : ``}><span class="visually-hidden">Open event</span></button>`}
                </header>
                <section class="event__details">
                  <section class="event__section  event__section--offers">
                  ${createOffersList(isDisabled)}
                  </section>
                  <section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${isSubmitDisabled ? `` : description}</p>
                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${createPhotoList()}
                      </div>
                    </div>
                  </section>
                </section>
              </form>
            </li>`;
};

class FormEdit extends SmartView {
  constructor(point, destinations, offers, isNewPoint = false) {
    super();
    this._element = null;
    this._datepicker = null;
    this._point = point;
    this._destinations = destinations;
    this._offers = offers;
    this._isNewPoint = isNewPoint;

    if (point === null) {
      point = {
        price: `0`,
        place: ``,
        dateStart: new Date(),
        dateFinish: new Date(),
        description: ``,
        photos: [],
        type: `taxi`,
        offers: [],
        isFavorite: false,
        isDisabled: false,
        isSaving: false,
        isDeleting: false
      };
    }

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
    return getEventEditTemplate(this._data, this._destinations, this._offers, this._isNewPoint);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(FormEdit.parseDataToPoint(this._data));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._clickHandler);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    if (this._data.dateStart) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`#event-start-time-1`),
          {
            dateFormat: `d/m/y H:i`,
            enableTime: true,
            defaultDate: this._data.dateStart,
            onChange: this._dueFirstDateChangeHandler
          }
      );
    }

    if (this._data.dateFinish) {
      this._datepicker = flatpickr(
          this.getElement().querySelector(`#event-end-time-1`),
          {
            dateFormat: `d/m/y H:i`,
            enableTime: true,
            defaultDate: this._data.dateFinish,
            onChange: this._dueSecondtDateChangeHandler
          }
      );
    }
  }

  _dueFirstDateChangeHandler([userDate]) {
    this.updateData({
      dateStart: dayjs(userDate).toDate()
    });
  }

  _dueSecondtDateChangeHandler([userDate]) {
    this.updateData({
      dateFinish: dayjs(userDate).toDate()
    });
  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const cityObject = this._destinations.find((elem) => elem.name === evt.target.value);
    if (cityObject) {
      this.updateData({
        place: cityObject.name,
        description: cityObject.description,
        photos: cityObject.pictures
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
    const objIndex = offers.findIndex((obj) => obj.title === target);
    if (!offers[objIndex].isChecked) {
      offers[objIndex].isChecked = true;
      this.updateData({
        offers
      });
    } else {
      offers[objIndex].isChecked = false;
    }
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    const offerObject = this._offers.slice().find((elem) => elem.type === evt.target.value);
    const offers = offerObject.offers;
    this.updateData({
      type: evt.target.value,
      offers
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
    if (!this._isNewPoint) {
      this.getElement().querySelector(`.event__rollup-btn`).addEventListener(`click`, this._rollUpClickHandler);
    }
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
    return Object.assign(
        {},
        point,
        {
          isDisabled: false,
          isSaving: false,
          isDeleting: false
        }
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    delete data.isDisabled;
    delete data.isSaving;
    delete data.isDeleting;


    return data;
  }
}

export {FormEdit};
