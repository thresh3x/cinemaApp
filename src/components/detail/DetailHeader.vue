<template>
    <div class="header">
        <i class="iconfont icon-fanhui" @click="handleBack"></i>
        <slot></slot>
    </div>
</template>
<script>
export default {
  methods: {
    handleBack () {
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2.75rem;
    line-height: 2.75rem;
    background-color: #fff;
    text-align: center;
    font-size: 1.0625rem;
    i {
        font-size: 1.875rem;
        position: fixed;
        left: 0;
        top: 0;
        height: 2.75rem;
        line-height: 2.75rem;
    }
}
</style>
