<template>
  <section>
    <a-table
      :body="body"
      :head="head"
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
          }],
        loading: false
      };
    },
    computed: {
      body() {
        const body = this.data;

        for (let i = 0; i < this.data.length; i++) {
          let { nds } = this.data[i];
          switch (nds) {
          case 0:
            nds = 'Без НДС';
            break;
          case 1:
            nds = 'Основная ставка 0%';
            break;
          case 2:
            nds = 'Основная ставка 10%';
            break;
          case 3:
            nds = 'Расчётная ставка 10%';
            break;
          case 4:
            nds = 'Основная ставка 18%';
            break;
          case 5:
            nds = 'Расчётная ставка 18%';
            break;
          default:
            nds = 'Ошибка';
          }

          body[i].nds = nds;
        }

        return body;
      }
    }
  };
</script>
