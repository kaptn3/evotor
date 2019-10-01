<template>
  <div>
    <h1>Тарифная сетка</h1>
    <div
      class="row"
    >
      <div
        v-for="head in stops"
        :key="head"
        class="column"
      >
        <b>{{ head }}</b>
      </div>
      <div class="column"></div>
    </div>
    <div
      v-for="row in stops"
      :key="row"
      class="row"
    >
      <div
        v-for="column in stops"
        :key="column"
        class="column"
      >
        {{ column }}
        {{ row }}
      </div>
      <div class="column">
        <b>{{ row }}</b>
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
            for (let i = 0; i < res.data.length; i++) {
              this.stops.push(res.data[i].id);
            }
            axios.get(`${process.env.VUE_APP_API}cost/?route_id=${this.data[i].id}`)
              .then((res2) => {
                console.log(this.stops);
                this.costs = res2.data;
                //console.log(this.costs);
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

  .column {
    border: 1px solid #aaa;
  }
</style>
