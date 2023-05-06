<template>
    <div>
      <div style="text-align: center;"><van-icon name="friends-o" size="200px" color="#dedede"
      style="margin-top: 10%;"/></div>
      <van-form @submit="onSubmit" style="margin-top: 10%;">
        <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="password"
          autocomplete="off"
          type="password"
          name="password"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </div>
</template>

<script>
import Vue from 'vue'
import { Form, Field, Icon } from 'vant'

Vue.use(Icon)
Vue.use(Form)
Vue.use(Field)
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    handleLogin () {
      setTimeout(() => {
        localStorage.setItem('token', '后端返回的token')
        // this.$router.back()//返回

        this.$router.push(this.$route.query.redirect)
      }, 0)
    },
    onSubmit (values) {
      console.log('submit', values)
    }
  }
}
</script>
