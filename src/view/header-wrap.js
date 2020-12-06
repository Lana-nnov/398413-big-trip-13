import AbstractView from "./abstract.js";

const getHeaderInfoTemplate = () => {
  return `<section class="trip-main__trip-info  trip-info"></section>`;
};

class HeaderInfoTemplate extends AbstractView {
  getTemplate() {
    return getHeaderInfoTemplate();
  }
}

export {HeaderInfoTemplate};
