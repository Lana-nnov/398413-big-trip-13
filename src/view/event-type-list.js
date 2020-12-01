import {TYPES} from "../const.js";
import {createElement} from "../utils.js";

const getEventTypeList = (point) => {
  const {type} = point;
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

class EventTypeList {
  constructor(point) {
    this._element = null;
    this._point = point;
  }

  getTemplate(point) {
    return getEventTypeList(this._point);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
};

export {EventTypeList};
