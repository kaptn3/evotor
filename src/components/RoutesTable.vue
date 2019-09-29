<template>
  <section>
    <b-table
      :data="body"
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
    }
  };
</script>
