<template>
  <b-navbar
    type="is-info"
    class="navbar"
  >
    <template
      v-if="$store.state.token"
      slot="start"
    >
      <b-navbar-dropdown label="Справочники">
        <b-navbar-item
          tag="router-link"
          to="/routes"
        >
          Номера маршрутов
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          to="/stops"
        >
          Остановки
        </b-navbar-item>
        <!--
        <b-navbar-item
          tag="router-link"
          to="/costs"
        >
          Стоимости проезда
        </b-navbar-item>
        -->
        <b-navbar-item
          tag="router-link"
          to="/tariff-scale"
        >
          Тарифная сетка
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          to="/cars"
        >
          Машины
        </b-navbar-item>
        <b-navbar-item
          tag="router-link"
          to="/drivers"
        >
          Водители
        </b-navbar-item>
      </b-navbar-dropdown>
      <b-navbar-item
        tag="router-link"
        to="/fix-pay"
      >
        Статистика фикс. оплаты
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        to="/stats-tariff"
      >
        Статистика по тарифной сетке
      </b-navbar-item>
    </template>

    <template
      v-if="$store.state.token"
      slot="end"
    >
      <b-navbar-item
        tag="router-link"
        to="/help"
      >
        Помощь
      </b-navbar-item>
      <b-navbar-item
        tag="router-link"
        to="/contacts"
      >
        Контакты
      </b-navbar-item>
      <b-navbar-item tag="div">
        <div class="buttons">
          <button
            class="button is-light"
            @click="logout"
          >
            Выйти
          </button>
        </div>
      </b-navbar-item>
    </template>
  </b-navbar>
</template>

<script>
  export default {
    name: 'Menu',
    methods: {
      logout() {
        this.$store.commit('logout');
        this.$router.push('/');
      }
    }
  };
</script>


<style>
  .router-link-active.navbar-item {
    background-color: #0e71de;
    font-weight: 500;
    color: #fff;
  }

  @media screen and (max-width: 1023px) {
    .navbar-menu {
      background-color: #1c7df0;
    }
  }
</style>
