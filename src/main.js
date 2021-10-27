import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'   //引入elemetnUI
import "element-ui/lib/theme-chalk/index.css"
import axios from 'axios'

Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$axios = axios //表示可以用$axios 使用axios库
require("./mock.js") //引入mock数据，关闭则注释该行

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
