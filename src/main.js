import {getHeaderInfoTemplate} from "./view/header-wrap";
import {getInfoDestination} from "./view/header-info";
import {getInfoPrice} from "./view/header-info-price";
import {getMenuControls} from "./view/menu-controls";
import {getMenuTabs} from "./view/menu-tabs";
import {getMenuFilters} from "./view/menu-filters";
import {getFormSort} from "./view/form-sort";
import {getList} from "./view/list-all";
import {getFormEdit} from "./view/form-edit";
import {getEventTypeList} from "./view/event-type-list";
import {getListPoint} from "./view/list-point";
import {generatePoint} from "./mock/task.js";
import {LIST_COUNT} from "./const.js";
import {THIRD_POINT} from "./const.js";

const points = new Array(LIST_COUNT).fill().map(generatePoint);

const render = (element, model, place) => { 
    element.insertAdjacentHTML(place, model);  
};

// HEADER
const mainContainer = document.querySelector(`.trip-main`);
render(mainContainer, getHeaderInfoTemplate(), `afterbegin`);
const headerContainer = document.querySelector(`.trip-info`);
render(headerContainer, getInfoDestination(points), `afterbegin`);
render(headerContainer, getInfoPrice(), `beforeend`);

//MENU
render(mainContainer, getMenuControls(), `beforeend`);
const menuContainer = document.querySelector(`.trip-controls`);
render(menuContainer, getMenuTabs(), `afterbegin`);
render(menuContainer, getMenuFilters(), `beforeend`);

//MAIN (forms)
const eventsContainer = document.querySelector(`.trip-events`); 
render(eventsContainer, getFormSort(), `afterbegin`); 
render(eventsContainer, getList(), `beforeend`); 
const eventsList = document.querySelector('.trip-events__list');
render(eventsList, getFormEdit(points[THIRD_POINT]), `beforeend`);
const eventTypeWrapper = document.querySelector('.event__type-wrapper');
render(eventTypeWrapper, getEventTypeList(points[THIRD_POINT]), `beforeend`);

//MAIN (points-list)
for (let i = 0; i < LIST_COUNT; i++) {
  render(eventsList, getListPoint(points[i]), `beforeend`); 
};
