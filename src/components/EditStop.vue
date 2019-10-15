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
        Редактировать остановку
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
      const item = this.item;

      return {
        status: '',
        name: item.name,
        sort: item.sort
      };
    },
    methods: {
      submitForm(e) {
        e.preventDefault();
        const body = new FormData();
        body.set('id', this.item.id);
        body.set('name', this.name);
        body.set('sort', this.sort);

        const url = `${process.env.VUE_APP_API}stop-points/`;
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
