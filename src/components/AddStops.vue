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
        Добавить остановку
      </h2>
      <b-field label="Наименование остановки">
        <b-input
          v-model="name"
          placeholder="Наименование остановки"
          required
        />
      </b-field>
      <b-field label="Сортировка">
        <b-input
          v-model="sort"
          placeholder="Сортировка"
          type="number"
          required
        />
      </b-field>
      <b-field
        label="Маршрут"
        type="is-info"
      >
        <b-select
          v-model="route"
          placeholder="Выберите маршрут"
          required
        >
          <option
            v-for="option in routes"
            :key="option.id"
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
    name: 'AddStops',
    data() {
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };

      return {
        status: '',
        route: undefined,
        name: '',
        config,
        routes: [],
        sort: undefined
      };
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
      submitForm(e) {
        e.preventDefault();
        const body = new FormData();
        body.set('route_id', this.route);
        body.set('name', this.name);
        body.set('sort', this.sort);

        const url = `${process.env.VUE_APP_API}stop-points/`;
        axios.post(url, body, this.config)
          .then(() => {
            this.status = 'ok';
          })
          .catch(() => {
            this.status = 'error';
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
