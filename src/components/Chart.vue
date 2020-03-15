<template>
  <div :style="{ display: data.length > 0 ? 'block' : 'none'}">
    <highcharts :options="options"/>
  </div>
</template>

<script>
  import Highcharts from 'highcharts';
  import { Chart } from 'highcharts-vue';

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
          this.series = series;
        }
      },
      series() {
        this.options.series = this.series;
      }
    }
  };
</script>
