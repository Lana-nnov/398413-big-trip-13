import AbstractView from "./abstract.js";

const getInfoPrice = () => {
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">1230</span>
            </p>`;
};

class InfoPrice extends AbstractView {
  getTemplate() {
    return getInfoPrice();
  } 
}

export {InfoPrice};
