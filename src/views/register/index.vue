<template>
  <div class="reg-container">
    <div class="reg-box">
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
        <el-form-item prop="repassword">
          <el-input
            type="password"
            placeholder="请再次确认密码"
            v-model="form.repassword"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button class="btn-reg" type="primary" @click="registerFn"
            >注册</el-button
          >
          <el-link type="info" @click="$router.push('/login')">去登录</el-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { registerAPI } from '@/api'
export default {
  name: 'my-register',
  data() {
    const samePwdFn = (rule, value, callback) => {
      if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致'))
      } else {
        callback()
      }
    }
    return {
      form: {
        username: '',
        password: '',
        repassword: ''
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
        ],
        repassword: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
          {
            pattern: /^[a-zA-Z0-9]\w{5,17}$/,
            message: '长度在 6 到 18 个字符',
            trigger: 'blur'
          },
          {
            validator: samePwdFn,
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    // 注册点击事件
    registerFn() {
      // js兜底校验
      this.$refs.form.validate(async (valid) => {
        if (valid) {
          // 校验通过
          // 1.调用注册接口
          const { data: res } = await registerAPI(this.form)
          // 2.注册失败，提示用户
          if (res.code !== 0) return this.$message.error(res.message)
          // 3.注册成功，提示用户
          this.$message.success(res.message)

          // 4.跳转到登陆页面
          this.$router.push('/login')
        } else {
          return false // 阻止默认提交行为（表单下面红色提示区域会自动出现）
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.reg-container {
  height: 100%;
  background: url('../../assets/images/login_bg.jpg') center;
  background-size: cover;

  .reg-box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 335px;
    padding: 0 30px;
    background-color: #fff;
    border-radius: 3px;
    box-sizing: border-box;

    .title-box {
      height: 60px;
      background: url('../../assets/images/login_title.png') center no-repeat;
    }
    .btn-reg {
      width: 100%;
    }
  }
}
</style>
