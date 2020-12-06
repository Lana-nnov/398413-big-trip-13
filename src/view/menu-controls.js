import AbstractView from "./abstract.js";

const getMenuControls = () => {
  return `<div class="trip-main__trip-controls  trip-controls"></div>`;
};

class MenuControls extends AbstractView {
  getTemplate() {
    return getMenuControls();
  }
}

export {MenuControls};
