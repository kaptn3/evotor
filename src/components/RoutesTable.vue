<template>
  <section>
    <a-table
      :body="body"
      :head="head"
      :loading="loading"
    />
  </section>
</template>

<script>
  import ATable from './ATable';

  export default {
    name: 'RoutesTable',
    components: {
      ATable
    },
    props: {
      data: {
        type: Array,
        default() { return []; }
      },
      loading: {
        type: Boolean,
        required: true
      }
    },
    data() {
      return {
        head: [
          {
            field: 'name',
            label: 'Номер маршрута'
          },
          {
            field: 'nds',
            label: 'НДС для маршрута'
          }]
      };
    },
    computed: {
      body() {
        const body = this.data;

        for (let i = 0; i < this.data.length; i++) {
          const { nds } = this.data[i];
          body[i].nds = this.$store.state.nds[nds];
        }

        return body;
      }
    }
  };
</script>
