import Observer from "../utils/observer.js";

export default class Points extends Observer {
  constructor() {
    super();
    this._points = [];
    this._destinations = [];
    this._offers = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  setDestinations(destinations) {
    this._destinations = destinations.slice();
  }

  getDestinations() {
    return this._destinations;
  }

  setOffers(offers) {
    this._offers = offers.slice();
  }

  getOffers() {
    return this._offers;
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting task`);
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1)
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          price: point.base_price,
          place: point.destination.name,
          dateStart: point.date_from !== null ? new Date(point.date_from) : point.date_from,
          dateFinish: point.date_to !== null ? new Date(point.date_to) : point.date_to,
          description: point.destination.description,
          photos: point.destination.pictures,
          isFavorite: point.is_favorite
        }
    );

    delete adaptedPoint.base_price;
    delete adaptedPoint.destination.name;
    delete adaptedPoint.date_from;
    delete adaptedPoint.date_to;
    delete adaptedPoint.destination.description;
    delete adaptedPoint.destination.pictures;
    delete adaptedPoint.is_favorite;

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
        {},
        point,
        {
          "base_price": Number(point.price),
          "date_from": point.dateStart instanceof Date ? point.dateStart.toISOString() : null,
          "date_to": point.dateFinish instanceof Date ? point.dateFinish.toISOString() : null,
          'destination': {
            description: point.description,
            name: point.place,
            pictures: point.photos,
          },
          "is_favorite": point.isFavorite
        }
    );

    delete adaptedPoint.price;
    delete adaptedPoint.dateStart;
    delete adaptedPoint.dateFinish;
    delete adaptedPoint.isFavorite;
    delete adaptedPoint.place;
    delete adaptedPoint.description;
    delete adaptedPoint.photos;

    return adaptedPoint;
  }
}
