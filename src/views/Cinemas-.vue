<template>
    <div>
      <van-nav-bar title="影院" class="navBar" @click-left="handleLeft" @click-right="handleRight">
        <template #left>
          {{ cityName }}<van-icon name="arrow-down"/>
        </template>
        <template #right>
          <van-icon name="search" size="20" color="black"/>
        </template>
      </van-nav-bar>

        <div class="wrapper">
            <ul>
                <li v-for="data in cinemaList" :key="data.cinemaId">
                    <div class="left">
                        <div class="cinema_name">{{ data.name }}</div>
                        <div class="cinema_text">{{ data.address }}</div>
                    </div>
                    <div class="cinema_name">
                        <div style="color: red;">￥{{ data.lowPrice/100 }}起</div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import BetterScroll from 'better-scroll'
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data () {
    return {
    //   height: '0px'
    }
  },
  computed: {
    ...mapState(['cinemaList', 'cityId', 'cityName'])
  },
  methods: {
    ...mapActions(['getCinemaData']),
    ...mapMutations(['clearCinemaList']),
    handleLeft () {
      // 清空cinemaList，要不然点击切换城市，回来判断依然走缓存
      this.clearCinemaList()

      this.$router.push('/city')
    },
    handleRight () {
      this.$router.push('/cinemas/search')
    }
  },
  mounted () {
    // 动态计算高度
    // this.height = document.documentElement.clientHeight - document.querySelector('footer').offsetHeight + 'px'

    if (this.cinemaList.length === 0) {
      // 分发
      this.getCinemaData(this.cityId).then(res => {
        this.$nextTick(() => {
          // console.log(document.getElementsByTagName('li').length)

          new BetterScroll('.wrapper', {
            scrollbar: true,
            pullDownRefresh: true
          })
        })
      })
    } else {
      console.log('缓存')
      // 等数据回来了，数据上树后，走的回调
      this.$nextTick(() => {
      // console.log(document.getElementsByTagName('li').length)

        new BetterScroll('.wrapper', {
          scrollbar: true,
          pullDownRefresh: true
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
li {
    padding: .9375rem;
    display: flex;
    justify-content: space-between;
    .left {
        width: 13.25rem;
    }

    .cinema_name {
        font-size: 15px;
    }

    .cinema_text {
        color: gray;
        font-size: 12px;
        margin-top: .3125rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
}

.wrapper {
    // height: 38.625rem;
    overflow: hidden;
    // 修正滚动条位置
    position: relative;
    height: calc(100vh - 3.0625rem - 3rem);
}

.navBar {
  height: 3rem;
}
</style>
