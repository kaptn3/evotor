<template>
  <div :style="{ display: data.length > 0 ? 'block' : 'none'}">
    <highcharts :options="options"/>
  </div>
</template>

<script>
  import Highcharts, { seriesType } from 'highcharts';
  import { Chart } from 'highcharts-vue';
  import moment from 'moment';

  Highcharts.setOptions({
    lang: {
      months: [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
      ],
      shortMonths: [
        'Янв', 'Фев', 'Мар', 'Апр',
        'Май', 'Июн', 'Июл', 'Авг',
        'Сен', 'Окт', 'Ноя', 'Дек'
      ],
      weekdays: [
        'Понедельник', 'Вторник', 'Среда', 'Четверг',
        'Пятница', 'Суббота', 'Воскресение'
      ],
    },
    global: {
      useUTC: false
    }
  });

  export default {
    name: 'Chart',
    components: {
      highcharts: Chart
    },
    props: {
      data: {
        type: Array,
        default() { return []; }
      },
      drivers: {
        type: Array,
        default() { return []; }
      }
    },
    data() {
      return {
        series: [],
        options: {
          chart: {
            type: 'spline'
          },
          title: {
            text: 'Динамика цен'
          },
          xAxis: {
            type: 'datetime',
            dateTimeLabelFormats: { // don't display the dummy year
              month: '%e. %b',
              year: '%b'
            },
          },
          yAxis: {
            title: {
              text: 'Цена'
            }
          },
          tooltip: {
            headerFormat: '<b>{series.name}</b><br>',
            pointFormat: '{point.x:%e. %b}: {point.y:.2f} руб'
          },
          plotOptions: {
            line: {
              dataLabels: {
                enabled: true
              },
              enableMouseTracking: false
            }
          },
          series: this.series
        }
      };
    },
    watch: {
      data() {
        const series = [];

        if (this.data) {
          for (let j = 0; j < this.drivers.length; j++) {
            series.push({
              name: this.drivers[j],
              data: []
            });
          }
          for (let k = 0; k < this.data.length; k++) {
            for (let i = 0; i < this.drivers.length; i++) {
              if (this.data[k].driver === this.drivers[i]) {
                series[i].data.push([Date.parse(this.data[k].time), this.data[k].cost]);
              }
            }
          }
          let dates = [];
          let timestamp = [];
          for (let i = 0; i < series.length; i++) {
            const arr = [];
            const arrr = [];
            const timeArr = [];
            for (let k = 0; k < series[i].data.length; k++) {
              const date = moment(series[i].data[k][0]).format('DD.MM.YYYY');
              arr.push(date);
              arrr.push(series[i].data[k][0]);
            }
            arr = arr.filter((item, i, ar) => {
              if (ar.indexOf(item) === i) {
                timeArr.push(arrr[i]);
              }
              return ar.indexOf(item) === i;
            });
            dates.push(arr);
            timestamp.push(timeArr);
          }
          const filterSeries = [];
          for (let i = 0; i < dates.length; i++) {
            const newArr = [];
            for (let k = 0; k < dates[i].length; k++) {
              let total = 0;
              for (let l = 0; l < series[i].data.length; l++) {
                const newDate = moment(series[i].data[l][0]).format('DD.MM.YYYY');
                if (newDate === dates[i][k]) {
                  total += series[i].data[l][1];
                }
              }
              newArr.push([timestamp[i][k], total]);
            }
            filterSeries.push({
              name: series[i].name,
              data: newArr
            });
          }
          this.series = filterSeries;
        }
      },
      series() {
        this.options.series = this.series;
      }
    }
  };
</script>
