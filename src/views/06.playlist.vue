<template>
  <div class="playlist-container">
    <div class="top-wrap">
      <div class="img-wrap">
        <img :src="playlist.coverImgUrl" alt="" />
      </div>
      <div class="info-wrap">
        <p class="title">{{ playlist.name }}</p>
        <div class="author-wrap">
          <img class="avatar" :src="playlist.creator.avatarUrl" alt="" />
          <span class="name">{{ playlist.creator.nickname }}</span>
          <span class="time">{{ playlist.createTime }} 创建</span>
        </div>
        <div class="tag-wrap">
          <span class="title">标签:</span>
          <ul>
            <li v-for="(tag, index) in playlist.tags" :key="index">
              {{ tag }}
            </li>
          </ul>
        </div>
        <div class="desc-wrap">
          <span class="title">简介:</span>
          <span class="desc">{{ playlist.description }}</span>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeIndex">
      <el-tab-pane label="歌曲列表" name="1">
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
              v-for="(track, index) in playlist.tracks"
              :key="index"
              @dblclick="playMusic(track.id)"
            >
              <td>{{ index + 1 }}</td>
              <td>
                <div class="img-wrap">
                  <img :src="track.al.picUrl" alt="" />
                  <span
                    class="iconfont icon-play"
                    @click="playMusic(track.id)"
                  ></span>
                </div>
              </td>
              <td>
                <div class="song-wrap">
                  <div class="name-wrap">
                    <span>{{ track.name }}</span>
                  </div>
                </div>
              </td>
              <td>{{ track.ar[0].name }}</td>
              <td>{{ track.al.name }}</td>
              <td>{{ track.dt }}</td>
            </tr>
          </tbody>
        </table>
      </el-tab-pane>
      <el-tab-pane :label="`评论(${hotComments.length + total})`" name="2">
        <!-- 精彩评论 -->
        <div class="comment-wrap">
          <p class="title">
            精彩评论<span class="number">({{ hotComments.length }})</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in hotComments" :key="index">
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
            最新评论<span class="number">({{ total }})</span>
          </p>
          <div class="comments-wrap">
            <div class="item" v-for="(item, index) in comments" :key="index">
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
          :current-page="page"
          :page-size="10"
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
  name: 'playlist',
  data () {
    return {
      activeIndex: '1',
      // 总条数
      total: 0,
      // 页码
      page: 1,
      comments: []
    };
  },
  mounted () {
    this.getPlaylistDetail()
    this.getCommentPlaylist()
  },
  methods: {
    getPlaylistDetail () {
      this.$store.dispatch('getPlaylistDetail', this.$route.query.id)
    },
    getCommentPlaylist () {
      this.$store.dispatch('getCommentPlaylist', {
        params: {
          id: this.$route.query.id,
          limit: 10,
          offset: (this.page - 1) * 10
        }
      }).then(() => {
        this.total = this.commentsData.total
        this.comments = this.commentsData.comments
      })
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
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`);
      this.page = val
      this.getCommentPlaylist()
    }
  },
  computed: {
    ...mapState({
      commentsData: state => state.playlist.commentsData
    }),
    ...mapGetters({
      playlist: 'playlist',
      url: 'url',
      hotComments: 'hotComments',
      commentsData: 'commentsData'
    })
  }
};
</script>

<style >
</style>
