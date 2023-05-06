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
                <div class="textBox">
                  <div class="title"><div>{{ data.name }}</div><div class="itemName">{{ data.item.name }}</div></div>
                  <div class="content">
                    <div class="actors">主演：{{ data.actors | actorsFilter }}</div>
                    <div>{{ data.nation }} | {{ data.runtime }}分钟</div>
                  </div>
                </div>
            </van-cell>
        </van-list>
    </div>
</template>
<script>
import http from '@/util/http'
export default {
  data () {
    return {
      datalist: [],
      loading: false,
      finished: false,
      error: false
    }
  },
  mounted () {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=2&k=5216368`,
      headers: {
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then(res => {
      console.log(res.data.data.films)
      this.datalist = res.data.data.films
    })
  },

  methods: {
    onLoad () {
      this.finished = true
    },
    handleChangePage (id) {
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
  @import '@/assets/css/filmsPlaying.scss'
</style>
