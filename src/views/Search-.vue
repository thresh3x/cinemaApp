<template>
    <div>
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
        <div class="wrapper">
            <ul v-if="value">
                <li v-for="data in computedList" :key="data.cinemaId">
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
export default {
  data () {
    return {
      value: ''
    }
  },
  computed: {
    computedList () {
      return this.$store.state.cinemaList.filter(item => item.name.toUpperCase().includes(this.value.toUpperCase()) ||
      item.address.toUpperCase().includes(this.value.toUpperCase()))
    }
  },
  methods: {
    onSearch () {

    },
    onCancel () {
      this.$router.back()
    }
  },
  mounted () {
    if (this.$store.state.cinemaList.length === 0) {
      this.$store.dispatch('getCinemaData', this.$store.state.cityId)
    } else {
      console.log('缓存')
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
</style>
