<template>
  <div>
    <button
      class="button is-info is-medium"
      @click="isModalActive = true"
    >
      Добавить остановку
    </button>
    <b-modal
      :active.sync="isModalActive"
      :width="640"
      scroll="keep"
    >
      <add-stops/>
    </b-modal>
    <stops-table
      :loading="loading"
      :body="body"
      @update="isModalActive2 = $event"
      @delete="deleteEvent = $event"
    />
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
        isModalActive: false,
        isModalActive2: false,
        loading: false,
        deleteEvent: undefined
      };
    },
    watch: {
      isModalActive() {
        this.getData();
      },
      isModalActive2() {
        this.getData();
      },
      deleteEvent() {
        console.log('ee');
        this.getData();
      }
    },
    mounted() {
      this.getData();
    },
    methods: {
      getData() {
        this.loading = true;
        const url = `${process.env.VUE_APP_API}stop-points/?type=all`;
        const config = {
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        };
        axios(url, config)
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
