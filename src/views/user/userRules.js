import userValidFun from '@/utils/userValidFun'

export default {
  username: [
    {
      trigger: 'blur',
      validator: userValidFun.usernameValid
    }
  ],
  password: [
    {
      trigger: 'blur',
      validator: userValidFun.passwordValid
    }
  ],
  phone: [
    {
      trigger: 'blur',
      validator: userValidFun.phoneValid
    }
  ],
  email: [
    {
      trigger: 'blur',
      validator: userValidFun.emailValid
    }
  ],
  introduction: [
    {
      required: true,
      trigger: 'blur',
      message: '描述不能为空'
    }
  ]
}