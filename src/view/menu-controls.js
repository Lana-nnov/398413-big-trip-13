import {createElement} from "../utils.js";

const getMenuControls = () => {
  return `<div class="trip-main__trip-controls  trip-controls"></div>`;
};

class MenuControls {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getMenuControls();
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

export {MenuControls};
