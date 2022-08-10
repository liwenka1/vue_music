import { reqHighquality, reqPlaylist } from "@/api"

const state = {
  playlists: [],
  playlistInfo: {}
}
const mutations = {
  GETHEIGHQULITY (state, playlists) {
    state.playlists = playlists
  },
  GETPLAYLIST (state, result) {
    state.playlistInfo = result
  }
}
const actions = {
  //歌单列表 - 精品歌单
  async getHighquality ({ commit }) {
    let result = await reqHighquality()
    if (result.code === 200) {
      commit('GETHEIGHQULITY', result.playlists)
    }
  },
  //歌单列表 - 歌单列表
  async getPlaylist ({ commit }, data) {
    let result = await reqPlaylist(data)
    if (result.code === 200) {
      commit('GETPLAYLIST', result)
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