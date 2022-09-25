const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  // publicPath: './'
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    // name:this.name
    // externals: {
    //   // 基本格式：
    //   // '包名' : '在项目中引入的名字'
    //   echarts: 'echarts',
    //   vue: 'Vue',
    //   'vue-router': 'VueRouter',
    //   vuex: 'Vuex',
    //   axios: 'axios',
    //   dayjs: 'dayjs',
    //   'element-ui': 'ELEMENT',
    //   'vue-quill-editor': 'VueQuillEditor',
    //   'vuex-persistedstate': 'createPersistedState'
    // }
    // resolve: {
    //   alias: {
    //     '@': resolve('src')
    //   }
    // }
  }
})
