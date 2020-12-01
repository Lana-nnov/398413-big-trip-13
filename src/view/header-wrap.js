import {createElement} from "../utils.js";

const getHeaderInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info"></section>`;
};

class HeaderInfoTemplate {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getHeaderInfoTemplate();
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

export {HeaderInfoTemplate};
