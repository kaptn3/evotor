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
        Добавить стоимость
      </h2>
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
      route: {
        type: Number,
        required: true
      },
      stopTo: {
        type: Number,
        required: true
      },
      cost: {
        type: Object,
        default: undefined
      },
      put: {
        type: Boolean,
        default: false
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
        privilege_price: undefined
      };
    },
    mounted() {
      if (this.cost && this.put) {
        const str = this.cost.stops[0];
        this.price = str.substring(
          str.indexOf('ПЛН=') + 4,
          str.indexOf(', ')
        );
        this.privilege_price = str.substring(
          str.indexOf('ЛГТ=') + 4,
          str.indexOf('БАГ=') - 2
        );
        this.bag_price = str.substring(
          str.indexOf('БАГ=') + 4,
          str.length
        );
      }
    },
    methods: {
      submitForm(e) {
        e.preventDefault();
        /* eslint-disable */
        const condition = isNaN(this.price) + isNaN(this.privilege_price) + isNaN(this.bag_price);
        this.price = this.price.replace(',', '.');
        this.privilege_price = this.privilege_price.replace(',', '.');
        this.bag_price = this.bag_price.replace(',', '.');

        this.price = isNaN(this.price) ? '' : this.price;
        this.privilege_price = isNaN(this.privilege_price) ? '' : this.privilege_price;
        this.bag_price = isNaN(this.bag_price) ? '' : this.bag_price;
        if (condition === 0) {
          const body = new FormData();

          body.set('bag_price', this.bag_price);
          body.set('price', this.price);
          body.set('privilege_price', this.privilege_price);
          body.set('stop_point_to_id', this.stopTo);
          body.set('stop_point_from_id', this.id);
          body.set('route_id', this.route);
          body.set('type', 'scale');

          const url = `${process.env.VUE_APP_API}cost/`;
          let method = 'post';
          if (this.put) {
            method = 'put';
            body.set('cost_id', this.cost.cost_id);
          }
          axios[method](url, body, this.config)
            .then(() => {
              this.status = 'ok';
            })
            .catch((err) => {
              console.log(err);
              this.status = 'error';
            });
        }
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
