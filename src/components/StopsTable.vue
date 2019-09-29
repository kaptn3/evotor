<template>
  <a-table
    :body="abody"
    :head="head"
  />
</template>

<script>
  import ATable from './ATable';

  export default {
    props: {
      body: {
        type: Array,
        default() { return []; }
      }
    },
    components: { ATable },
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
