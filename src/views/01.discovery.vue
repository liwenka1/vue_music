<template>
  <div class="discovery-container">
    <!-- 轮播图 -->
    <el-carousel class="" :interval="4000" type="card">
      <el-carousel-item v-for="(banner, index) in banners" :key="index">
        <img v-lazy="banner.imageUrl" alt="" />
      </el-carousel-item>
    </el-carousel>
    <!-- 推荐歌单 -->
    <div class="recommend">
      <h3 class="title">推荐歌单</h3>
      <div class="items">
        <div class="item" v-for="item in personalizedResult" :key="item.id">
          <div class="img-wrap">
            <div class="desc-wrap">
              <span class="desc">{{ item.copywriter }}</span>
            </div>
            <img v-lazy="item.picUrl" alt="" />
            <span
              class="iconfont icon-play"
              @click="toPlaylist(item.id)"
            ></span>
          </div>
          <p class="name">{{ item.name }}</p>
        </div>
      </div>
    </div>
    <!-- 最新音乐 -->
    <div class="news">
      <h3 class="title">最新音乐</h3>
      <div class="items">
        <div class="item" v-for="newsong in newsongResult" :key="newsong.id">
          <div class="img-wrap">
            <img v-lazy="newsong.picUrl" alt="" />
            <span
              class="iconfont icon-play"
              @click="playMusic(newsong.id)"
            ></span>
          </div>
          <div class="song-wrap">
            <div class="song-name">{{ newsong.name }}</div>
            <div class="singer">{{ newsong.song.artists[0].name }}</div>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐MV -->
    <div class="mvs">
      <h3 class="title">推荐MV</h3>
      <div class="items">
        <div class="item" v-for="mv in mvResult" :key="mv.id">
          <div class="img-wrap">
            <img v-lazy="mv.picUrl" alt="" />
            <span class="iconfont icon-play" @click="toMv(mv.id)"></span>
            <div class="num-wrap">
              <div class="iconfont icon-play"></div>
              <div class="num">{{ mv.playCount }}</div>
            </div>
          </div>
          <div class="info-wrap">
            <div class="name">{{ mv.name }}</div>
            <div class="singer">{{ mv.artistName }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'discovery',
  mounted () {
    this.$store.dispatch('getBanner')
    this.$store.dispatch('getPersonalized')
    this.$store.dispatch('getNewsong')
    this.$store.dispatch('getMv')
  },
  computed: {
    ...mapState({
      banners: state => state.descovery.banners,
      personalizedResult: state => state.descovery.personalizedResult,
      newsongResult: state => state.descovery.newsongResult,
      mvResult: state => state.descovery.mvResult
    }),
    ...mapGetters({
      url: 'url'
    })
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
    toPlaylist (id) {
      this.$router.push(`/playlist?id=${id}`);
    },
    toMv (id) {
      this.$router.push(`/mv?id=${id}`);
    }
  }
};
</script>

<style >
</style>
