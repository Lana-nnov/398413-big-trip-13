import {List} from "../view/list-all.js";
import {FormSort} from "../view/form-sort.js";
import Point from './point.js';
import PointNewPresenter from './new-point.js';
//import PointListView from "../view/point-list.js";
import {render, RenderPosition, remove} from "../utils/render.js";
//import {updateItem} from "../utils/common.js";
import {SortType, UpdateType, UserAction, FilterType} from "../const.js";
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
    this._pointNewPresenter = new PointNewPresenter(tripContainer, this._handleViewAction);
  }

  init(points) {    
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
    const filtredPoints = filter[filterType](points); //находим функцию по фильтрации в утилитах, куда передаем все точки    
    switch (this._currentSortType) {        
      case SortType.BY_TIME:
        //return this._pointModel.getPoints().slice().sort(sortPointTime);  
        return filtredPoints.slice().sort(sortPointTime);
      case SortType.BY_PRICE:
        //return this._pointModel.getPoints().slice().sort(sortPointPrice);   
        return filtredPoints.slice().sort(sortPointPrice);    
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

  _handleViewAction(actionType, updateType, update) { //передали данные в модель
    switch (actionType) {
      case UserAction.UPDATE_POINT: //вызываем нужный метод модели
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

  _handleModelEvent(updateType, data) { //обработали, что модель изменилась, решаем, что хотим перерисовать
    //передан, как наблюдатель в нашу модель this._pointModel.addObserver(this._handleModelEvent); 
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
        this._clearTrip({resetSortType: true}); //сбрасывать ли выбранную сортировку - да
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
