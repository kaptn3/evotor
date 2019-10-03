<template>
  <div class="cell">
    <div
      v-if="cost.stops.length > 0"
      class="cell__inner"
      @click="isModalActive = true"
    >
      <div
        v-for="(item, index) in cost.stops"
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
      +
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
        :cost="cost"
        :put="cost.stops.length > 0"
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
        type: Object,
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

<style lang="scss" scoped>
  .button {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 15px;
  }

  .cell {
    border: 1px solid #aaa;
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    cursor: pointer;

    &__inner {
      padding: 15px;

      &:hover,
      &:focus {
        background-color: #eee;
      }
    }
  }
</style>
