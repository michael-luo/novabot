<template>
  <div class="login">
    <div>
      <b-button variant="primary" v-bind:style="buttonStyle"  v-on:click="Login">
        <b-img width="25" height="25" left src="static/img/twitch.png" />
        &nbsp; Login with Twitch
      </b-button>
    </div>
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
.btn {
  cursor: pointer;
}

.btn-primary {
  color: white;
  background-color: black;
  border-color: purple;
}

.btn-primary:hover {
  background: black
}
</style>
