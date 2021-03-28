import Vue from 'vue'
import Employee from './Employee.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import "ag-grid-community/dist/styles/ag-grid.css"
import "ag-grid-community/dist/styles/ag-theme-alpine.css"


import Toaster from 'v-toaster'
import 'v-toaster/dist/v-toaster.css';
Vue.use(Toaster, {timeout: 2000})

global.jQuery = require('jquery');
var $ = global.jQuery;
window.$ = $;

window.axios = require('axios')
axios.defaults.baseURL = process.env.VUE_APP_BACKEND_API_ROOT_URL
axios.defaults.headers.common = {
  'X-Requested-With': 'XMLHttpRequest'
};

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(Employee)
}).$mount('#employee')
