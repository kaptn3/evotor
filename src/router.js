import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Routes from './views/Routes.vue';
import Costs from './views/Costs.vue';
import Stops from './views/Stops.vue';
import TariffScale from './views/TariffScale.vue';
import FixPay from './views/FixPay';
import StatsTariff from './views/StatsTariff';
import Help from './views/Help';
import Contacts from './views/Contacts';
import Cars from './views/Cars';
import Drivers from './views/Drivers';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next('/routes');
        } else {
          next();
        }
      }
    },
    {
      path: '/routes',
      name: 'routes',
      component: Routes,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/stops',
      name: 'stops',
      component: Stops,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/tariff-scale',
      name: 'TariffScale',
      component: TariffScale,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/costs',
      name: 'costs',
      component: Costs,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/fix-pay',
      name: 'FixPay',
      component: FixPay,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/stats-tariff',
      name: 'StatsTariff',
      component: StatsTariff,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/cars',
      name: 'Cars',
      component: Cars,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/drivers',
      name: 'Drivers',
      component: Drivers,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next();
        } else {
          next('/');
        }
      }
    },
    {
      path: '/help',
      name: 'Help',
      component: Help,
    },
    {
      path: '/contacts',
      name: 'Contacts',
      component: Contacts,
    },
    {
      path: '*',
      redirect: '/login'
    }
  ],
});
