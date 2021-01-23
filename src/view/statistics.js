import dayjs from "dayjs";
import SmartView from "./smart.js";
import Chart from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

const renderMoneyChart = (moneyCtx, points, typesArray) => {
    const prices = points.map(({price}) => +price);
   

    const getPriceByType = (points) => {
        const sum = [];
        
        typesArray.forEach((type) => {
            let result = 0;
            points.forEach((elem) => {
                if (elem.type === type) {
                    result += Number(elem.price);
                }    
            }); 
            sum.push(result);            
        });
        return sum; 
   }

   const priceByType = getPriceByType(points);
    
    // Функция для отрисовки графика по цене
    return new Chart(moneyCtx, {
        plugins: [ChartDataLabels],
        type: `horizontalBar`,
        data: {
          labels: typesArray,
          datasets: [{
            data: priceByType,
            backgroundColor: `#ffffff`,
            hoverBackgroundColor: `#ffffff`,
            anchor: `start`
          }]
        },
        options: {
          plugins: {
            datalabels: {
              font: {
                size: 13
              },
              color: `#000000`,
              anchor: `end`,
              align: `start`,
              formatter: (val) => `€ ${val}`
            }
          },
          title: {
            display: true,
            text: `MONEY`,
            fontColor: `#000000`,
            fontSize: 23,
            position: `left`
          },
          scales: {
            yAxes: [{
              ticks: {
                fontColor: `#000000`,
                padding: 5,
                fontSize: 13,
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              barThickness: 44,
            }],
            xAxes: [{
              ticks: {
                display: false,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              minBarLength: 50
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
          }
        }
      })      
  };
  
const renderTypeChart = (typeCtx, points, typesArray) => {    

    const countPointsByType = (points) => {
        const pointsCountByType = [];
        
        typesArray.forEach((type) => {
            let result = 0;
            points.forEach((elem) => {
                if (elem.type === type) {
                    result += 1;
                }    
            }); 
            pointsCountByType.push(result);
        });         
        return pointsCountByType; 
    }

    const priceByType = countPointsByType(points);

    return new Chart(typeCtx, {
        plugins: [ChartDataLabels],
        type: `horizontalBar`,
        data: {
          labels: typesArray,
          datasets: [{
            data: priceByType,
            backgroundColor: `#ffffff`,
            hoverBackgroundColor: `#ffffff`,
            anchor: `start`
          }]
        },
        options: {
          plugins: {
            datalabels: {
              font: {
                size: 13
              },
              color: `#000000`,
              anchor: `end`,
              align: `start`,
              formatter: (val) => `${val}x`
            }
          },
          title: {
            display: true,
            text: `TYPE`,
            fontColor: `#000000`,
            fontSize: 23,
            position: `left`
          },
          scales: {
            yAxes: [{
              ticks: {
                fontColor: `#000000`,
                padding: 5,
                fontSize: 13,
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              barThickness: 44,
            }],
            xAxes: [{
              ticks: {
                display: false,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              minBarLength: 50
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
          }
        }
    });
};

const renderTimeChart = (timeCtx, points, typesArray) => {

    const getToHours = (ms) => {
        const days = Math.floor(ms / (24*60*60*1000));
        const daysms = ms % (24 * 60 * 60 * 1000);
        const hours = Math.floor((daysms) / (60 * 60 * 1000));
        const hoursms = ms % (60 * 60 * 1000);
        return hours;
    };

    const countPointsByTime = (points) => {
        const timeByType = [];
        
        typesArray.forEach((type) => {
            let result = 0;
            points.forEach((elem) => {
                if (elem.type === type) {
                  const diff = dayjs(elem.dateFinish).diff(dayjs(elem.dateStart));
                  result+= getToHours(diff);
                }    
            }); 
            timeByType.push(Math.floor(result/24));
        });        
        return timeByType; 
    }    

    const daysByType = countPointsByTime(points);

    return new Chart(timeCtx, {
        plugins: [ChartDataLabels],
        type: `horizontalBar`,
        data: {
          labels: typesArray,
          datasets: [{
            data: daysByType,
            backgroundColor: `#ffffff`,
            hoverBackgroundColor: `#ffffff`,
            anchor: `start`
          }]
        },
        options: {
          plugins: {
            datalabels: {
              font: {
                size: 13
              },
              color: `#000000`,
              anchor: `end`,
              align: `start`,
              formatter: (val) => `${val}x`
            }
          },
          title: {
            display: true,
            text: `TIME`,
            fontColor: `#000000`,
            fontSize: 23,
            position: `left`
          },
          scales: {
            yAxes: [{
              ticks: {
                fontColor: `#000000`,
                padding: 5,
                fontSize: 13,
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              barThickness: 44,
            }],
            xAxes: [{
              ticks: {
                display: false,
                beginAtZero: true,
              },
              gridLines: {
                display: false,
                drawBorder: false
              },
              minBarLength: 50
            }],
          },
          legend: {
            display: false
          },
          tooltips: {
            enabled: false,
          }
        }
      })   
};    

const createStatisticsTemplate = () => {
  // const completedPointCount = 0; // Нужно посчитать количество завершенных задач за период

  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>  

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Statistics extends SmartView {
  constructor(points, offers) {
    super();

    this._points = points;
    this._offers = offers;
    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();    
  }

  getTemplate() {
    return createStatisticsTemplate(this._points);
  }

  restoreHandlers() {
    this._setCharts();
  }  

  _setCharts() {
    // Нужно отрисовать два графика
    const moneyCtx = this.getElement().querySelector(`.statistics__chart--money`);
    const typeCtx = this.getElement().querySelector(`.statistics__chart--transport`);
    const timeCtx = this.getElement().querySelector(`.statistics__chart--time`);

    const BAR_HEIGHT = 55;
    moneyCtx.height = BAR_HEIGHT * 5;
    typeCtx.height = BAR_HEIGHT * 5;
    timeCtx.height = BAR_HEIGHT * 5;

    const types = this._points.map(({type}) => type);
    const mySetTypes = new Set(types);
    const typesArray = Array.from(mySetTypes);

    this._moneyChart = renderMoneyChart(moneyCtx, this._points, typesArray);
    this._typeChart = renderTypeChart(typeCtx, this._points, typesArray);
    this._timeChart = renderTimeChart(timeCtx, this._points, typesArray);
  }
}