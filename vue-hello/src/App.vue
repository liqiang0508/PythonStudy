<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App" />
    <p> {{ key }}</p>
    <p> {{ test_data }}</p>
  </div>

</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { request2Sever } from './utils/request'
export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data() {
    return {
      key: process.env.VUE_APP_NAME,
      test_data: "test_data"
    }
  },
  mounted () {
    request2Sever("/testData").then((res) => {
      console.log(res)
      this.test_data = JSON.stringify(res.list)
  
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
