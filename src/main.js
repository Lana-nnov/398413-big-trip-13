import {getHeaderInfoTemplate} from "./view/header-wrap";
import {getInfoDestination} from "./view/header-info";
import {getInfoPrice} from "./view/header-info-price";
import {getMenuControls} from "./view/menu-controls";
import {getMenuTabs} from "./view/menu-tabs";
import {getMenuFilters} from "./view/menu-filters";
import {getFormSort} from "./view/form-sort";
import {getList} from "./view/list-all";
import {getFormEdit} from "./view/form-edit";
import {getListPoint} from "./view/list-point";

const LIST_COUNT = 3;

const render = (element, model, place) => { 
    element.insertAdjacentHTML(place, model);  
};

// HEADER
const tripContainer = document.querySelector(`.trip-main`);
render(tripContainer, getHeaderInfoTemplate(), `afterbegin`);
const tripHeaderContainer = document.querySelector(`.trip-info`);
render(tripHeaderContainer, getInfoDestination(), `afterbegin`);
render(tripHeaderContainer, getInfoPrice(), `beforeend`);

//MENU
render(tripContainer, getMenuControls(), `beforeend`);
const tripMenuContainer = document.querySelector(`.trip-controls`);
render(tripMenuContainer, getMenuTabs(), `afterbegin`);
render(tripMenuContainer, getMenuFilters(), `beforeend`);

//MAIN (forms)
const tripEventsContainer = document.querySelector(`.trip-events`);
render(tripEventsContainer, getFormSort(), `afterbegin`);
render(tripEventsContainer, getList(), `beforeend`);
const tripEventsEditContainer = document.querySelector('.trip-events__list');
render(tripEventsEditContainer, getFormEdit(), `beforeend`);

//MAIN (points-list)
for (let i = 0; i < LIST_COUNT; i++) {
  render(tripEventsContainer, getListPoint(), `beforeend`);
};

