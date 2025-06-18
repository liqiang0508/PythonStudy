<template>
  <div id="app">
    <div>
      <router-link to="/home">home</router-link>
    </div>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->

    <div>
      <router-link to="/about">about</router-link>
    </div>

    <p> {{ key }}</p>

    <p> {{ test_data }}</p>
    <p> {{ count }}</p>
    <button @click="add">click</button>

    <p> {{ info }}</p>
    <button @click="add_Age">click</button>
    <router-view />
  </div>

</template>

<script>

import { getGoods } from '@/api/api_goods'
import { mapState, mapMutations } from 'vuex'
import { COUNT_ADD, COUNT_TEST } from '@/store/mutations_type.js'
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
  computed: mapState({
    count: state => state.moduleA.count,
    info: state => state.moduleA.info
  }),
  mounted() {
    this.get_Goods()
  },
  methods: {
    // add() {
    //   this.$store.commit(COUNT_ADD)
    // }
    ...mapMutations({
      add: COUNT_ADD,
      addAge: COUNT_TEST
    }),
    get_Goods() {
      getGoods().then((res) => {
        this.test_data = JSON.stringify(res.list)
        console.log(res)
      }).catch((error) => {
        console.log(error)
      })
    },
    add_Age() {
      // this.$store.commit(COUNT_TEST, { age: 5 })
      this.addAge({ age: 5 })
      this.get_Goods()
    }
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
