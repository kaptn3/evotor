<template>
  <section>
    <b-table
      :data="abody"
      :hoverable="true"
      :loading="loading"
      :mobile-cards="true"
    >
      <template slot-scope="props">
        <b-table-column
          field="name"
          label="Наименование остановки"
        >
          {{ props.row.name }}
        </b-table-column>
        <b-table-column
          field="route"
          label="Маршрут"
        >
          {{ props.row.route }}
        </b-table-column>
        <b-table-column
          field="sort"
          label="Сортировка"
        >
          {{ props.row.sort }}
        </b-table-column>
        <b-table-column
          field="actions"
          label=" "
        >
          <button
            class="btn-action edit"
            @click="edit(props.row)"
          />
          <button
            class="btn-action remove"
            @click="remove(props.row.id)"
          />
        </b-table-column>
      </template>
      <template slot="empty">
        <section class="content has-text-grey has-text-centered">
          <p>Данные не найдены</p>
        </section>
      </template>
    </b-table>
    <b-modal
      :active.sync="isModalActive"
      :width="640"
      scroll="keep"
    >
      <edit-stop :item="item"/>
    </b-modal>
  </section>
</template>

<script>
  import axios from 'axios';
  import EditStop from './EditStop';

  export default {
    components: { EditStop },
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
      const config = {
        headers: {
          'Authorization': `Bearer ${this.$store.state.token}`
        }
      };

      return {
        config,
        item: undefined,
        isModalActive: false,
        deleteEvent: 0
      };
    },
    computed: {
      abody() {
        const data = [];
        for (let i = 0; i < this.body.length; i++) {
          const obj = {};
          obj.name = this.body[i].name;
          obj.route = this.body[i].route.name;
          obj.sort = this.body[i].sort;
          obj.id = this.body[i].id;
          data.push(obj);
        }
        return data;
      }
    },
    watch: {
      isModalActive() {
        this.$emit('update', this.isModalActive);
      },
      deleteEvent() {
        this.$emit('delete', this.deleteEvent);
      }
    },
    methods: {
      edit(obj) {
        this.isModalActive = true;
        this.item = obj;
      },
      remove(id) {
        const url = `${process.env.VUE_APP_API}stop-points/`;
        const body = new FormData();
        body.set('id', id);
        const config = {
          method: 'DELETE',
          url,
          data: body,
          headers: {
            'Authorization': `Bearer ${this.$store.state.token}`
          }
        };
        axios(config)
          .then(() => {
            this.deleteEvent++;
          });
      }
    }
  };
</script>

<style scoped>
  .btn-action {
    width: 25px;
    height: 25px;
    background-size: contain;
    background-repeat: repeat;
    background-position: center;
    border: none;
    cursor: pointer;
    outline: none;
    margin: 0 8px;
    padding: 0;
  }

  .edit {
    background-image: url(/edit.svg);
  }

  .remove {
    background-image: url(/delete.svg);
  }
</style>
