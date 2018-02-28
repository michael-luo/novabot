<template>
  <div id="app">
    <navbar :user="user"></navbar>
    <router-view :user="user"></router-view>
  </div>
</template>

<script>

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import UsersService from '@/services/UsersService'
import NavBar from '@/components/NavBar'

export default {
  name: 'App',

  components: {
    'navbar': NavBar
  },

  data () {
    return {
      'user': null
    }
  },

  mounted () {
    this.getSelf()
  },

  methods: {
    async getSelf () {
      try {
        const response = await UsersService.fetchSelf()
        this.user = response.data
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
