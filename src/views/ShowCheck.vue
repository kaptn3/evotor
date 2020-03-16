<template>
  <h1 class="title">
    {{ error }}
  </h1>
</template>

<script>
  import axios from 'axios';

  export default {
    name: 'ShowCheck',
    data() {
      return {
        error: ''
      };
    },
    mounted() {
      this.getLink();
    },
    methods: {
      getLink() {
        const qrCode = this.$route.params.id ? this.$route.params.id : '';
        const url = `${process.env.VUE_APP_API}check-receipt/?qr_code=${qrCode}`;
        axios.get(url)
          .then((res) => {
            const link = res.data.receipt_link;
            window.location = link;
          })
          .catch((error) => {
            this.error = error.response.data.message;
          });
      }
    }
  };
</script>
