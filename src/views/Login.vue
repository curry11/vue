<template>
  <el-row type="flex" class="row-bg" justify="center">
    <el-col :xl="6" :lg="7">
      <h2>欢迎来到VueAdmin管理系统</h2>
      <el-image
        :src="require('@/assets/MarkerHub.jpg')"
        style="height: 180px; width: 180px"
      ></el-image>

      <p>公众号 MarkerHub</p>
      <p>扫码二维码，回复【 VueAdmin 】获取登录密码</p>
    </el-col>

    <el-col :span="1">
      <el-divider direction="vertical"></el-divider>
    </el-col>
    <el-col :xl="6" :lg="7">
      <!--xl lg 响应式布局 ：model表示绑定的对象 ref给form表单注册成一个实例 可以通过改实例给form表达进行校验-->
      <el-form
        :model="loginForm"
        :rules="rules"
        ref="loginForm"
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username" style="width: 380px">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" style="width: 380px">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" style="width: 380px">
          <el-input
            v-model="loginForm.code"
            style="width: 172px; float: left"
            maxlength="5"
          ></el-input>
          <el-image
            :src="captchaImg"
            class="captchaImg"
            @click="getCaptcha"
          ></el-image>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >立即创建</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>

import qs from 'qs'

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '111111',
        code: '11111',
        token: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
          { min: 5, max: 5, message: '长度为 5 个字符', trigger: 'blur' }
        ],
      },
      captchaImg: null
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {   //通过ref将表单注册成一个实例，然后进行校验
        if (valid) {
          this.$axios.post('/login?' + qs.stringify(this.loginForm)).then(res => {  //通过axios发送请求

            console.log(res)

            const jwt = res.headers['authorization'] //jwt中的名称 存到store保存状态 别的页面可以通过状态去访问

            this.$store.commit('SET_TOKEN', jwt)  //将jwt提交到stort中
            this.$router.push("/index")
          })

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCaptcha() {
      this.$axios.get('/captcha').then(res => {

        console.log("/captcha")
        console.log(res)

        this.loginForm.token = res.data.data.token
        this.captchaImg = res.data.data.captchaImg
        this.loginForm.code = ''
      })
    }
  },
  created() {
    this.getCaptcha()
  }
}
</script>

<style scoped>
.el-row {
  background-color: #fafafa;
  height: 100%;
  display: flex;
  align-items: center;
  text-align: center;
  justify-content: center;
}

.el-divider {
  height: 200px;
}

.captchaImg {
  float: left;
  margin-left: 8px;
  border-radius: 4px;
}
</style>