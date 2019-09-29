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
        <card
          :stop="item"
          :costs="costs"
        />
      </div>
    </section>
  </div>
</template>

<script>
  import axios from 'axios';
  import Card from '../components/Card';

  export default {
    name: 'Costs',
    components: { Card },
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
</style>
