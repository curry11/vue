const Mock = require('mockjs') //定义Mock对象

const Random = Mock.Random  //获取Random

//定义返回结果格式
let Result = {
  code: 200,
  msg: '操作成功',
  data: null
}

Mock.mock('/captcha', 'get', () => {

  Result.data = {
    token: Random.string(32),
    captchaImg: Random.dataImage('120x40', 'p7n5w')
  }
  return Result
})


Mock.mock('/login', 'post', () => {

  // 无法在header中传入数jwt

  // Result.code = 400
  // Result.msg = "验证码错误"

  return Result
})