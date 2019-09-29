<template>
  <div>
    <button
      class="button is-info is-medium"
      @click="isModalActive = true"
    >
      Добавить маршрут
    </button>
    <b-modal
      :active.sync="isModalActive"
      :width="640"
      scroll="keep"
    >
      <add-stops/>
    </b-modal>
    <stops-table :body="body"/>
  </div>
</template>

<script>
  import axios from 'axios';
  import StopsTable from '../components/StopsTable';
  import AddStops from '../components/AddStops';

  export default {
    components: {
      StopsTable,
      AddStops
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
        const url = `${process.env.VUE_APP_API}stop-points/?type=all`;
        const config = {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        };
        axios(url, config)
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
