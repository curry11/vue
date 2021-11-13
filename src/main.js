import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'   //引入elemetnUI
import "element-ui/lib/theme-chalk/index.css"
// import axios from 'axios'  没有前置后置拦截
import global from './globalFun'  //引入全局按钮

import qs from 'qs'
//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象 
Vue.prototype.$qs = qs


import axios from './axios'  //创建的实例 有前置后置拦截
Vue.use(Element)
Vue.config.productionTip = false
Vue.prototype.$axios = axios //表示可以用$axios 使用axios库
require("./mock.js") //引入mock数据，关闭则注释该行

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
