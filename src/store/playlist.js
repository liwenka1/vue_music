import { reqCommentPlaylist, reqPlaylistDetail } from "@/api"

const state = {
  playlistDetail: {},
  commentsData: {}
}
const mutations = {
  GETPLAYLISTDETAIL (state, data) {
    state.playlistDetail = data
  },
  GETCOMMENTPLAYLIST (state, data) {
    state.commentsData = data
  }
}
const actions = {
  //歌单信息
  async getPlaylistDetail ({ commit }, id) {
    let result = await reqPlaylistDetail(id)
    if (result.code = 200) {
      commit('GETPLAYLISTDETAIL', result)
    }
  },
  //歌单评论
  async getCommentPlaylist ({ commit }, data) {
    let result = await reqCommentPlaylist(data)
    if (result.code = 200) {
      commit('GETCOMMENTPLAYLIST', result)
    }
  }
}
const getters = {
  playlist: state => state.playlistDetail.playlist,
  hotComments: state => state.commentsData.hotComments,
  commentsData: state => state.commentsData
}
export default {
  state,
  mutations,
  actions,
  getters
}