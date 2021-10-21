<template>
  <div class="home">
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="6">
        <h2>欢迎来到VueAdmin管理系统</h2>
      </el-col>
      <el-col :span="6"
        ><div class="grid-content bg-purple-light"></div
      ></el-col>
      <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login"
}
</script>

<style scoped>
</style>