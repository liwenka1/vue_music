<template>
  <div class="mv-container">
    <div class="mv-wrap">
      <h3 class="title">mv详情</h3>
      <!-- mv -->
      <div class="video-wrap">
        <video controls :src="mvUrlData.url"></video>
      </div>
      <!-- mv信息 -->
      <div class="info-wrap">
        <div class="singer-info">
          <div class="avatar-wrap">
            <img :src="mvArtist.picUrl" alt="" />
          </div>
          <span class="name">{{ mvDetail.artistName }}</span>
        </div>
        <div class="mv-info">
          <h2 class="title">{{ mvDetail.name }}</h2>
          <span class="date">发布：{{ mvDetail.publishTime }}</span>
          <span class="number">播放：{{ mvDetail.playCount }}次</span>
          <p class="desc">
            {{ mvDetail.desc }}
          </p>
        </div>
      </div>
      <!-- 精彩评论 -->
      <div class="comment-wrap">
        <p class="title">
          精彩评论<span class="number"
            >({{ mvComment.hotComments.length }})</span
          >
        </p>
        <div class="comments-wrap">
          <div
            class="item"
            v-for="item in mvComment.hotComments"
            :key="item.commentId"
          >
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                >
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.timeStr }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 最新评论 -->
      <div class="comment-wrap">
        <p class="title">
          最新评论<span class="number">({{ mvComment.total }})</span>
        </p>
        <div class="comments-wrap">
          <div
            class="item"
            v-for="item in mvComment.comments"
            :key="item.commentId"
          >
            <div class="icon-wrap">
              <img :src="item.user.avatarUrl" alt="" />
            </div>
            <div class="content-wrap">
              <div class="content">
                <span class="name">{{ item.user.nickname }}：</span>
                <span class="comment">{{ item.content }}</span>
              </div>
              <div class="re-content" v-if="item.beReplied.length != 0">
                <span class="name"
                  >{{ item.beReplied[0].user.nickname }}：</span
                >
                <span class="comment">{{ item.beReplied[0].content }}</span>
              </div>
              <div class="date">{{ item.timeStr }}</div>
            </div>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <el-pagination
        @current-change="handleCurrentChange"
        background
        :current-page="page"
        :page-size="10"
        layout="total, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
    <!-- 相关mv -->
    <div class="mv-recommend">
      <h3 class="title">相关推荐</h3>
      <div class="mvs">
        <div class="items">
          <div class="item" v-for="simiMv in simiMvs" :key="simiMv.id">
            <div class="img-wrap">
              <img :src="simiMv.cover" alt="" />
              <span class="iconfont icon-play" @click="toMv(simiMv.id)"></span>
              <div class="num-wrap">
                <div class="iconfont icon-play"></div>
                <div class="num">{{ simiMv.playCount }}</div>
              </div>
              <span class="time">{{ simiMv.duration }}</span>
            </div>
            <div class="info-wrap">
              <div class="name">{{ simiMv.name }}</div>
              <div class="singer">{{ simiMv.artistName }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: 'mv',
  data () {
    return {
      // 总条数
      total: 0,
      // 页码
      page: 1,
      // 页容量
      // limit: 10
    };
  },
  mounted () {
    this.getMvUrl()
    this.getSimiMv()
    this.getMvDetail()
    this.getCommentMv()
  },
  methods: {
    getMvUrl () {
      this.$store.dispatch('getMvUrl', { params: { id: this.$route.query.id } })
    },
    getSimiMv () {
      this.$store.dispatch('getSimiMv', { params: { mvid: this.$route.query.id } })
    },
    getMvDetail () {
      this.$store.dispatch('getMvDetail', { params: { mvid: this.$route.query.id } }).then(() => {
        this.$store.dispatch('getArtists', { params: { id: this.mvDetail.artistId } })
      })
    },
    getCommentMv () {
      this.$store.dispatch('getCommentMv', {
        params: {
          id: this.$route.query.id,
          limit: 10,
          offset: (this.page - 1) * 10
        }
      }).then(() => {
        this.total = this.mvDetail.commentCount
      })
    },
    toMv (id) {
      this.$router.push(`/mv?id=${id}`).then(() => {
        this.getMvUrl()
        this.getSimiMv()
        this.getMvDetail()
        this.getCommentMv()
      })
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`);
      this.page = val
      this.getCommentMv()
    }
  },
  computed: {
    ...mapState({
      mvUrlData: state => state.mv.mvUrlData,
      simiMvs: state => state.mv.simiMvs,
      mvDetail: state => state.mv.mvDetail,
      mvArtist: state => state.mv.mvArtist,
      mvComment: state => state.mv.mvComment
    })
  }
};
</script>

<style></style>
