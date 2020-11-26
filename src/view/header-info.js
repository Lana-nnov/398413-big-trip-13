const getInfoDestination = (points) => {

  const places = points.map(({place}) => place);

  const MAIN_COUNT_POINTS = 3;

  const createHeaderInfo = () => {
    return places.map((elem) => {
      return `${elem}`;
    }).slice(0, MAIN_COUNT_POINTS).join(` `);
  };

  const tripPoints = createHeaderInfo();

  return `<div class="trip-info__main">
              <h1 class="trip-info__title">${tripPoints}</h1>
              <p class="trip-info__dates">Mar 18&nbsp;&mdash;&nbsp;20</p>
            </div>`;
};

export {getInfoDestination};
