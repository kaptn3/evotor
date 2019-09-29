import Vue from 'vue';
import Router from 'vue-router';
import Login from './views/Login.vue';
import Routes from './views/Routes.vue';

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
      component: Routes/*,
      beforeEnter(to, from, next) {
        if (localStorage.getItem('user-token')) {
          next();
        } else {
          next('/');
        }
      }*/
    },
    {
      path: '*',
      redirect: '/login'
    }
  ],
});
