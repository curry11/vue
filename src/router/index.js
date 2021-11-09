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
      // {
      //   path: '/sys/users',
      //   name: 'User',
      //   component: User
      // },
      // {
      //   path: '/sys/role',
      //   name: 'Role',
      //   component: Role
      // },
      // {
      //   path: '/sys/menus',
      //   name: 'Menu',
      //   component: Menu
      // },
      {
        path: '/userCenter',
        name: 'UserCenter',
        component: () => import('../views/UserCenter')
      },
    ]
  },
  { //预先加载
    path: '/login',
    name: 'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//路由之前的判断
router.beforeEach((to, from, next) => {  //动态路由to 跳转到哪一个路由，from从哪一个路由来，next 继续往下走 

  //因为每次访问都会请求进行菜单渲染所以需要处理
  let hasRoute = store.state.menus.hasRout

  if (!hasRoute) {
    // 因为我们使用的是axios 而没有使用定义的$axios所以进入不到axios.js中所以要自己配置Authorization
    axios.get("/sys/menu/nav", {   //获取菜单导航的信息添加请求头 因为有登录校验 
      headers: {
        Authorization: localStorage.getItem("token")  //获取Authorization信息 封装到请求头中
      }
    }).then(res => {
      //拿到menuList  动态绑定菜单
      store.commit("setMenuList", res.data.data.nav)  //跟菜单栏SideMenu进行数据共享
      //拿到用户的权限   主要是操作的权限
      store.commit("setPermList", res.data.data.authoritys)
      //动态绑定路由
      let newRoutes = router.options.routes //获取现有路由
      console.log(newRoutes)
      //遍历定义的路由
      res.data.data.nav.forEach(menu => {
        if (menu.children) {
          menu.children.forEach(e => {
            //转成路由
            let route = menuToRoute(e)

            // console.log(route);
            //把路由添加到路由管理器中  添加到home下
            if (route) {
              newRoutes[0].children.push(route)
            }
          })
        }
      })
      router.addRoutes(newRoutes)  //最后进行路由绑定
      hasRoute = true
      store.commit("changeRouteStatus", hasRoute)   //控制每次访问都会请求进行菜单渲染
    })
  }
  next()
})

//把menu装换成route
const menuToRoute = (menu) => {
  if (!menu.component) {
    return null
  }

  let route = {
    name: menu.name,
    path: menu.path,
    // component: import('@/views/' + menu.component + '.vue'),   //给route赋值component
    meta: {
      icon: menu.icon,
      title: menu.title
    }  //可以进行额外值的赋值
  }

  route.component = () => import('@/views/' + menu.component + '.vue')   //给route赋值component


  return route
}

export default router
