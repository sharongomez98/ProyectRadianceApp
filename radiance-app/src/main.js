import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from "./store";
import vuetify from './plugins/vuetify'
import axiosSetUp from './axios';

Vue.config.productionTip = false

axiosSetUp();

new Vue({
  vuetify,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
