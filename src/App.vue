<template>
  <div>
    <tabBar v-if="$store.state.isTabBarShow"></tabBar>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>
<script>
import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import tabBar from '@/components/TabBar.vue'
// 全局引用Vant
Vue.use(Vant)
export default {
  data () {
    return {

    }
  },
  components: {
    tabBar
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html, body {
  height: 100%;
}

ul, li {
  list-style: none;
}

body {
  font-size: 16px;
}

section {
  padding-bottom: 3.0625rem;
}

</style>
