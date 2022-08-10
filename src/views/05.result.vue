<template>
  <div class="result-container">
    <div class="title-wrap">
      <h2 class="title">{{ $route.query.q }}</h2>
      <span class="sub-title" v-show="activeIndex === 'songs'"
        >找到{{ searchData.songCount }}个结果</span
      >
      <span class="sub-title" v-show="activeIndex === 'lists'"
        >找到{{ searchData.playlistCount }}个结果</span
      >
      <span class="sub-title" v-show="activeIndex === 'mv'"
        >找到{{ searchData.mvCount }}个结果</span
      >
    </div>
    <el-tabs v-model="activeIndex" @tab-click="handleClick(activeIndex)">
      <el-tab-pane label="歌曲" name="songs">
        <table class="el-table">
          <thead>
            <th></th>
            <th>音乐标题</th>
            <th>歌手</th>
            <th>专辑</th>
            <th>时长</th>
          </thead>
          <tbody>
            <tr
              class="el-table__row"
              v-for="(song, index) in songs"
              :key="song.id"
              @dblclick="playMusic(song.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ song.name }}</span>
                    <span
                      class="iconfont icon-mv"
                      @click="playMusic(song.id)"
                    ></span>
                  </div>
                </div>
              </td>
              <td>{{ song.artists[0].name }}</td>
              <td>{{ song.album.name }}</td>
              <td>{{ song.duration }}</td>
            </tr>
          </tbody>
        </table>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="歌单" name="lists">
        <div class="items">
          <div class="item" v-for="item in searchData.playlists" :key="item.id">
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ item.playCount }}</span>
              </div>
              <img :src="item.coverImgUrl" alt="" />
              <span
                class="iconfont icon-play"
                @click="toPlaylist(item.id)"
              ></span>
            </div>
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-tab-pane>
      <el-tab-pane label="MV" name="mv">
        <div class="items mv">
          <div class="item" v-for="item in searchData.mvs" :key="item.id">
            <div class="img-wrap">
              <img :src="item.cover" alt="" />
              <span class="iconfont icon-play" @click="toMv(item.id)"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ item.playCount }}</div>
              </div>
              <span class="time">{{ item.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ item.name }}</div>
              <div class="singer">{{ item.artistName }}</div>
            </div>
          </div>
        </div>
        <!-- 分页器 -->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-size="limit"
          layout="total, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
export default {
  name: 'result',
  data () {
    return {
      activeIndex: 'songs',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      limit: 10,
      type: 1
    };
  },
  mounted () {
    this.getSearch()
  },
  methods: {
    handleClick (e) {
      if (e === 'lists') {
        this.page = 1
        this.limit = 10
        this.type = 1000
      } else if (e === 'mv') {
        this.page = 1
        this.limit = 8
        this.type = 1004
      } else if (e === 'songs') {
        this.page = 1
        this.limit = 10
        this.type = 1
      }
      // if (this.songData.total !== 0 && this.songDataList.total !== 0 && this.MvData.total !== 0) return null
      this.getSearch()
    },
    getSearch () {
      this.$store.dispatch('getSearch', {
        params: {
          keywords: this.$route.query.q,
          limit: this.limit,
          offset: (this.page - 1) * this.limit,
          type: this.type
        }
      }).then(() => {
        this.total = this.searchData.songCount || this.searchData.playlistCount || this.searchData.mvCount
      })
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.getSearch()
    },
    playMusic (id) {
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
  },
  computed: {
    ...mapState({
      searchData: state => state.result.searchData
    }),
    ...mapGetters({
      songs: 'songs',
      url: 'url'
    })
  }
};
</script>

<style >
</style>
