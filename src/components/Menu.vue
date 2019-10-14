<template>
  <b-navbar
    type="is-info"
    class="navbar"
  >
    <template
      v-if="$store.state.token"
      slot="start"
    >
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
    </template>

    <template
      v-if="$store.state.token"
      slot="end"
    >
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
  .router-link-active {
    background-color: #0e71de;
    font-weight: 500;
  }

  @media screen and (max-width: 1023px) {
    .navbar-menu {
      background-color: #1c7df0;
    }
  }
</style>
