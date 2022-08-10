import Vue from "vue";
import Vuex from "vuex";
//使用插件
Vue.use(Vuex)
import descovery from './discovery'
import recommend from './recommend'
import songs from './songs'
import mvs from './mvs'
import mv from './mv'
import result from './result'
import palylist from './playlist'
import sing from './sing'

// 对外暴露Store类的一个实例
export default new Vuex.Store({
  //实现Vuex仓库模块式开发存储数据
  modules: {
    descovery,
    recommend,
    songs,
    mvs,
    mv,
    result,
    palylist,
    sing
  }
})