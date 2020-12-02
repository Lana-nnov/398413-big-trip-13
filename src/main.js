import {HeaderInfoTemplate} from "./view/header-wrap";
import {InfoDestination} from "./view/header-info";
import {InfoPrice} from "./view/header-info-price";
import {MenuControls} from "./view/menu-controls";
import {MenuTabs} from "./view/menu-tabs";
import {MenuFilters} from "./view/menu-filters";
import {FormSort} from "./view/form-sort";
import {List} from "./view/list-all";
import {FormEdit} from "./view/form-edit";
import {ListPoint} from "./view/list-point";
import {generatePoint} from "./mock/task.js";
import {LIST_COUNT} from "./const.js";
import {THIRD_POINT} from "./const.js";
import {render, renderElement, RenderPosition} from "./utils.js";

const points = new Array(LIST_COUNT).fill().map(generatePoint);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new ListPoint(point);
  const pointEditComponent = new FormEdit(point);
  
  const addEventTypeList = (point) => {
    const eventTypeWrapper = pointEditComponent.getElement().querySelector('.event__type-wrapper');
  } 
  
  const replacePointToForm = (point) => {
    pointListElement.replaceChild(pointEditComponent.getElement(), pointComponent.getElement());
    addEventTypeList(point);    
  };    
  
  const replaceFormToPoint = () => {
    pointListElement.replaceChild(pointComponent.getElement(), pointEditComponent.getElement());
  }; 
  
  pointComponent.getElement()
  .querySelector(`.event__rollup-btn`)
  .addEventListener(`click`, replacePointToForm);
  
  pointEditComponent.getElement()
  .querySelector(`form`)
  .addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToPoint();
  });
  
  render(pointListElement, pointComponent.getElement(), RenderPosition.BEFOREEND);
};

// HEADER
const mainContainer = document.querySelector(`.trip-main`);
render(mainContainer, new HeaderInfoTemplate().getElement(), RenderPosition.AFTERBEGIN);
const headerContainer = document.querySelector(`.trip-info`);
render(mainContainer, new InfoDestination(points).getElement(), RenderPosition.AFTERBEGIN);
render(headerContainer, new InfoPrice().getElement(), RenderPosition.BEFOREEND);

//MENU
render(mainContainer, new MenuControls().getElement(), RenderPosition.BEFOREEND);
const menuContainer = document.querySelector(`.trip-controls`);
render(menuContainer, new MenuTabs().getElement(), RenderPosition.AFTERBEGIN);
render(menuContainer, new MenuFilters().getElement(), RenderPosition.BEFOREEND);

//MAIN (forms)
const eventsContainer = document.querySelector(`.trip-events`); 
render(eventsContainer, new FormSort().getElement(), RenderPosition.AFTERBEGIN); 
render(eventsContainer, new List().getElement(), RenderPosition.BEFOREEND); 
const eventsList = document.querySelector('.trip-events__list');

//MAIN (points-list)
for (let i = 0; i < LIST_COUNT; i++) {
  renderPoint(eventsList, points[i]); 
};

