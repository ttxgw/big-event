<template>
  <div class="login-container">
    <div class="login-box">
      <!-- 标题盒子 -->
      <div class="title-box"></div>
      <!-- 注册表单区域 -->
      <el-form ref="form" :rules="rules" :model="form">
        <el-form-item prop="username">
          <el-input
            placeholder="请输入用户名"
            v-model="form.username"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            placeholder="请输入密码"
            v-model="form.password"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button class="btn-login" type="primary" @click="loginFn"
            >登录</el-button
          >
          <el-link type="info" @click="$router.push('/reg')">去注册</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { loginAPI } from '@/api'
import { mapMutations } from 'vuex'
export default {
  name: 'my-login',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
      // 表单验证
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]{4,15}$/,
            message: '长度在 5 到 16 个字符',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]\w{5,17}$/,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // ...其他
    ...mapMutations(['updateToken']),
    // 登录点击事件
    loginFn() {
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 1.通过校验
          const { data: res } = await loginAPI(this.form)
          // 2.校验失败
          if (res.code !== 0) return this.$message.error(res.message)
          this.$message.success(res.message)
          this.updateToken(res.token)
          // 跳转到布局页
          this.$router.push('/')
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  height: 100%;
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;

  .login-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 270px;
    padding: 0 30px;
    background-color: #fff;
    border-radius: 3px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }
    .btn-login {
      width: 100%;
    }
  }
}
</style>
