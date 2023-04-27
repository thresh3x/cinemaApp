<template>
    <div v-if="filmInfo">
      <detail-header v-scroll="80">
        {{ filmInfo.name }}
      </detail-header>
        <div :style="{
          backgroundImage: 'url('+filmInfo.poster+')'
        }" class="poster"></div>
        <div class="content">
          <div>{{ filmInfo.name }}</div>
          <div>
            <div class="detail-text">{{ filmInfo.category }}</div>
            <div class="detail-text">{{ filmInfo.premiereAt|dataFilter }}上映</div>
            <div class="detail-text">{{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟</div>
            <div class="detail-text" style="line-height: 15px;" :class="isHidden?'hidden':''">{{ filmInfo.synopsis }}</div>
            <div style="text-align: center;"><i class="iconfont" @click="isHidden=!isHidden" :class="isHidden?'icon-a-xiala2':'icon-jinru'"></i></div>
          </div>

          <div>
            <div>演职人员</div>
            <detail-swiper :perView="3.5" name="actors">
              <detail-swiper-item v-for="(data, index) in filmInfo.actors" :key="index" class="swiperText">
                <div :style="{
                  backgroundImage: 'url('+data.avatarAddress+')'
                }" class="avatar"></div>
                <div>{{ data.name }}</div>
                <div>{{ data.role }}</div>
              </detail-swiper-item>
            </detail-swiper>
          </div>
          <div>
            <div>剧照</div>
            <detail-swiper :perView="2.5" name="photos">
              <detail-swiper-item v-for="(data, index) in filmInfo.photos" :key="index" class="swiperText">
                <div :style="{
                  backgroundImage: 'url('+data+')'
                }" class="avatar avatar2"
                   @click="handlePreview(index)"></div>
                <div>{{ data.name }}</div>
                <div>{{ data.role }}</div>
              </detail-swiper-item>
            </detail-swiper>
          </div>
        </div>
    </div>
</template>
<script>
import http from '@/util/http'
import obj from '@/util/mixinObj'
import moment from 'moment'
import Vue from 'vue'
import detailHeader from '@/components/detail/DetailHeader.vue'
import detailSwiper from '@/components/detail/DetailSwiper.vue'
import detailSwiperItem from '@/components/detail/DetailSwiperItem.vue'
import { ImagePreview } from 'vant'

Vue.filter('dataFilter', (data) => {
  return moment(data * 1000).format('YYYY-MM-DD')
})

// 封装指令
Vue.directive('scroll', {
  inserted (el, binding) {
    el.style.display = 'none'
    window.onscroll = () => {
      if ((document.documentElement.scrollTop || document.body.scrollTop) > binding.value) {
        el.style.display = 'block'
      } else {
        el.style.display = 'none'
      }
    }
  },
  // 销毁执行
  unbind () {
    window.onscroll = null
  }
})

export default {
  mixins: [obj],
  data () {
    return {
      filmInfo: null,
      isHidden: true
    }
  },
  components: {
    detailSwiper,
    detailSwiperItem,
    detailHeader
  },
  methods: {
    handlePreview (index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index
      })
    }
  },
  mounted () {
    console.log(this.$route.params.myId)
    http({
      url: `/gateway?filmId=${this.$route.params.myId}&k=3243724`,
      headers: {
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then(res => {
      console.log(res.data.data.film)
      this.filmInfo = res.data.data.film
    })
  }
}
</script>
<style lang="scss" scoped>
.poster {
  width: 100%;
  height: 13.125rem;
  background-position: top;
  background-size: cover;
}

.swiperText {
  font-size: 12px;
  text-align: center;
  margin: 1rem 0;
}

.content {
  padding: .9375rem;
  .detail-text {
    font-size: 13px;
    margin-top: .5rem;
    color: gray;
  }
}

.hidden {
  overflow: hidden;
  height: 30px;
}

.avatar {
  width: 100%;
  height: 5.3125rem;
  background-position: center;
  background-size: cover;
}

.avatar2 {
  height: 12rem;
}
</style>
