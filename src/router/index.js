import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import User from '../views/sys/User.vue'
import Menu from '../views/sys/Menu.vue'
import Role from '../views/sys/Role.vue'
import axios from "axios";
import store from "../store"

Vue.use(VueRouter)

const routes = [
  { //预先加载
    path: '/login',
    name: 'Login',
    component: Login
  },
  {  //懒加载模式
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/index',
        name: 'Index',
        component: () => import('../views/Index.vue')
      },
      {
        path: '/sys/users',
        name: 'User',
        component: User
      },
      {
        path: '/sys/role',
        name: 'Role',
        component: Role
      },
      {
        path: '/sys/menus',
        name: 'Menu',
        component: Menu
      },
      {
        path: '/userCenter',
        name: 'UserCenter',
        component: () => import('../views/UserCenter')
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由之前的判断
router.beforeEach((to, from, next) => {  //动态路由to 跳转到哪一个路由，from从哪一个路由来，next 继续往下走 

  axios.get("/sys/menu/nav", {   //获取菜单导航的信息添加请求头 因为有登录校验 
    headers: {
      Authorization: localStorage.getItem("token")  //获取Authorization信息 封装到请求头中
    }
  }).then(res => {
    //拿到menuList
    store.commit("setMentList", res.data.data.nav)  //跟菜单栏SideMenu进行数据共享
    //拿到用户的权限   主要是操作的权限
    store.commit("setPermList", res.data.data.authoritys)
  })
  next()
})

export default router
