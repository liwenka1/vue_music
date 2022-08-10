<template>
  <div class="playlists-container">
    <!-- 同步 -->
    <div class="top-card">
      <div class="icon-wrap">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="content-wrap">
        <div class="tag">精品歌单</div>
        <div class="title">
          {{ playlist.name }}
        </div>
        <div class="info">
          {{ playlist.description }}
        </div>
      </div>
      <img :src="playlist.coverImgUrl" alt="" class="bg" />
      <div class="bg-mask"></div>
    </div>
    <div class="tab-container">
      <!-- tab栏 顶部 -->
      <div class="tab-bar">
        <span
          class="item"
          :class="{ active: tag === '全部' }"
          @click="tag = '全部'"
          >全部</span
        >
        <span
          class="item"
          :class="{ active: tag === '欧美' }"
          @click="tag = '欧美'"
          >欧美</span
        >
        <span
          class="item"
          :class="{ active: tag === '华语' }"
          @click="tag = '华语'"
          >华语</span
        >
        <span
          class="item"
          :class="{ active: tag === '流行' }"
          @click="tag = '流行'"
          >流行</span
        >
        <span
          class="item"
          :class="{ active: tag === '说唱' }"
          @click="tag = '说唱'"
          >说唱</span
        >
        <span
          class="item"
          :class="{ active: tag === '摇滚' }"
          @click="tag = '摇滚'"
          >摇滚</span
        >
        <span
          class="item"
          :class="{ active: tag === '民谣' }"
          @click="tag = '民谣'"
          >民谣</span
        >
        <span
          class="item"
          :class="{ active: tag === '电子' }"
          @click="tag = '电子'"
          >电子</span
        >
        <span
          class="item"
          :class="{ active: tag === '轻音乐' }"
          @click="tag = '轻音乐'"
          >轻音乐</span
        >
        <span
          class="item"
          :class="{ active: tag === '影视原声' }"
          @click="tag = '影视原声'"
          >影视原声</span
        >
        <span
          class="item"
          :class="{ active: tag === 'ACG' }"
          @click="tag = 'ACG'"
          >ACG</span
        >
        <span
          class="item"
          :class="{ active: tag === '怀旧' }"
          @click="tag = '怀旧'"
          >怀旧</span
        >
        <span
          class="item"
          :class="{ active: tag === '治愈' }"
          @click="tag = '治愈'"
          >治愈</span
        >
        <span
          class="item"
          :class="{ active: tag === '旅行' }"
          @click="tag = '旅行'"
          >旅行</span
        >
      </div>
      <!-- tab的内容区域 -->
      <div class="tab-content">
        <div class="items">
          <div
            class="item"
            v-for="list in playlistInfo.playlists"
            :key="list.id"
          >
            <div class="img-wrap">
              <div class="num-wrap">
                播放量:
                <span class="num">{{ list.playCount }}</span>
              </div>
              <img :src="list.coverImgUrl" alt="" />
              <span
                class="iconfont icon-play"
                @click="toPlaylist(list.id)"
              ></span>
            </div>
            <p class="name">{{ list.name }}</p>
          </div>
        </div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'recommend',
  data () {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      //类型
      tag: '全部'
    };
  },
  watch: {
    tag () {
      this.page = 1
      this.topData()
      this.listData()
    }
  },
  mounted () {
    this.topData()
    this.listData()
  },
  methods: {
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      // 保存页码
      this.page = val
      // 重新获取数据
      this.listData()
    },
    topData () {
      this.$store.dispatch('getHighquality')
    },
    toPlaylist (id) {
      this.$router.push(`/playlist?id=${id}`);
    },
    listData () {
      this.$store.dispatch('getPlaylist', {
        params: {
          limit: 10,
          offset: (this.page - 1) * 10,
          cat: this.tag
        }
      }).then(() => {
        this.total = this.playlistInfo.total
      })
    }
  },
  computed: {
    ...mapState({
      playlist: state => state.recommend.playlists[0] || {},
      playlistInfo: state => state.recommend.playlistInfo
    })
  }
};
</script>

<style >
</style>
