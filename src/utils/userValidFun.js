export default {
  usernameValid(rule, value, callback) {
    if (value.length < 3 || value.length > 10) {
      callback(new Error('用户名必须3~9位'))
    }
    callback()
  },
  passwordValid(rule, value, callback) {
    if (value.length < 3 || value.length > 10) {
      callback(new Error('密码必须3~9位'))
    }
    callback()
  },
  phoneValid(rule, value, callback) {
    if (!/^1[3456789]\d{9}$/.test(value)) {
      callback(new Error('电话格式错误'))
    }
    callback()
  },
  emailValid(rule, value, callback) {
    if (!/^\w+@\w+\.\w+$/.test(value)) {
      callback(new Error('邮箱格式错误'))
    }
    callback()
  }
}