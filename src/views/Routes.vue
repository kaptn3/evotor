<template>
  <div>
    <routes-table :data="body"/>
    btn Добавить
  </div>
</template>

<script>
  import axios from 'axios';
  import RoutesTable from '../components/RoutesTable';

  export default {
    name: 'Routes',
    components: {
      RoutesTable
    },
    data() {
      return {
        body: []
      };
    },
    mounted() {
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };
      const url = `${process.env.VUE_APP_API}routes/`;
      axios.get(url, config)
        .then((res) => {
          this.body = res.data;
        });
    }
  };
</script>
