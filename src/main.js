// import {HeaderInfoTemplate} from "./view/header-wrap";
// import {InfoDestination} from "./view/header-info";
// import {InfoPrice} from "./view/header-info-price";
// import {MenuControls} from "./view/menu-controls";
import {MenuTabs} from "./view/menu-tabs";
import {List} from "./view/list-all.js";
// import {MenuFilters} from "./view/menu-filters";
// import {FormSort} from "./view/form-sort";
// import {generatePoint} from "./mock/point.js";
// import {LIST_COUNT} from "./const.js";
// import {THIRD_POINT} from "./const.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from './presenter/trip.js';
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType} from "./const.js";
// import {generateId} from "./utils/points.js";
import {MenuItem} from "./const.js";
import Api from "./api.js";

// const points = new Array(LIST_COUNT).fill().map(generatePoint);
const pointsModel = new PointsModel();

const AUTHORIZATION = `Basic hjlu678kdfRThjYU`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip/`;
const api = new Api(END_POINT, AUTHORIZATION);

// pointsModel.setPoints(points);


// HEADER
const mainContainer = document.querySelector(`.page-body`);
// render(mainContainer, new HeaderInfoTemplate(), RenderPosition.AFTERBEGIN);
// const headerContainer = document.querySelector(`.trip-info`);
// render(mainContainer, new InfoDestination(points), RenderPosition.AFTERBEGIN);
// render(headerContainer, new InfoPrice(), RenderPosition.BEFOREEND);

//MENU


const handlePointNewFormClose = () => {  
  siteMenuComponent.getElement().querySelector(`[data-header-type=${MenuItem.TABLE}]`)
  .classList.add(`trip-tabs__btn--active`);
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      tripPresenter.createPoint(handlePointNewFormClose);
      siteMenuComponent.getElement().querySelector(`[data-header-type=${MenuItem.TABLE}]`)
      .classList.remove(`trip-tabs__btn--active`);
      break;
    case MenuItem.TABLE:
      // Показать доску
      // Скрыть статистику
      break;
    case MenuItem.STATS:
      // Скрыть доску
      // Показать статистику
      break;
  }
};

const filterModel = new FilterModel();
const siteMenuComponent = new MenuTabs();
// render(mainContainer, new MenuControls(), RenderPosition.BEFOREEND);
// const menuContainer = document.querySelector(`.trip-controls`);
// render(menuContainer, siteMenuComponent, RenderPosition.AFTERBEGIN);
render(mainContainer, siteMenuComponent, RenderPosition.AFTERBEGIN);
const menuContainer = document.querySelector(`.trip-controls`);

siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);

//MAIN (forms)
const eventsContainer = document.querySelector(`.trip-events`); 
const controlsContainer = document.querySelector(`.trip-controls`); 
render(eventsContainer, new List(), RenderPosition.BEFOREEND);
const tripPresenter = new TripPresenter(mainContainer, pointsModel, filterModel);
// const tripPresenter = new TripPresenter(eventsContainer, pointsModel, filterModel); было!!!
const filterPresenter = new FilterPresenter(controlsContainer, filterModel, pointsModel);
// const filterPresenter = new FilterPresenter(menuContainer, filterModel, pointsModel);
tripPresenter.init();
//filterPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint(handlePointNewFormClose);
}); 

Promise
.all([
  api.getPoints(),
  api.getDestinations(),
  api.getOffers()
])
.then(([points, destinations, offers]) => {
  pointsModel.setDestinations(destinations);
  pointsModel.setOffers(offers);
  pointsModel.setPoints(UpdateType.INIT, points);
}).catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
});

  
