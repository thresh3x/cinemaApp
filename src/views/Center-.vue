<template>
    <div>
        <div class="centerView">
            <div class="avatarBox"><i class="iconfont icon-gerenzhongxin-zhihui" @click="handleLogin"></i></div>
            <div class="topText" @click="handleLogin">立即登录</div>
        </div>
        <ul class="my-order-tab">
            <li class="order"><div class="value">{{ ticket }}张</div><div class="label">卖座券</div></li>
            <li class="order"><div class="value">￥{{ money }}</div><div class="label">余额</div></li>
        </ul>
        <van-cell title="电影订单" icon="coupon" is-link to="login" />
        <van-cell title="组合红包" icon="bill-o" is-link to="login" />
        <van-cell title="帮助与客服" icon="service-o" is-link to="login" />
        <van-cell title="设置" icon="setting-o" is-link to="login" />
    </div>
</template>
<script>
import Vue from 'vue'
import { Cell, CellGroup, Icon } from 'vant'

Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Icon)
export default {
  data () {
    return {
      ticket: 0,
      money: 0
    }
  },
  methods: {
    handleLogin () {
      this.$router.push('/login')
    }
  }
}
</script>
<style lang="scss" scoped>
.centerView {
    width: 22.0625rem;
    height: 8.5rem;
    padding-top: 4rem;
    padding-left: 1.375rem;
    margin-top: -2.75rem;
    display: flex;
    align-items: center;
    background-color: rgb(244, 141, 67);
    i {
        font-size: 4.375rem;
        color: gray;
        margin-right: 1.25rem;
    }
    .topText {
        color: #fff;
    }
}
.my-order-tab {
    margin-bottom: .625rem;
    height: 5rem;
    display: flex;
    .order {
      float: left;
      width: 50%;
      text-align: center;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    .label {
        margin-top: .25rem;
        font-size: 14px;
        color: #aeaeae;
      }
    }
}

van-cell {
    height: 3.0625rem;
}

.van-icon {
    font-size: 20px;
    color: #d3a95b;
}
</style>
