import Vue from "vue"

//控制按钮权限
Vue.mixin({
	methods: {
		hasAuth(perm) {
			var authority = this.$store.state.menus.permList

			return authority.indexOf(perm) > -1
		}
	}
})