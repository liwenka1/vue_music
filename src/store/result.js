import { reqSearch } from "@/api";

const state = {
  searchData: {}
}
const mutations = {
  GETSEARCH (state, result) {
    state.searchData = result
  }
}
const actions = {
  async getSearch ({ commit }, data) {
    let result = await reqSearch(data)
    if (result.code === 200) {
      commit('GETSEARCH', result.result)
    }
  }
}
const getters = {
  songs: state => state.searchData.songs
}
export default {
  state,
  mutations,
  actions,
  getters
}