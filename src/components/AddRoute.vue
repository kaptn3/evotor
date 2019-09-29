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
        Добавить маршрут
      </h2>
      <b-field label="Номер маршрута (наименование)">
        <b-input
          v-model="name"
          required
        />
      </b-field>
      <b-field label="НДС для маршрута">
        <b-select
          v-model="indexNds"
          placeholder="НДС для маршрута"
        >
          <option
            v-for="(option, index) in nds"
            :key="index"
            :value="index"
          >
            {{ option }}
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
    name: 'AddRoute',
    data() {
      return {
        status: '',
        indexNds: '',
        name: ''
      };
    },
    computed: {
      nds() {
        return this.$store.state.nds;
      }
    },
    methods: {
      submitForm(e) {
        e.preventDefault();
        const config = {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        };
        const body = new FormData();
        body.set('nds', this.indexNds);
        body.set('name', this.name);

        const url = `${process.env.VUE_APP_API}routes/`;
        axios.post(url, body, config)
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
