import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  //状态管理
    token: ''
  },
  mutations: {  //操作token
    SET_TOKEN: (state, token) => {  //将穿过来的token  存入到state中的token
      state.token = token
      localStorage.setItem("token", token)
    },
  },
  actions: {
  },
  modules: {
  }
})
