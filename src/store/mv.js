import { reqArtists, reqCommentMv, reqMvDetail, reqMvUrl, reqSimiMv } from "@/api"

const state = {
  mvUrlData: {},
  simiMvs: [],
  mvDetail: {},
  mvArtist: {},
  mvComment: {}
}
const mutations = {
  GETMVURL (state, data) {
    state.mvUrlData = data
  },
  GETSIMIMV (state, data) {
    state.simiMvs = data
  },
  GETMVDETAIL (state, data) {
    state.mvDetail = data
  },
  GETARTISTS (state, data) {
    state.mvArtist = data
  },
  GETCOMMENTMV (state, data) {
    state.mvComment = data
  }
}
const actions = {
  //MV地址
  async getMvUrl ({ commit }, id) {
    let result = await reqMvUrl(id)
    if (result.code === 200) {
      commit('GETMVURL', result.data)
    }
  },
  //相关MV
  async getSimiMv ({ commit }, mvid) {
    let result = await reqSimiMv(mvid)
    if (result.code === 200) {
      commit('GETSIMIMV', result.mvs)
    }
  },
  //MV信息
  async getMvDetail ({ commit }, mvid) {
    let result = await reqMvDetail(mvid)
    if (result.code === 200) {
      commit('GETMVDETAIL', result.data)
    }
  },
  //歌手信息
  async getArtists ({ commit }, id) {
    let result = await reqArtists(id)
    if (result.code === 200) {
      commit('GETARTISTS', result.artist)
    }
  },
  //mv 评论
  async getCommentMv ({ commit }, data) {
    let result = await reqCommentMv(data)
    if (result.code === 200) {
      commit('GETCOMMENTMV', result)
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