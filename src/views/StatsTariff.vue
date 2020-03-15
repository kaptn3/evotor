<template>
  <div>
    <b-field type="is-info">
      <b-select
        v-model="routeId"
        placeholder="Выберите маршрут"
      >
        <option
          v-for="option in data"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </b-select>
      <p class="control">
        <button
          class="button is-info"
          @click="showStops"
        >
          Применить
        </button>
      </p>
    </b-field>
    <div class="block">
      <b-checkbox
        v-for="item in drivers"
        :key="item + '-driver'"
        v-model="checkDrivers"
        :native-value="item"
        type="is-info"
      >
        {{ item }}
      </b-checkbox>
    </div>
    <chart
      :data="table"
      :drivers="checkDrivers"
    />
    <b-table
      v-if="table.length > 0"
      :data="table"
      :hoverable="true"
      :loading="loading"
      :mobile-cards="true"
    >
      <template slot-scope="props">
        <b-table-column
          field="stop_point_from"
          label="ОТ"
        >
          {{ props.row.stop_point_from }}
        </b-table-column>
        <b-table-column
          field="stop_point_to"
          label="ДО"
        >
          {{ props.row.stop_point_to }}
        </b-table-column>
        <b-table-column
          field="cost"
          label="Цена"
        >
          {{ props.row.cost }}
        </b-table-column>
        <b-table-column
          field="car"
          label="Машина"
        >
          {{ props.row.car === null ? '-' : props.row.car }}
        </b-table-column>
        <b-table-column
          field="driver"
          label="Водитель"
        >
          {{ props.row.driver === null ? '-' : props.row.driver }}
        </b-table-column>
        <b-table-column
          field="cost_type"
          label="Тип оплаты"
        >
          {{ getCostType(props.row.cost_type) }}
        </b-table-column>
        <b-table-column
          field="time"
          label="Дата и время"
        >
          {{ getTime(props.row.time) }}
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="content has-text-grey has-text-centered">
          <p>Данные не найдены</p>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
  import axios from 'axios';
  import moment from 'moment';
  import Chart from '../components/Chart';

  export default {
    components: { Chart },
    data() {
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };

      return {
        data: [],
        config,
        routeId: undefined,
        allData: [],
        loading: true,
        drivers: [],
        checkDrivers: []
      };
    },
    computed: {
      table() {
        return this.allData.filter((item) => {
          for (let i = 0; i < this.checkDrivers.length; i++) {
            if (item.driver === this.checkDrivers[i]) {
              return true;
            }
          }
          return false;
        });
      }
    },
    mounted() {
      const url = `${process.env.VUE_APP_API}routes/`;
      axios.get(url, this.config)
        .then((res) => {
          this.data = res.data;
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
    methods: {
      showStops() {
        this.loading = true;
        const url = `${process.env.VUE_APP_API}scale-st/?route_id=${this.routeId}`;
        axios.get(url, this.config)
          .then((res) => {
            // this.allData = res.data;
            this.allData = [
              {
                stop_point_from: 'Донской',
                stop_point_to: 'Тула',
                cost: 135.3,
                car: null,
                driver: 'null',
                cost_type: 1,
                time: '2020-02-18T14:56:52.160392Z'
              },
              {
                stop_point_from: 'Донской',
                stop_point_to: 'Тула',
                cost: 145.3,
                car: null,
                driver: 'nul',
                cost_type: 1,
                time: '2019-10-23T17:50:22.046997Z'
              },
              {
                stop_point_from: 'Донской',
                stop_point_to: 'Тула',
                cost: 105.3,
                car: null,
                driver: 'nful',
                cost_type: 1,
                time: '2020-02-18T14:56:52.160392Z'
              },
              {
                stop_point_from: 'Донской',
                stop_point_to: 'Тула',
                cost: 141.3,
                car: null,
                driver: 'nul',
                cost_type: 1,
                time: '2020-02-18T14:56:52.160392Z'
              }
            ];
            this.setDrivers();
            this.loading = false;
          });
      },
      getTime(time) {
        const date = new Date(time);
        return moment(date).format('HH:mm, DD.MM.YYYY');
      },
      getCostType(type) {
        let text = 'Багаж';
        if (type === 1) {
          text = 'ПЛН';
        } else if (type === 2) {
          text = 'ЛГТ';
        }

        return text;
      },
      setDrivers() {
        for (let k = 0; k < this.allData.length; k++) {
          this.drivers.push(this.allData[k].driver);
        }
        this.drivers = this.drivers.filter((item, i, ar) => ar.indexOf(item) === i);
        this.checkDrivers = this.drivers;
      }
    }
  };
</script>
