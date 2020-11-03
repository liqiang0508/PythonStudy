import Vue from 'vue'
import App from './App'
import HttpHelper  from "common/HttpHelper.js"
import VueI18n from 'lang/vue-i18n.js' 

Vue.use(VueI18n)  

Vue.config.productionTip = false

Vue.prototype.$HttpHelper = HttpHelper

Vue.prototype.SayHello = function(){
	console.log("SayHello==");
}
const i18n = new VueI18n({  
  locale: 'zh-CN',  
  messages: {  
    'en-US': require("./lang/EN.js").lang,  
    'zh-CN': require("./lang/ZH.js").lang
  }  
})  

Vue.prototype._i18n = i18n  
App.mpType = 'app'

const app = new Vue({
	i18n,  
    ...App
})
app.$mount()
