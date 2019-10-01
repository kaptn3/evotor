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

    <section
      v-if="stops.length > 0"
      class="columns is-multiline"
    >
      <div
        v-for="(item, index) in stops"
        :key="index"
        class="column is-3"
      >
        <card
          :stops="stops"
          :stop="item"
          :costs="costs"
          :route="routeId"
          @update="isModalActive = $event"
        />
      </div>
    </section>
    <div v-else>
      Нет данных
    </div>
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
        routeId: undefined,
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
      }
    }
  };
</script>

<style scoped>
  .column {
    margin-top: 20px;
  }
</style>
