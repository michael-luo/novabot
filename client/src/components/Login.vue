<template>
  <div class="login">
    <b-button class="btn-twitch" variant="primary" v-on:click="Login">
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
    async Login () {
      auth.login()
    }
  }
}
</script>

<style>
.btn-twitch.btn {
  cursor: pointer;
}

.btn-twitch.btn-primary {
  color: white;
  background-color: black;
  border-color: purple;
}

.btn-twitch.btn-primary:hover {
  background: black
}
</style>
