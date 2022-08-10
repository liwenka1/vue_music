import { reqBanner, reqMv, reqNewsong, reqPersonalized } from "@/api"
const state = {
  banners: [],
  personalizedResult: {},
  newsongResult: [],
  mvResult: []
}
const mutations = {
  GETBANNER (state, banners) {
    state.banners = banners
  },
  GETPERSONALIZED (state, result) {
    state.personalizedResult = result
  },
  GETNEWSONG (state, result) {
    state.newsongResult = result
  },
  GETMV (state, result) {
    state.mvResult = result
  }
}
const actions = {
  //轮播图
  async getBanner ({ commit }) {
    let result = await reqBanner()
    if (result.code === 200) {
      commit('GETBANNER', result.banners)
    }
  },
  //推荐歌单
  async getPersonalized ({ commit }) {
    let result = await reqPersonalized()
    if (result.code === 200) {
      commit('GETPERSONALIZED', result.result)
    }
  },
  //最新音乐
  async getNewsong ({ commit }) {
    let result = await reqNewsong()
    if (result.code === 200) {
      commit('GETNEWSONG', result.result)
    }
  },
  //推荐MV
  async getMv ({ commit }) {
    let result = await reqMv()
    if (result.code === 200) {
      commit('GETMV', result.result)
    }
  }
}
const getters = {}
export default {
  state,
  mutations,
  actions,
  getters
}