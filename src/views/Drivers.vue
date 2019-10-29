<template>
  <div>
    <b-select
      v-model="routeId"
      placeholder="Выберите маршрут"
    >
      <option
        v-for="option in routes"
        :key="option.id"
        :value="option.id"
      >
        {{ option.name }}
      </option>
    </b-select>
    <b-field
      v-if="showChooseCar"
      type="is-info"
    >
      <b-select
        v-model="carId"
        placeholder="Выберите машину"
      >
        <option
          v-for="option in cars"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </b-select>
      <p class="control">
        <button
          class="button is-info"
          @click="getData"
        >
          Применить
        </button>
      </p>
    </b-field>
    <div v-if="showAddCar">
      <button
        class="button is-info is-medium"
        @click="isModalActive = true"
      >
        Добавить водителя
      </button>
      <b-modal
        :active.sync="isModalActive"
        :width="640"
        scroll="keep"
      >
        <add-driver :car-id="carId"/>
      </b-modal>
      <drivers-table
        :loading="loading"
        :body="body"
        :car-id="carId"
        :route-id="routeId"
        @update="isModalActive2 = $event"
      />
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import DriversTable from '../components/DriversTable';
  import AddDriver from '../components/AddDriver';

  export default {
    components: {
      DriversTable,
      AddDriver
    },
    data() {
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };

      return {
        body: [],
        isModalActive: false,
        isModalActive2: false,
        loading: false,
        routes: [],
        cars: [],
        carId: undefined,
        routeId: undefined,
        config,
        data: [],
        showChooseCar: false,
        showAddCar: false
      };
    },
    watch: {
      isModalActive() {
        this.getData();
      },
      isModalActive2() {
        this.getData();
      },
      routeId() {
        this.showChooseCar = true;
        this.getCars();
      }
    },
    mounted() {
      const url = `${process.env.VUE_APP_API}routes/`;
      axios.get(url, this.config)
        .then((res) => {
          this.routes = res.data;
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
    methods: {
      getCars() {
        this.loading = true;
        const url = `${process.env.VUE_APP_API}cars/?route_id=${this.routeId}`;
        axios.get(url, this.config)
          .then((res) => {
            this.cars = res.data;
            this.loading = false;
          })
          .catch(() => {
            this.$router.push('/login');
          });
      },
      getData() {
        this.loading = true;
        const url = `${process.env.VUE_APP_API}drivers/?car_id=${this.carId}`;
        axios.get(url, this.config)
          .then((res) => {
            this.body = res.data;
            this.loading = false;
            this.showAddCar = true;
          })
          .catch(() => {
            this.$router.push('/login');
          });
      }
    }
  };
</script>

<style scoped>
  .button {
    margin-bottom: 20px;
  }
</style>
