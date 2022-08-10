<template>
  <div class="songs-container">
    <div class="tab-bar">
      <span class="item" :class="{ active: type == 0 }" @click="type = 0"
        >全部</span
      >
      <span class="item" :class="{ active: type == 7 }" @click="type = 7"
        >华语</span
      >
      <span class="item" :class="{ active: type == 96 }" @click="type = 96"
        >欧美</span
      >
      <span class="item" :class="{ active: type == 8 }" @click="type = 8"
        >日本</span
      >
      <span class="item" :class="{ active: type == 16 }" @click="type = 16"
        >韩国</span
      >
    </div>
    <!-- 底部的table -->
    <table class="el-table playlit-table">
      <thead>
        <th></th>
        <th></th>
        <th>音乐标题</th>
        <th>歌手</th>
        <th>专辑</th>
        <th>时长</th>
      </thead>
      <tbody>
        <tr
          class="el-table__row"
          v-for="(song, index) in songsData"
          :key="song.id"
        >
          <td>{{ index + 1 }}</td>
          <td>
            <div class="img-wrap">
              <img v-lazy="song.album.picUrl" alt="" />
              <span
                class="iconfont icon-play"
                @click="playMusic(song.id)"
              ></span>
            </div>
          </td>
          <td>
            <div class="song-wrap">
              <div class="name-wrap">
                <span>{{ song.name }}</span>
                <span class="iconfont icon-mv"></span>
              </div>
              <span>{{ song.album.company }}</span>
            </div>
          </td>
          <td>{{ song.artists[0].name }}</td>
          <td>{{ song.album.name }}</td>
          <td>{{ song.duration }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'songs',
  data () {
    return {
      type: 0
    };
  },
  watch: {
    type () {
      // console.log(this.type);
      this.getSong()
    }
  },
  mounted () {
    this.getSong()
  },
  methods: {
    playMusic (id) {
      // console.log(id);
      this.$store.dispatch('getSongUrl', {
        params: {
          id: id
        }
      }).then(() => {
        this.$parent.url = this.url
      })
    },
    getSong () {
      this.$store.dispatch('getSong', { params: { type: this.type } })
    }
  },
  computed: {
    ...mapState({
      songsData: state => state.songs.data
    }),
    ...mapGetters({
      url: 'url'
    })
  }
};
</script>

<style >
</style>
