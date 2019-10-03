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
          {{ option.name }} {{ option.id }}
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
    <div class="wrapper">
      <div
        v-for="(row, index) in stops"
        :key="index"
        class="row"
      >
        <cell-cost
          v-for="(column, columnIndex) in row"
          :id="column[0].id"
          :key="columnIndex"
          :stop-to="column[1].id"
          :route-id="routeId"
          :cost="checkCost(column[0].id, column[1].id)"
          @update="isModalActive = $event"
        />
        <div class="number-wrapper">
          <div
            v-if="row[0]"
            class="stop-name"
          >
            {{ row[0][1].name }}
          </div>
          <div
            v-else
            class="stop-name"
          >
            {{ stops[1][0][0].name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import CellCost from '../components/CellCost';

  export default {
    components: { CellCost },
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
        stops: [],
        costs: [],
        isModalActive: false
      };
    },
    watch: {
      isModalActive() {
        if (!this.isModalActive) {
          this.showStops();
        }
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
        this.stops = [];
        const url = `${process.env.VUE_APP_API}stop-points/?route_id=${this.routeId}`;
        axios.get(url, this.config)
          .then((res) => {
            // собираем все остановки, включая route
            const stopIds = [];
            const stops = [];
            for (let j = 0; j < res.data.length; j++) {
              const obj = res.data[j];
              if (stopIds.indexOf(obj.id) === -1) {
                stopIds.push(obj.id);
                stops.push({
                  id: obj.id,
                  name: obj.name
                });
              }
            }

            stops.reverse();
            for (let i = 0; i < stops.length; i++) {
              const arr = [];
              for (let k = i + 1; k < stops.length; k++) {
                arr.push([stops[k], stops[i]]);
              }
              arr.reverse();
              this.stops.push(arr);
            }
            this.stops.reverse();
            axios.get(`${process.env.VUE_APP_API}cost/?route_id=${this.routeId}`)
              .then((res2) => {
                this.costs = res2.data;
              });
          });
      },
      checkCost(id, stopTo) {
        if (this.costs[id]) {
          const stops = [];
          let costId;
          for (let i = 0; i < this.costs[id].length; i++) {
            if (this.costs[id][i].stop_point_to_id === stopTo) {
              const cost = this.costs[id][i];
              costId = this.costs[id][i].cost_id;
              stops.push(`ПЛН=${cost.price}, ЛГТ=${cost.privilege_price}, БАГ=${cost.bag_price}`);
            }
          }

          return {
            cost_id: costId,
            stops
          };
        }
        return {
          costId: undefined,
          stops: []
        };
      }
    }
  };
</script>

<style scoped>
  .wrapper {
    overflow-x: auto;
  }

  .row {
    display: flex;
  }

  .row:not(:last-child) .cell {
    border-bottom: none;
  }

  .cell:not(:first-child) {
    border-left: none;
  }

  .number-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 120px;
    flex-shrink: 0;
  }

  .stop-name {
    font-size: 1.02rem;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 50px;
  }
</style>
