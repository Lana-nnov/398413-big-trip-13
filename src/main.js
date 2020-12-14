import {HeaderInfoTemplate} from "./view/header-wrap";
import {InfoDestination} from "./view/header-info";
import {InfoPrice} from "./view/header-info-price";
import {MenuControls} from "./view/menu-controls";
import {MenuTabs} from "./view/menu-tabs";
import {MenuFilters} from "./view/menu-filters";
import {FormSort} from "./view/form-sort";
import {generatePoint} from "./mock/task.js";
import {LIST_COUNT} from "./const.js";
import {THIRD_POINT} from "./const.js";
import {render, RenderPosition} from "./utils/render.js";
import TripPresenter from './presenter/trip.js';

const points = new Array(LIST_COUNT).fill().map(generatePoint);

// HEADER
const mainContainer = document.querySelector(`.trip-main`);
render(mainContainer, new HeaderInfoTemplate(), RenderPosition.AFTERBEGIN);
const headerContainer = document.querySelector(`.trip-info`);
render(mainContainer, new InfoDestination(points), RenderPosition.AFTERBEGIN);
render(headerContainer, new InfoPrice(), RenderPosition.BEFOREEND);

//MENU
render(mainContainer, new MenuControls(), RenderPosition.BEFOREEND);
const menuContainer = document.querySelector(`.trip-controls`);
render(menuContainer, new MenuTabs(), RenderPosition.AFTERBEGIN);
render(menuContainer, new MenuFilters(), RenderPosition.BEFOREEND);

//MAIN (forms)
const eventsContainer = document.querySelector(`.trip-events`); 
const tripPresenter = new TripPresenter(eventsContainer);
tripPresenter.init(points);

