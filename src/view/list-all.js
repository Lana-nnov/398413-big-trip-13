import AbstractView from "./abstract.js";

const getList = () => {
  return `<ul class="trip-events__list"></ul>`;
};

class List extends AbstractView {
  getTemplate() {
    return getList();
  }
}

export {List};
