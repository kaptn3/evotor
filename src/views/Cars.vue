<template>
  <div>
    <b-field type="is-info">
      <b-select
        v-model="routeId"
        placeholder="Выберите маршрут"
      >
        <option
          v-for="option in data"
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
    <button
      class="button is-info is-medium"
      @click="isModalActive = true"
    >
      Добавить машину
    </button>
    <b-modal
      :active.sync="isModalActive"
      :width="640"
      scroll="keep"
    >
      <add-car/>
    </b-modal>
    <cars-table
      :loading="loading"
      :body="body"
      @update="isModalActive2 = $event"
      @delete="deleteEvent = $event"
    />
  </div>
</template>

<script>
  import axios from 'axios';
  import CarsTable from '../components/CarsTable';
  import AddCar from '../components/AddCar';

  export default {
    components: {
      CarsTable,
      AddCar
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
        deleteEvent: undefined,
        routeId: undefined,
        config,
        data: []
      };
    },
    watch: {
      isModalActive2() {
        this.getData();
      },
      deleteEvent() {
        this.getData();
      }
    },
    mounted() {
      const url = `${process.env.VUE_APP_API}routes/`;
      axios.get(url, this.config)
        .then((res) => {
          this.data = res.data;
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
    methods: {
      getData() {
        this.loading = true;
        const url = `${process.env.VUE_APP_API}cars/?route_id=${this.routeId}`;
        axios.get(url, this.config)
          .then((res) => {
            this.body = res.data;
            this.loading = false;
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
