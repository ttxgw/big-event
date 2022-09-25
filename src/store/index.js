import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { getUserInfoAPI } from '@/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 1.登录成功之后，得到token
    token: '',
    userInfo: {} // 保存用户信息
  },
  getters: {
    nickname: state => state.userInfo.nickname,
    username: state => state.userInfo.username,
    user_pic: state => state.userInfo.user_pic
  },
  mutations: {
    // 2.更新token的mutation函数
    updateToken(state, newToken) {
      state.token = newToken
    },
    // 更新用户信息
    updateUserInfo(state, info) {
      state.userInfo = info
    }
  },
  actions: {
    // 定义和初始化用户的基本信息action函数
    async initUserInfo(store) {
      const { data: res } = await getUserInfoAPI()
      if (res.code === 0) {
        store.commit('updateUserInfo', res.data)
      }
    }
  },
  modules: {
  },

  // 配置vuex插件
  plugins: [
    createPersistedState()
  ]
})
