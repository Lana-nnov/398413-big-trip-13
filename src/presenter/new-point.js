import {FormEdit} from "../view/form-edit.js";
// import {generateId} from "../mock/point.js";
import {generateId} from "../utils/points.js";
import {remove, render, RenderPosition} from "../utils/render.js";
import {UserAction, UpdateType} from "../const.js";
// import dayjs from "dayjs";
// import {getCurrentDate} from "../utils/points.js";

export default class PointNew {
  constructor(pointListContainer, changeData) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

  }

  init(callback, destinations, offers) {
    this._point = null;
    this._destroyCallback = callback;
    if (this._pointEditComponent !== null) {
      return;
    }
    this._destinations = destinations;
    this._offers = offers;
    this._pointEditComponent = new FormEdit(this._point, this._destinations, this._offers);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);
    this._pointListContainer.querySelector(`.event__reset-btn`).innerHTML = `Cancel`;
    this._pointListContainer.querySelector(`.event__rollup-btn`).style.display = `none`;

    document.addEventListener(`keydown`, this._escKeyDownHandler);
  }

  destroy() {
    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    if (this._pointEditComponent === null) {
      return;
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener(`keydown`, this._escKeyDownHandler);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector(`.event__save-btn`).addEventListener(`click`, this._clickHandler);
  }

  _handleFormSubmit(point) {
    this._changeData(
        UserAction.ADD_POINT,
        UpdateType.MINOR,
        // Пока у нас нет сервера, который бы после сохранения
        // выдывал честный id задачи, нам нужно позаботиться об этом самим
        Object.assign({id: generateId()}, point)
    );
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

  _escKeyDownHandler(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this.destroy();
    }
  }
}
