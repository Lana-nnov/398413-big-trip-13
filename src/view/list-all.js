import {createElement} from "../utils.js";

const getList = () => {
  return `<ul class="trip-events__list"></ul>`;
};

class List {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return getList();
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

export {List};
