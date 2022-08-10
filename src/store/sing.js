import { reqSongDetail, reqSongUrl } from "@/api"

const state = {
  songUrl: [],
  SongDetail: []
}
const mutations = {
  GETSONGURL (state, data) {
    state.songUrl = data
  },
  GETSONGDETAIL (state, data) {
    state.SongDetail = data
  }
}
const actions = {
  //播放歌曲
  async getSongUrl ({ commit }, id) {
    let result = await reqSongUrl(id)
    if (result.code === 200) {
      commit('GETSONGURL', result.data)
    }
  },
  //歌曲详情
  async getSongDetail ({ commit }, id) {
    let result = await reqSongDetail(id)
    console.log(result);
    if (result.code === 200) {
      commit('GETSONGDETAIL', result.songs)
    }
  }
}
const getters = {
  url: state => state.songUrl[0]
}
export default {
  state,
  mutations,
  actions,
  getters
}