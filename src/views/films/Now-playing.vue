<template>
    <div>
      <van-list
        v-model="loading"
        :error.sync="error"
        :finished="finished"
        error-text="请求失败，点击重新加载"
        finished-text="我是底线"
        :immediate-check="false"
        @load="onLoad"
      >
            <van-cell v-for="data in datalist" :key="data.filmId" @click="handleChangePage(data.filmId)">
                <img :src="data.poster">
                <div>
                  <div class="title">{{ data.name }}</div>
                  <div class="content">
                    <div>观众评分：<span style="color: red;">{{ data.grade||'暂无' }}</span></div>
                    <div class="actors">主演：{{ data.actors | actorsFilter }}</div>
                    <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
                  </div>
                </div>
            </van-cell>
      </van-list>
    </div>
</template>
<script>
import Vue from 'vue'
import http from '@/util/http'

Vue.filter('actorsFilter', (data) => {
  return data?.map(item => item.name).join(' ') || '暂无主演'
})
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      error: false,
      current: 1,
      total: 0
    }
  },

  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=5535703`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
      this.total = res.data.data.total
    })
  },

  methods: {
    onLoad () {
      // 总长度加载完后，停止
      // 点击detail页面产生滚动条的时候，再点击切回nowplaying页面，此时datalist长度和total长度都为0，会出现不能下拉的bug，再加一个total不为0的判断，让ajax请求到total后再判断
      if (this.datalist.length === this.total && this.total !== 0) {
        this.finished = true
        return
      }
      console.log('加载更多')
      this.current++
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=5535703`,
        headers: {
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.loading = false
      })
    },
    handleChangePage (id) {
    //   location.href = '#/detail'

      //   this.$router.push(`/detail/${id}`)

      this.$router.push({
        name: 'details',
        params: {
          myId: id
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  .van-list {
    .van-cell {
      overflow: hidden;
      padding: .9375rem;
      border-bottom: 1px solid rgb(207, 207, 207);
      img {
        width: 4.125rem;
        float:left;
      }
      .content {
        font-size: 13px;
        color: gray;
        .actors {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          width: 12.5rem;
        }
      }
    }
  }
</style>
