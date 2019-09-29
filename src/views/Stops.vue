<template>
  <div>
    <stops-table :body="body"/>
  </div>
</template>

<script>
  import axios from 'axios';
  import StopsTable from '../components/StopsTable';

  export default {
    components: {
      StopsTable
    },
    data() {
      return {
        body: []
      };
    },
    mounted() {
      const url = `${process.env.VUE_APP_API}stop-points/?type=all`;
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };
      axios(url, config)
        .then((res) => {
          this.body = res.data;
        });
    }
  };
</script>
