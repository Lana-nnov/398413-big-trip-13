import {HeaderInfoTemplate} from "./view/header-wrap";
import {InfoDestination} from "./view/header-info";
import {InfoPrice} from "./view/header-info-price";
import {MenuControls} from "./view/menu-controls";
import {MenuTabs} from "./view/menu-tabs";
import {MenuFilters} from "./view/menu-filters";
import {FormSort} from "./view/form-sort";
import {generatePoint} from "./mock/point.js";
import {LIST_COUNT} from "./const.js";
import {THIRD_POINT} from "./const.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from './presenter/trip.js';
import PointsModel from "./model/points.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";

const points = new Array(LIST_COUNT).fill().map(generatePoint);
const pointsModel = new PointsModel();
pointsModel.setPoints(points);

// HEADER
const mainContainer = document.querySelector(`.trip-main`);
render(mainContainer, new HeaderInfoTemplate(), RenderPosition.AFTERBEGIN);
const headerContainer = document.querySelector(`.trip-info`);
render(mainContainer, new InfoDestination(points), RenderPosition.AFTERBEGIN);
render(headerContainer, new InfoPrice(), RenderPosition.BEFOREEND);

//MENU
const filterModel = new FilterModel();
render(mainContainer, new MenuControls(), RenderPosition.BEFOREEND);
const menuContainer = document.querySelector(`.trip-controls`);
render(menuContainer, new MenuTabs(), RenderPosition.AFTERBEGIN);

//render(menuContainer, new MenuFilters(filters, `all`), RenderPosition.BEFOREEND);
//render(menuContainer, new MenuFilters(), RenderPosition.BEFOREEND);

//MAIN (forms)
const eventsContainer = document.querySelector(`.trip-events`); 
const tripPresenter = new TripPresenter(eventsContainer, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(menuContainer, filterModel, pointsModel);
//const tripPresenter = new TripPresenter(eventsContainer);
//tripPresenter.init(points);
tripPresenter.init();
filterPresenter.init();

document.querySelector(`.trip-main__event-add-btn`).addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tripPresenter.createPoint();
  });




