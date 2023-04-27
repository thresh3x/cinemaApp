<template>
    <div>
        login
        <button @click="handleLogin">登录</button>
    </div>
</template>

<script>
export default {
  methods: {
    handleLogin () {
      setTimeout(() => {
        localStorage.setItem('token', '后端返回的token')
        // this.$router.back()//返回

        this.$router.push(this.$route.query.redirect)
      }, 0)
    }
  }
}
</script>
