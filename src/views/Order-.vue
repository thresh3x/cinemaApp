<template>
    <div>
        order
    </div>
</template>
<script>
import axios from 'axios'
export default {
  mounted () {
    axios.get('/thresh/api/mmdb/movie/v3/list/hot.json?ct=%E5%8C%97%E4%BA%AC&ci=1&channelId=4').then(res => {
      console.log(res.data)
    })
  }
}
</script>
