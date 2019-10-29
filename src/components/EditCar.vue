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
        Редактировать машину
      </h2>
      <b-field label="Номер машины">
        <b-input
          v-model="num"
          placeholder="Наименование остановки"
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

      return {
        status: '',
        num: item.name,
        routeId: item.route_id,
        routes: [],
      };
    },
    mounted() {
      const url = `${process.env.VUE_APP_API}routes/`;
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };
      axios.get(url, config)
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
        body.set('car_id', this.item.id);
        body.set('num', this.num);
        body.set('new_route_id', this.routeId);

        const url = `${process.env.VUE_APP_API}cars/`;
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
