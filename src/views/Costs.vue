<template>
  <div>
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

    <section class="columns">
      <div
        v-for="(item, index) in stops"
        :key="index"
        class="column is-3"
      >
        <div
          class="card"
        >
          <header class="card-header">
            <p class="card-header-title">
              {{ item.name }}
            </p>
          </header>
          <div
            v-if="costs[item.id]"
            class="card__content"
          >
            <div
              v-for="(cost, costIndex) in costs[item.id]"
              :key="costIndex"
              class="card__cost"
            >
              {{ cost.stop_point_to_name }}
              (ПЛН={{ cost.price }}, ЛГТ={{ cost.privilege_price }}, БАГ={{ cost.bag_price }})
            </div>
          </div>
          <footer class="card-footer">
            <button class="button is-info card-footer__btn">
              Добавить остановку
            </button>
          </footer>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'Costs',
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
        costs: []
      };
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
      }
    }
  };
</script>

<style scoped>
  .column {
    margin-top: 20px;
  }

  .card-footer__btn {
    margin: 10px auto;
  }

  .card__content:not(:last-child) {
    border-bottom: 1px solid #dbdbdb;
    padding: 0.75rem;
  }
</style>
