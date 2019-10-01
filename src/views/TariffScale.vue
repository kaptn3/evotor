<template>
  <div>
    <h1>Тарифная сетка</h1>
    <b-field>
      <b-select
        v-model="routeId"
        placeholder="Маршрут"
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
    <div
      class="row"
    >
      <div
        v-for="head in stops"
        :key="head.id"
        class="column"
      >
        <b>{{ head.name }}, {{ head.id }}</b>
      </div>
      <div class="column"/>
    </div>
    <div
      v-for="row in stops"
      :key="row.id"
      class="row"
    >
      <div
        v-for="column in stops"
        :key="column.id"
        class="column"
      >
        <div v-if="checkCost(column.id, row.id).length > 0">
          <div
            v-for="(item, index) in checkCost(column.id, row.id)"
            :key="index"
          >
            {{ item }}
          </div>
        </div>
        <button
          v-else
          class="button is-info"
          @click="isModalActive = true"
        >
          Добавить стоимость {{ column.id }} {{ row.id }}
        </button>
        <b-modal
          :active.sync="isModalActive"
          :width="640"
          scroll="keep"
        >
          <add-cost
            :id="column.id"
            :route="routeId"
            :stop-to="row.id"
          />
        </b-modal>
      </div>
      <div class="column">
        <b>{{ row.name }}, {{ row.id }}</b>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import AddCost from '../components/AddCost';

  export default {
    components: { AddCost },
    data() {
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };

      return {
        data: [],
        config,
        routeId: 0,
        stops: [],
        costs: [],
        isModalActive: false
      };
    },
    watch: {
      isModalActive() {
        this.showStops();
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
        const url = `${process.env.VUE_APP_API}stop-points/?route_id=${this.routeId}`;
        axios.get(url, this.config)
          .then((res) => {
            this.stops = res.data;
            

            axios.get(`${process.env.VUE_APP_API}cost/?route_id=${this.routeId}`)
              .then((res2) => {
                this.costs = res2.data;
              });
          });
      },
      checkCost(id, to) {
        if (this.costs[id]) {
          const stops = [];
          for (let i = 0; i < this.costs[id].length; i++) {
            if (this.costs[id][i].stop_point_to_id === to) {
              const cost = this.costs[id][i];
              stops.push(`ПЛН=${cost.price}, ЛГТ=${cost.privilege_price}, БАГ=${cost.bag_price}`);
            }
          }
          return stops;
        }
        return 'Кнопка';
      }
    }
  };
</script>

<style scoped>
  .row {
    display: flex;
  }

  .column {
    border: 1px solid #aaa;
  }
</style>
