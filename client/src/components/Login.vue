<template>
  <div class="login">
    <a v-on:click="Login">Login</a>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  name: 'login',
  data () {
    return {}
  },
  mounted () {},
  methods: {
    async Login () {
      auth.login()
    }
  }
}
</script>
