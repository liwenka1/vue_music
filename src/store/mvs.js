import { reqAllMv } from "@/api"

const state = {
  mvData: []
}
const mutations = {
  GETALLMV (state, data) {
    state.mvData = data
  }
}
const actions = {
  //全部mv
  async getAllMv ({ commit }, data) {
    let result = await reqAllMv(data)
    if (result.code === 200) {
      commit('GETALLMV', result)
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