import {FormSort} from "../view/form-sort.js";
import {InfoDestination} from "../view/header-info";
import Point, {State as PointPresenterViewState} from './point.js';
import PointNewPresenter from './new-point.js';
import {render, RenderPosition, remove} from "../utils/render.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import {sortPointTime, sortPointPrice, sortPointDate} from "../utils/points.js";
import {filter} from "../utils/filters.js";
import NoPoints from "../view/no-points.js";
import LoadingView from "../view/loading.js";

export default class Trip {
  constructor(tripContainer, pointModel, filterModel, api) {
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._sortComponent = null;
    this._tripInformationBlock = null;
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;
    this._isLoading = true;
    this._loadingComponent = new LoadingView();
    this._emptyComponent = new NoPoints();
    this._api = api;

    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointNewPresenter = new PointNewPresenter(tripContainer.querySelector(`.trip-events__list`), this._handleViewAction);
  }

  init() {
    this._renderBoard();
    this._pointModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._currentSortType = SortType.DEFAULT;
    this._pointNewPresenter.init(callback, this._getDestinations(), this._getOffers());
  }

  _getDestinations() {
    return this._pointModel.getDestinations();
  }

  _getOffers() {
    return this._pointModel.getOffers();
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
      case SortType.DEFAULT:
        return filtredPoints.sort(sortPointDate);
    }

    return filtredPoints;
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    remove(this._tripInformationBlock);
    remove(this._emptyComponent);

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  destroy() {
    this._clearTrip({resetSortType: true});
    this._pointModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
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
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update).then((response) => {
          this._pointModel.updatePoint(updateType, response);
        })
        .catch(() => {
          this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
        });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update).then((response) => {
          this._pointModel.addPoint(updateType, response);
        })
        .catch(() => {
          this._pointNewPresenter.setAborting();
        });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter[update.id].setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update).then(() => {
          this._pointModel.deletePoint(updateType, update);
        })
        .catch(() => {
          this._pointPresenter[update.id].setViewState(PointPresenterViewState.ABORTING);
        });
        break;
    }
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter[data.id].init(data, this._getDestinations(), this._getOffers());
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderBoard();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderBoard();
        break;
    }
  }

  renderTripInfo() {
    this._renderTripInformation();
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    this._sortComponent = new FormSort(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer.querySelector(`.trip-events`), this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point, destinations, offers) {
    const pointPresenter = new Point(this._tripContainer.querySelector(`.trip-events__list`), this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point, destinations, offers);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points, destinations, offers) {
    points.slice().forEach((point) => this._renderPoint(point, destinations, offers));
  }

  _renderNoPoints() {
    render(this._tripContainer.querySelector(`.trip-events__list`), this._emptyComponent, RenderPosition.AFTERBEGIN);
  }

  _renderLoading() {
    render(this._tripContainer.querySelector(`.page-main`), this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _renderTripInformation() {
    const points = this._getPoints();
    if (this._tripInformationBlock !== null) {
      this._tripInformationBlock = null;
    }
    this._tripInformationBlock = new InfoDestination(points);
    render(this._tripContainer.querySelector(`.trip-main`), this._tripInformationBlock, RenderPosition.AFTERBEGIN);
  }

  _renderBoard() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const points = this._getPoints();
    const destinations = this._getDestinations();
    const offers = this._getOffers();
    const pointCount = points.length;

    if (pointCount === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(points, destinations, offers);

    if (pointCount !== 0) {
      this._renderTripInformation();
    }
  }
}
