<template>
    <div>
        <film-swiper :key="datalist.length">
            <film-swiper-item v-for="data in datalist" :key="data.id" class="filmswiperitem">
                <img :src="data.imgUrl">
            </film-swiper-item>
        </film-swiper>
        <film-header class="sticky"></film-header>
        <router-view></router-view>
    </div>
</template>
<script>
import filmSwiper from '@/components/film/FilmSwiper'
import filmSwiperItem from '@/components/film/FilmSwiperItem'
import filmHeader from '@/components/film/FilmHeader'
import axios from 'axios'
export default {
  data () {
    return {
      datalist: []
    }
  },
  mounted () {
    axios.get('/banner.json').then(res => {
      this.datalist = res.data.banner
    })
  },
  components: {
    filmSwiper,
    filmSwiperItem,
    filmHeader
  }
}
</script>

<style lang="scss" scoped>
.filmswiperitem {
  overflow: hidden;
  height: 20rem;
  img {
    width: 100%;
  }
}

.sticky {
  position: sticky;
  top: 0px;
  background-color: white;
  z-index: 100;
}
</style>
