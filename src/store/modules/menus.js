import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default {
	state: {
		// 菜单栏数据      
		menuList: [],
		// 权限数据      
		permList: [],
		hasRoute: false,

		editableTabsValue: 'Index',  //管理tabs
		editableTabs: [{
			title: '首页',
			name: 'Index',
		}],
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
		},

		//退出登录清空各种tabs等
		resetState: (state) => {
			state.menuList = []
			state.permList = []

			state.hasRoutes = false
			state.editableTabsValue = 'Index'
			state.editableTabs = [{
				title: '首页',
				name: 'Index',
			}]
		},

		addTab(state, tab) {  //全局管理tabs

			//判定tabs中是否有重复的元素
			let indx = state.editableTabs.findIndex(e => e.name === tab.name)

			if (indx === -1) {  //如果没有再新增tab
				state.editableTabs.push({
					title: tab.title,
					name: tab.name,
				});
			}

			state.editableTabsValue = tab.name;
		},
	}
}