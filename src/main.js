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
import {render, RenderPosition, replace} from "./utils/render.js";

const points = new Array(LIST_COUNT).fill().map(generatePoint);

const renderPoint = (pointListElement, point) => {
  const pointComponent = new ListPoint(point);
  const pointEditComponent = new FormEdit(point);
  
  const replacePointToForm = () => {
    replace(pointEditComponent, pointComponent);    
  };    
  
  const replaceFormToPoint = () => {
    replace(pointComponent, pointEditComponent);
  }; 
  
  pointComponent.setEditClickHandler(() => replacePointToForm()); 
    
  pointEditComponent.setFormSubmitHandler(() => replaceFormToPoint());
    
  render(pointListElement, pointComponent, RenderPosition.BEFOREEND);
};

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
render(eventsContainer, new FormSort(), RenderPosition.AFTERBEGIN); 
render(eventsContainer, new List(), RenderPosition.BEFOREEND); 
const eventsList = document.querySelector('.trip-events__list');

//MAIN (points-list)
for (let i = 0; i < LIST_COUNT; i++) {
  renderPoint(eventsList, points[i]); 
};

