<template>
  <div class="card">
    <b-message
      v-if="status === 'ok'"
      type="is-success"
    >
      Готово
    </b-message>
    <b-message
      v-if="status === 'error'"
      type="is-warning"
    >
      Произошла ошибка
    </b-message>
    <form
      v-if="status === ''"
      @submit="submitForm"
    >
      <h2 class="title is-3">
        Редактировать водителя
      </h2>
      <b-field label="Имя водителя">
        <b-input
          v-model="name"
          placeholder="Имя водителя"
          required
        />
      </b-field>
      <b-field label="Маршрут">
        <b-select
          v-model="routeId"
          type="is-info"
          placeholder="Выберите маршрут"
          required
        >
          <option
            v-for="(option, index) in routes"
            :key="index"
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Номер машины">
        <b-select
          v-model="carId"
          type="is-info"
          placeholder="Выберите машину"
          required
        >
          <option
            v-for="(option, index) in cars"
            :key="index"
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <button class="button is-info is-fullwidth">
        Сохранить
      </button>
    </form>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'EditStops',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    data() {
      const { item } = this;
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };

      return {
        status: '',
        name: item.name,
        routeId: item.route_id,
        carId: item.car_id,
        routes: [],
        cars: [],
        config
      };
    },
    mounted() {
      this.getRoutes();
    },
    methods: {
      submitForm(e) {
        e.preventDefault();
        const body = new FormData();
        body.set('driver_id', this.item.id);
        body.set('driver_name', this.name);
        body.set('new_car_id', this.carId);

        const url = `${process.env.VUE_APP_API}drivers/`;
        const config = {
          method: 'PUT',
          url,
          data: body,
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        };
        axios(config)
          .then(() => {
            this.status = 'ok';
          })
          .catch(() => {
            this.status = 'error';
          });
      },
      getRoutes() {
        const url = `${process.env.VUE_APP_API}routes/`;
        axios.get(url, this.config)
          .then((res) => {
            this.routes = res.data;
            this.getCars();
          })
          .catch(() => {
            this.$router.push('/login');
          });
      },
      getCars() {
        const url = `${process.env.VUE_APP_API}cars/`;
        axios.get(url, this.config)
          .then((res) => {
            this.cars = res.data;
          })
          .catch(() => {
            this.$router.push('/login');
          });
      }
    }
  };
</script>

<style scoped>
  .card {
    padding: 30px;
  }

  .button {
    margin-top: 20px;
  }
</style>
