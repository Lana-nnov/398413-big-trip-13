import {List} from "../view/list-all";
import Point from './point.js';
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._listComponent = new List();
    this._pointPresenter = {};
    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._renderBoard();
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint);
  }

  _renderPoint(point) {
    const pointPresenter = new Point(this._listComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._points.slice().forEach((point) => this._renderPoint(point));
  }

  _renderPointsList() {
    render(this._tripContainer, this._listComponent, RenderPosition.BEFOREEND);
    this._renderPoints();
  }

  _renderNoPoints() {
    // Метод для рендеринга заглушки
  }

  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _clearPointList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
  }

  _renderBoard() {
    this._renderPointsList();
  }
}
