import {FilterType} from "../const.js";
import {isDatePast, isDateFuture} from "./points.js";

export const filter = {
  [FilterType.EVERYTHING]: (points) => points,
  [FilterType.FUTURE]: (points) => points.filter((point) => isDateFuture(point.dateStart)),
  [FilterType.PAST]: (points) => points.filter((point) => isDatePast(point.dateFinish))
};