<template>
  <div class="card">
    <header class="card-header">
      <p class="card-header-title">
        {{ stop.name }}
      </p>
    </header>
    <div
      v-if="costs[stop.id]"
      class="card__content"
    >
      <div
        v-for="(cost, costIndex) in costs[stop.id]"
        :key="costIndex"
        class="card__cost"
      >
        {{ cost.stop_point_to_name }}
        (ПЛН={{ cost.price }}, ЛГТ={{ cost.privilege_price }}, БАГ={{ cost.bag_price }})
      </div>
    </div>
    <footer class="card-footer">
      <button
        class="button is-info card-footer__btn"
        @click="isModalActive = true"
      >
        Добавить остановку
      </button>
      <b-modal
        :active.sync="isModalActive"
        :width="640"
        scroll="keep"
      >
        <add-cost
          :id="stop.id"
          :stops="stops"
          :route="route"
        />
      </b-modal>
    </footer>
  </div>
</template>

<script>
  import AddCost from './AddCost';

  export default {
    name: 'Card',
    components: { AddCost },
    props: {
      stop: {
        type: Object,
        required: true
      },
      costs: {
        type: [Array, Object],
        default() { return []; }
      },
      stops: {
        type: Array,
        required: true
      },
      route: {
        type: Number,
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

<style scoped>
  .card-footer__btn {
    margin: 10px auto;
  }

  .card__content:not(:last-child) {
    border-bottom: 1px solid #dbdbdb;
    padding: 0.75rem;
  }
</style>
