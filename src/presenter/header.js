import {MenuTabs} from "../view/menu-tabs.js";
import {render, RenderPosition} from "../utils/render.js";

export default class HeaderMenu {
  constructor(headerContainer, pointModel) {
    this._headerContainer = headerContainer;
    this._pointModel = pointModel;

    this._headerComponent = null;
    // this._destroyCallback = null;

    // this._handleFormSubmit = this._handleFormSubmit.bind(this);
    // this._handleDeleteClick = this._handleDeleteClick.bind(this);
    // this._escKeyDownHandler = this._escKeyDownHandler.bind(this);

    }

    init() {    
       this._headerComponent = new MenuTabs(this._getPoints());
    // this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    // this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

    render(this._headerContainer, this._headerComponent, RenderPosition.AFTERBEGIN);
    }

    /* createPoint(callback) {
        this._currentSortType = SortType.DEFAULT;
        this._filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
        this._pointNewPresenter.init(callback, this._getDestinations(), this._getOffers());
    }*/

    _getPoints() {    
        return this._pointModel.getPoints();    
    }
}