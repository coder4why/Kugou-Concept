import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import store from 'store/index.js';
Vue.config.productionTip = false
Vue.prototype.domain = "http://192.168.24.105:8080/"
App.mpType = 'app'
const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif 
   