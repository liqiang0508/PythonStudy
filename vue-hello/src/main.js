import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
const { mockXHR } = require('../mock')
if (process.env.NODE_ENV == 'development') {
  mockXHR()
}


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
