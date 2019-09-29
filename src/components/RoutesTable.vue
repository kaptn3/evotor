<template>
  <section>
    <b-table
      :data="data"
      :columns="head"
      :hoverable="true"
      :loading="loading"
      :mobile-cards="true"
    >
      <template slot="empty">
        <section class="content has-text-grey has-text-centered">
          <p>Данные не найдены</p>
        </section>
      </template>
    </b-table>
  </section>
</template>

<script>
  export default {
    name: 'RoutesTable',
    props: {
      body: {
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
      data() {
        const body = this.body;

        for (let i = 0; i < this.body.length; i++) {
          let { nds } = this.body[i];
          switch (nds) {
            case 0:
              nds = 'Без НДС';
            case 1:
              nds = 'Основная ставка 0%';
            case 2:
              nds = 'Основная ставка 10%';
            case 3:
              nds = 'Расчётная ставка 10%';
            case 4:
              nds = 'Основная ставка 18%';
            case 5:
              nds = 'Расчётная ставка 18%';
          }

          body[i].nds = nds;
        }

        return body;
      }
    }
  };
</script>
