<template>
  <div>
    <h1>Тарифная сетка</h1>
    <div
      class="row"
    >
      <div
        v-for="head in data"
        :key="head.id"
        class="column"
      >
        <b>{{ head.id }}</b>
      </div>
      <div class="column"></div>
    </div>
    <div
      v-for="row in data"
      :key="row.id"
      class="row"
    >
      <div
        v-for="column in data"
        :key="column.id"
        class="column"
      >
        {{ column.id }}
        {{ row.id }}
      </div>
      <div class="column">
        <b>{{ row.id }}</b>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    components: {
    },
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
          this.showStops();
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
    methods: {
      showStops() {
        for (let i = 0; i < this.data.length; i++) {
          const url = `${process.env.VUE_APP_API}stop-points/?route_id=${this.data[i].id}`;
          axios.get(url, this.config)
            .then((res) => {
              this.stops = res.data;
              console.log(res.data);

              axios.get(`${process.env.VUE_APP_API}cost/?route_id=${this.routeId}`)
                .then((res2) => {
                  this.costs = res2.data;
                });
            });
        }
      }
    }
  };
</script>

<style scoped>
  .row {
    display: flex;
  }
</style>
