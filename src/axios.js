import axios from "axios";
import router from "./router"
import Element from "element-ui"

// axios 前置拦截后置拦截
axios.defaults.baseURL = "http://localhost:8082"  //定义全局的baseUrl 访问后端

const request = axios.create({    //定义全局request 可以统一封装head、超时时间等
  timeout: 5000,
  headers: {
    timeout: 5000,
    headers: {
      'Content-Type': "application/json; charset=utf-8"   //返回数据类型
    }
  }
})


request.interceptors.request.use(config => {   //进行拦截request
  config.headers['Authorization'] = localStorage.getItem("token")   //给请求头加上jwt
  return config
})



request.interceptors.response.use(response => {

  console.log("response ->" + response)

  let res = response.data

  if (res.code === 200) {
    return response
  } else {
    Element.Message.error(!res.msg ? '系统异常' : res.msg)
    return Promise.reject(response.data.msg)
  }
},
  error => {

    console.log(error)

    if (error.response.data) {
      error.massage = error.response.data.msg
    }

    if (error.response.status === 401) {
      router.push("/login")
    }

    Element.Message.error(error.massage, { duration: 3000 })
    return Promise.reject(error)
  }
)

export default request