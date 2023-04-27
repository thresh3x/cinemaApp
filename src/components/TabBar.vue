<template>
  <footer>
    <ul>
        <router-link to="/films/nowplaying" custom v-slot="{navigate, isActive}">
          <li @click="navigate" :class="isActive?'home-active':''">
            <i class="iconfont icon-yingyinqu"></i>
            <span>电影</span>
          </li>
        </router-link>
        <router-link to="/cinemas" custom v-slot="{navigate, isActive}">
          <li @click="navigate" :class="isActive?'home-active':''">
            <i class="iconfont icon-dianshiji"></i>
            <span>影院</span>
          </li>
        </router-link>
        <router-link to="/center" custom v-slot="{navigate, isActive}">
          <li @click="navigate" :class="isActive?'home-active':''">
            <i class="iconfont icon-gerenzhongxin-zhihui"></i>
            <span>我的</span>
          </li>
        </router-link>
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
  footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3.0625rem;
    background-color: white;
    z-index: 10;
    ul {
      display: flex;
      li {
        flex: 1;
        line-height: 1.5625rem;
        text-align: center;
        display: flex;
        flex-direction: column;
        i {
          font-size: 20px;
        }
        span {
          font-size: 16px;
        }
      }
    }
  }

.home-active {
  color:red;
}
</style>
