import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default {
	state: {
		// 菜单栏数据      
		menuList: [],
		// 权限数据      
		permList: [],
		hasRoute: false
	},
	mutations: {
		changeRouteStatus(state, hasRoute) {
			state.hasRoute = hasRoute
			sessionStorage.setItem("hasRoute", hasRoute)
		},
		setMenuList(state, menus) {
			state.menuList = menus
		},
		setPermList(state, authoritys) {
			state.permList = authoritys
		}
	}
}