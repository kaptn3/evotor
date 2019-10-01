<template>
  <div>
    <div v-if="cost.length > 0">
      <div
        v-for="(item, index) in cost"
        :key="index"
      >
        {{ item }}
      </div>
    </div>
    <button
      v-else
      class="button is-info"
      @click="isModalActive = true"
    >
      Добавить стоимость
    </button>
    <b-modal
      :active.sync="isModalActive"
      :width="640"
      scroll="keep"
    >
      <add-cost
        :id="id"
        :route="routeId"
        :stop-to="stopTo"
      />
    </b-modal>
  </div>
</template>

<script>
  import AddCost from '../components/AddCost';

  export default {
    name: 'CellCost',
    components: { AddCost },
    props: {
      id: {
        type: Number,
        required: true
      },
      routeId: {
        type: Number,
        required: true
      },
      stopTo: {
        type: Number,
        required: true
      },
      cost: {
        type: Array,
        required: true
      }
    },
    data() {
      return {
        isModalActive: false
      };
    },
    watch: {
      isModalActive() {
        this.$emit('update', this.isModalActive);
      }
    }
  };
</script>
