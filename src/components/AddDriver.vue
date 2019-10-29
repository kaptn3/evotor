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
        Добавить водителя
      </h2>
      <b-field label="Имя водителя">
        <b-input
          v-model="driverName"
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
    name: 'AddDriver',
    props: {
      carId: {
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
        driverName: '',
        status: '',
        config
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
        body.set('driver_name', this.driverName);
        body.set('car_id', this.carId);

        const url = `${process.env.VUE_APP_API}drivers/`;
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
