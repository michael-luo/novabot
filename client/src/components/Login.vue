<template>
  <div class="login">
    <b-button class="btn-twitch" variant="secondary" v-on:click="login">
      <b-img width="25" height="25" left src="static/img/twitch.png" />
      &nbsp; Login with Twitch
    </b-button>
  </div>
</template>

<script>
import auth from '../auth'

export default {
  name: 'login',
  data () {
    return {}
  },

  methods: {
    async login () {
      auth.login()
    }
  }
}
</script>

<style>

</style>
