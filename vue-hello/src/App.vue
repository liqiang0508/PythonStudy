<template>
  <div id="app">
    <p>
      <!-- 使用 router-link 组件来导航. -->
      <!-- 通过传入 `to` 属性指定链接. -->
      <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
      <router-link to="/home">home</router-link>
      <router-link to="/about">about</router-link>
    </p>
    <p> {{ test_data }}</p>
    <router-view />
  </div>

</template>

<script>

import { getGoods } from '@/api/api_goods'
export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      key: process.env.VUE_APP_NAME,
      test_data: ""
    }
  },
  mounted() {
    getGoods().then((res) => {
      this.test_data = JSON.stringify(res.list)
      console.log(res)
    }).catch((error)=>{
      console.log(error)
    })
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
