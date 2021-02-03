import {MenuTabs} from "./view/menu-tabs";
import {List} from "./view/list-all.js";
import StatisticsView from "./view/statistics.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import TripPresenter from './presenter/trip.js';
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {UpdateType, FilterType} from "./const.js";
import {MenuItem} from "./const.js";
import Api from "./api.js";

const pointsModel = new PointsModel();

const AUTHORIZATION = `Basic hjlu678kdfRThjYU`;
const END_POINT = `https://13.ecmascript.pages.academy/big-trip`;
const api = new Api(END_POINT, AUTHORIZATION);
const mainContainer = document.querySelector(`.page-body`);

const handlePointNewFormClose = () => {
  siteMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`)
  .classList.add(`trip-tabs__btn--active`);
  siteMenuComponent.setMenuItem(MenuItem.TABLE);
  addNewEventButton.disabled = false;
};

const addNewEventClickHandler = () => {
  addNewEventButton.disabled = true;
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      remove(statisticsComponent);
      tripPresenter.createPoint(handlePointNewFormClose);
      siteMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`)
      .classList.remove(`trip-tabs__btn--active`);
      break;
    case MenuItem.TABLE:
      tripPresenter.destroy();
      tripPresenter.init();
      remove(statisticsComponent);
      siteMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`)
      .classList.add(`trip-tabs__btn--active`);
      siteMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.STATS}]`)
      .classList.remove(`trip-tabs__btn--active`);
      break;
    case MenuItem.STATS:
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.renderTripInfo();
      statisticsComponent = new StatisticsView(pointsModel.getPoints(), pointsModel.getOffers());
      render(mainContainer, statisticsComponent, RenderPosition.BEFOREEND);

      siteMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.TABLE}]`)
      .classList.remove(`trip-tabs__btn--active`);
      siteMenuComponent.getElement().querySelector(`[data-menu-item=${MenuItem.STATS}]`)
      .classList.add(`trip-tabs__btn--active`);
      break;
  }
};

const filterModel = new FilterModel();
const siteMenuComponent = new MenuTabs();
render(mainContainer, siteMenuComponent, RenderPosition.AFTERBEGIN);
const eventsContainer = document.querySelector(`.trip-events`);
const controlsContainer = document.querySelector(`.trip-controls`);
render(eventsContainer, new List(), RenderPosition.BEFOREEND);
const tripPresenter = new TripPresenter(mainContainer, pointsModel, filterModel, api);
const filterPresenter = new FilterPresenter(controlsContainer, filterModel, pointsModel);
tripPresenter.init();

const addNewEventButton = document.querySelector(`.trip-main__event-add-btn`);
addNewEventButton.addEventListener(`click`, addNewEventClickHandler);
addNewEventButton.disabled = true;

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
  addNewEventButton.disabled = false;
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
  filterPresenter.init();
}).catch(() => {
  pointsModel.setPoints(UpdateType.INIT, []);
  addNewEventButton.disabled = false;
  siteMenuComponent.setMenuClickHandler(handleSiteMenuClick);
});


