import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import App from './App.vue';
import data from './plugins';

Vue.use(Vuelidate);
Vue.use(VueRouter);

const app = new Vue({
  el: '#app',
  router: data.router,
  store: data.store,
  render: h => h(App),
});
