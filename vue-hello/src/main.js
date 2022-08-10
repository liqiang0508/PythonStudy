import Vue from 'vue'
import App from './App.vue'

const { mockXHR } = require('../mock')
if (process.env.NODE_ENV == 'development') {
  mockXHR()
}


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
