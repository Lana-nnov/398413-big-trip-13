import {FormSort} from "../view/form-sort.js";
import Point from './point.js';
import PointNewPresenter from './new-point.js';
import {render, RenderPosition, remove} from "../utils/render.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";
import {sortPointTime, sortPointPrice} from "../utils/points.js";
import {filter} from "../utils/filters.js";

export default class Trip {
  constructor(tripContainer, pointModel, filterModel) {
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._sortComponent = new FormSort();
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent); 
    this._pointNewPresenter = new PointNewPresenter(tripContainer.querySelector(`.trip-events__list`), this._handleViewAction);
  }

  init() {
    this._renderBoard();
  }

  createPoint() {
    this._currentSortType = SortType.DEFAULT;
    this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
    this._pointNewPresenter.init();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointModel.getPoints();
    const filtredPoints = filter[filterType](points);
    switch (this._currentSortType) {
      case SortType.BY_TIME:
        return filtredPoints.slice().sort(sortPointTime);
      case SortType.BY_PRICE:
        return filtredPoints.slice().sort(sortPointPrice);
    }

    return filtredPoints;
  }

  _clearTrip({resetSortType = false} = {}) {

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    // remove(this._noPointComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip();
    this._renderBoard();
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointModel.updatePoint(updateType, update);
        break;
      case UserAction.ADD_POINT:
        this._pointModel.addPoint(updateType, update);
        break;
      case UserAction.DELETE_POINT:
        this._pointModel.deletePoint(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderBoard();
        break;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new FormSort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    // const pointPresenter = new Point(this._listComponent, this._handleViewAction, this._handleModeChange);
    const pointPresenter = new Point(this._tripContainer.querySelector(`.trip-events__list`), this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.slice().forEach((point) => this._renderPoint(point));
  }

  /* _renderPointsList() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
    const points = this._getPoints().slice();
    this._renderPoints(points);
  }*/

  _renderNoPoints() {
    // Метод для рендеринга заглушки
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderBoard() {
    const points = this._getPoints();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(points);
    // this._renderPointsList();
  }
}
