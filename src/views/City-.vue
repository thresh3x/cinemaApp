<template>
    <div>
        <van-index-bar :index-list="computedList" @select="handleChange">
            <div>热门城市</div>
            <div v-for="hot in hotList" :key="hot.cityId">{{ hot.name }}</div>
          <div v-for="data in cityList" :key="data.type">
            <van-index-anchor :index="data.type" />
            <van-cell :title="item.name" v-for="item in data.list" :key="item.cityId" @click="handleClick(item)"/>
          </div>
        </van-index-bar>
    </div>
</template>
<script>
import http from '@/util/http'
import { Toast } from 'vant'
import obj from '@/util/mixinObj'
export default {
  mixins: [obj], // 混入
  data () {
    return {
      cityList: [],
      hotList: []
    }
  },
  computed: {
    computedList () {
      return this.cityList.map(item => item.type)
    }
  },
  mounted () {
    // this.$store.commit('hide')
    http({
      url: '/gateway?k=7114198',
      headers: {
        'X-Host': 'mall.film-ticket.city.list'
      }
    }).then(res => {
    //   console.log(res.data.data.cities)
      this.cityList = this.renderCity(res.data.data.cities)
      // 数据转化为 ABC分组
      // 转化后的数组，结合组件库进行渲染

      // 得到hot城市
      this.hotList = res.data.data.cities.filter(item => item.isHot === 1)
    //   console.log(this.hotList)
    })
  },
  methods: {
    renderCity (list) {
    //   console.log(list)

      const cityList = []
      const letterList = []
      // charCode 生成字母
      for (let i = 65; i < 91; i++) {
        letterList.push(String.fromCharCode(i))
      }

      // console.log(letterList)
      // filter的运用，filter里面要传递符合条件的，也就是true
      letterList.forEach(letter => {
        const newList = list.filter(item => item.pinyin.substring(0, 1).toUpperCase() === letter)
        // console.log(newList) // 有些字母是没有的这个名字的城市，为空数组

        newList.length > 0 && cityList.push({
          type: letter,
          list: newList
        })
      })
      console.log(cityList)
      return cityList
    },
    handleChange (data) {
      Toast({
        message: data,
        duration: 1000
      })
    },
    handleClick (item) {
      // 传统多页面方案 -- 传递参数
      // 1. location.href = '#/cinemas?cityname=' + item.name
      // 2. cookie, localStorage

      // 单页面方案
      // 1. 中间人模式
      // 1. bus事件总线 $on , $emit

      // 上述两种管理越多越乱，更好的方案：
      // vuex- 状态管理模式
      // console.log(item.cityId, item.name)
      // this.$store.state.cityName = item.name // 所有组件都可直接修改，无法溯源，不推荐

      this.$store.commit('changeCityName', item.name)
      this.$store.commit('changeCityId', item.cityId)
      this.$router.back()
    }
  }
}
</script>
<style lang="scss">
.van-toast--text {
    min-width: 20px;
}
</style>
