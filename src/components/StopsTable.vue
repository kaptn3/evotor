<template>
  <a-table
    :body="abody"
    :head="head"
    :loading="loading"
  />
</template>

<script>
  import ATable from './ATable';

  export default {
    components: { ATable },
    props: {
      body: {
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
            'label': 'Наименование остановки',
            'field': 'name'
          },
          {
            'label': 'Маршрут',
            'field': 'route'
          }
        ]
      };
    },
    computed: {
      abody() {
        const data = [];
        for (let i = 0; i < this.body.length; i++) {
          const obj = {};
          obj.name = this.body[i].name;
          obj.route = this.body[i].route.name;
          data.push(obj);
        }
        return data;
      }
    }
  };
</script>
