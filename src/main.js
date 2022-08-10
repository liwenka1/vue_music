import Vue from 'vue'
import App from './App.vue'
import VueLazyload from 'vue-lazyload'
// 导入 Element_ui
import ElementUI from 'element-ui'
// 导入 Element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 插件 Element-ui
Vue.use(ElementUI)
Vue.use(VueLazyload)

// 导入全局初始化样式
import './assets/index.css'
//引入仓库
import store from './store/index'
//引入路由
import router from './router/index'

// $bus 事件总线的导入
Vue.prototype.$bus = new Vue()

// 图片懒加载
Vue.use(VueLazyload, {
  loading: './assets/cover.jpg'
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  // 挂载到Vue示例上
  router,
  store
}).$mount('#app')
