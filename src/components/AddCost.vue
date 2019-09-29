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
      <b-field label="Остановка">
        <b-select
          v-model="stop_point_to_id"
          placeholder="Остановка"
          required
        >
          <option
            v-for="option in stops"
            :key="option.id"
            :value="option.id"
          >
            {{ option.name }}
          </option>
        </b-select>
      </b-field>
      <b-field label="Полная стоимость">
        <b-input
          v-model="price"
          placeholder="Полная стоимость"
          type="text"
          required
        />
      </b-field>
      <b-field label="Льготная стоимость">
        <b-input
          v-model="privilege_price"
          placeholder="Льготная стоимость"
          type="text"
          required
        />
      </b-field>
      <b-field label="Багаж">
        <b-input
          v-model="bag_price"
          placeholder="Багаж"
          type="text"
          required
        />
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
    props: {
      id: {
        type: Number,
        required: true
      },
      stops: {
        type: Array,
        required: true
      },
      route: {
        type: Number,
        required: true
      }
    },
    data() {
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };

      return {
        status: '',
        config,
        bag_price: undefined,
        price: undefined,
        privilege_price: undefined,
        stop_point_to_id: undefined
      };
    },
    methods: {
      submitForm(e) {
        e.preventDefault();
        const body = new FormData();

        body.set('bag_price', this.bag_price);
        body.set('price', this.price);
        body.set('privilege_price', this.privilege_price);
        body.set('stop_point_to_id', this.stop_point_to_id);
        body.set('stop_point_from_id', this.id);
        body.set('route_id', this.route);

        const url = `${process.env.VUE_APP_API}cost/`;
        axios.post(url, body, this.config)
          .then(() => {
            this.status = 'ok';
          })
          .catch((err) => {
            console.log(err);
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
