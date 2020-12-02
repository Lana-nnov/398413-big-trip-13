import {createElement} from "../utils.js";

const getInfoPrice = () => {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>`;
};

class InfoPrice {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getInfoPrice();
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
}

export {InfoPrice};
