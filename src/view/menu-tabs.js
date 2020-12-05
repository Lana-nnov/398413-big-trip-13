import AbstractView from "./abstract.js";

const getMenuTabs = () => {
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
              <a class="trip-tabs__btn  trip-tabs__btn--active" href="#">Table</a>
              <a class="trip-tabs__btn" href="#">Stats</a>
            </nav>`;
};

class MenuTabs extends AbstractView {   
  getTemplate() {
    return getMenuTabs();
  }
}

export {MenuTabs};
