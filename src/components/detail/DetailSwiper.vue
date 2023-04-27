<template>
    <div class="swiper" :class="name">
        <div class="swiper-wrapper">
            <slot></slot>
        </div>
    </div>
</template>
<script>
import Swiper from 'swiper/bundle'
import 'swiper/swiper-bundle.css'
export default {
  props: {
    perView: {
      type: Number,
      default: 1
    },
    name: {
      type: String,
      default: 'thresh'
    }
  },
  mounted () {
    new Swiper('.' + this.name, {
      slidesPerView: this.perView,
      spaceBetween: 30,
      freeMode: true
    })
  }
}
</script>
