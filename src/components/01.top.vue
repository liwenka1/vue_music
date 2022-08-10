<template>
  <div class="top-container">
    <div class="left-box">
      <div class="history-wrapper">
        <span
          class="iconfont icon-home"
          @click="$router.push('/discovery')"
        ></span>
        <span class="iconfont icon-arrow-lift" @click="$router.back()"></span>
        <span class="iconfont icon-arrow-right" @click="$router.go(1)"></span>
      </div>
    </div>
    <div class="right-box">
      <div class="el-input el-input--small el-input--prefix">
        <span class="el-input__prefix">
          <i class="el-input__icon el-icon-search"></i>
        </span>
        <input
          type="text"
          autocomplete="off"
          placeholder="搜索"
          class="el-input__inner"
          v-model="query"
          @keyup.enter="toResult"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'top',
  data () {
    return {
      query: ''
    }
  },
  methods: {
    toResult () {
      if (this.query === '') {
        this.$message.warning('请输入内容')
      } else {
        this.$router.push('/result?q=' + this.query)
      }
    }
  }
}
</script>

<style scoped></style>
