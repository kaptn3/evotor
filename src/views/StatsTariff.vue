<template>
  <div>
    <b-field type="is-info">
      <b-select
        v-model="routeId"
        placeholder="Выберите маршрут"
      >
        <option
          v-for="option in data"
          :key="option.id"
          :value="option.id"
        >
          {{ option.name }}
        </option>
      </b-select>
      <p class="control">
        <button
          class="button is-info"
          @click="showStops"
        >
          Применить
        </button>
      </p>
    </b-field>
    <b-table
      v-if="table.length > 0"
      :data="table"
      :hoverable="true"
      :loading="loading"
      :mobile-cards="true"
    >
      <template slot-scope="props">
        <b-table-column field="stop_point_from" label="ОТ">
          {{ props.row.stop_point_from }}
        </b-table-column>
        <b-table-column field="stop_point_to" label="ДО">
          {{ props.row.stop_point_to }}
        </b-table-column>
        <b-table-column field="cost" label="Цена">
          {{ props.row.cost }}
        </b-table-column>
        <b-table-column field="car" label="Машина">
          {{ props.row.car === null ? '-' : props.row.car }}
        </b-table-column>
        <b-table-column field="driver" label="Водитель">
          {{ props.row.driver === null ? '-' : props.row.driver }}
        </b-table-column>
        <b-table-column field="cost_type" label="Тип оплаты">
          {{ getCostType(props.row.cost_type) }}
        </b-table-column>
        <b-table-column field="time" label="Дата и время">
          {{ getTime(props.row.time) }}
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="content has-text-grey has-text-centered">
          <p>Данные не найдены</p>
        </section>
      </template>
    </b-table>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
    data() {
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };

      return {
        data: [],
        config,
        routeId: undefined,
        table: [],
        loading: true
      };
    },
    mounted() {
      const url = `${process.env.VUE_APP_API}routes/`;
      axios.get(url, this.config)
        .then((res) => {
          this.data = res.data;
        })
        .catch(() => {
          this.$router.push('/login');
        });
    },
    methods: {
      showStops() {
        this.loading = true;
        const url = `${process.env.VUE_APP_API}scale-st/?route_id=${this.routeId}`;
        axios.get(url, this.config)
          .then((res) => {
            this.table = res.data;
            this.loading = false;
          });
      },
      getTime(time) {
        const date = new Date(time);
        return `${date.getUTCDate()}.${date.getUTCMonth()}.${date.getUTCFullYear()}`;
      },
      getCostType(type) {
        if (type === 1) {
          return 'ПЛН';
        } else if (type === 2) {
          return 'ЛГТ';
        }

        return 'Багаж';
      }
    }
  };
</script>
