import { reqSong } from "@/api"

const state = {
  data: []
}
const mutations = {
  GETSONG (state, data) {
    state.data = data
  }
}
const actions = {
  //最新音乐
  async getSong ({ commit }, type) {
    let result = await reqSong(type)
    if (result.code === 200) {
      commit('GETSONG', result.data)
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