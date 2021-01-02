import {List} from "../view/list-all";
import {FormSort} from "../view/form-sort.js";
import Point from './point.js';
import {render, RenderPosition, remove} from "../utils/render.js";
//import {updateItem} from "../utils/common.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import {sortPointTime, sortPointPrice} from "../utils/points.js";
import {filter} from "../utils/filters.js";

export default class Trip {
  constructor(tripContainer, pointModel, filterModel) {
    this._pointModel = pointModel;
    this._filterModel = filterModel;
    this._tripContainer = tripContainer;
    this._sortComponent = new FormSort();
    this._listComponent = new List();
    this._pointPresenter = {};
    this._currentSortType = SortType.DEFAULT;

    //this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._pointModel.addObserver(this._handleModelEvent);    
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init(points) {    
    this._renderBoard();
  }

  _getPoints() {
    const filterType = this._filterModel.getFilter();
    const points = this._pointModel.getPoints();
    const filtredPoints = filter[filterType](points);

    switch (this._currentSortType) {
      case SortType.BY_TIME:
        //return this._pointModel.getPoints().slice().sort(sortPointTime);  
        return filtredPoints.sort(sortPointTime);
      case SortType.BY_PRICE:
        //return this._pointModel.getPoints().slice().sort(sortPointPrice);   
        return filtredPoints.sort(sortPointPrice);    
      }

    return filtredPoints;
    //return this._pointModel.getPoints();
  }

  _clearTrip({resetSortType = false} = {}) {

    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};

    remove(this._sortComponent);
    //remove(this._noPointComponent); ///добавить!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

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
    //this._renderPointsList();
    this._renderBoard();    
  }

  _handleViewAction(actionType, updateType, update) {
    console.log(actionType, updateType, update);
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
    console.log(updateType, data);
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTrip();
        this._renderBoard();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTrip();
        this._renderBoard({resetSortType: true});
        break;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }

    console.log(this._sortComponent)

    this._sortComponent = new FormSort(this._currentSortType);
    console.log(this._sortComponent)
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {   
    const pointPresenter = new Point(this._listComponent, this._handleViewAction, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints(points) {
    points.slice().forEach((point) => this._renderPoint(point));
  }

  _renderPointsList() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
    //this._renderPoints();
    const points = this._getPoints().slice();
    this._renderPoints(points);
  }

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
    this._renderPointsList();
    //this._renderPoints(points.slice());
  } 
}
