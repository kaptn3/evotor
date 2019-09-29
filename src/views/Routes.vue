<template>
  <div>
    <button
      class="button is-info is-medium"
      @click="isModalActive = true"
    >
      Добавить маршрут
    </button>
    <routes-table :data="body"/>
    <b-modal
      :active.sync="isModalActive"
      :width="640"
      scroll="keep"
    >
      <add-route/>
    </b-modal>
  </div>
</template>

<script>
  import axios from 'axios';
  import RoutesTable from '../components/RoutesTable';
  import AddRoute from '../components/AddRoute';

  export default {
    name: 'Routes',
    components: {
      RoutesTable,
      AddRoute
    },
    data() {
      return {
        body: [],
        isModalActive: false
      };
    },
    watch: {
      isModalActive() {
        this.getData();
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        const config = {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        };
        const url = `${process.env.VUE_APP_API}routes/`;
        axios.get(url, config)
          .then((res) => {
            this.body = res.data;
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
