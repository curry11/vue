# 项目结构
  1. node_modules 项目安装的依赖包
  2. public 存放静态文件
  3. assets 存放静态文件
  4. components  存放组件一般是公共组件
  5. router 路由器
  6. store 状态管理器 主要用于组件之间的数据共享
  7. views 存放页面
  8. APP.vue 项目的入口页面 根组件
  9. main.js 项目的入口调用APP.vue
  10. package.json  npm包配置文件
  11. mock.js 引入mock数据


git config --global http.proxy "127.0.0.1:41092"

git config --global https.proxy "127.0.0.1:41092"


git config --global --unset http.proxy
 
git config --global --unset https.proxy
