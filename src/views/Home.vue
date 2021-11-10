<template>
  <el-container>
    <el-aside width="200px">
      <side-menu></side-menu>
    </el-aside>
    <el-container>
      <el-header>
        <strong>VueAdmin后台管理系统</strong>
        <div class="header-avatar">
          <el-avatar size="medium" :src="userInfo.avatar"></el-avatar>
          <el-dropdown>
            <span class="el-dropdown-link">
              {{ userInfo.username
              }}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/userCenter"> 个人中心 </router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout">退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-link href="https://markerhub.com" target="_blank">网站</el-link>
          <el-link href="https://space.bilibili.com/13491144" target="_blank"
            >B站</el-link
          >
        </div>
      </el-header>
      <el-main>
        <!-- 增加子路由 -->
        <tabs></tabs>
        <div style="margin: 0 15px">
          <router-view></router-view>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

// home 作为父路由 indx作为子路由
import SideMenu from "./inc/SideMenu.vue"
import Tabs from "./inc/Tabs.vue"

export default {
  name: "Home",
  components: {   //引用组件
    SideMenu,
    Tabs
  },
  data() {
    return {
      userInfo: {
        id: "",
        username: "",
        avatar: ""
      }
    }
  },
  created() {
    this.getUserInfo();
  },

  methods: {
    getUserInfo() {
      this.$axios.get("/sys/userInfo").then(res => {
        this.userInfo = res.data.data;
      })
    },

    logout() {
      this.$axios.post("/logout").then(res => {
        localStorage.clear()  //清除缓存
        sessionStorage.clear()
        this.$store.commit("resetState")   //清除store中的状态数据如token  调用store中的resetState方法
        this.$router.push("/login")
      })
    }
  }
}
</script>


<style >
.el-container {
  padding: 0;
  margin: 0;
  height: 100%;
}

.header-avatar {
  float: right;
  width: 210px;
  display: flex; /*交叉轴 */
  justify-content: space-around;
  align-items: center;
}

.el-header {
  background-color: #17b3a3;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  line-height: 200px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  /* text-align: center; */
  /* line-height: 160px; */
  padding: 0;
}

a {
  text-decoration: none; /*a标签下划线去掉 */
}
</style>