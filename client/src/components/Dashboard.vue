<template>
  <div class="dashboard">
    <b-button class="btn-twitch" variant="primary" v-on:click="joinChannel">
      <b-img width="25" height="25" left src="static/img/twitch.png" />
      &nbsp; Bot Join Channel
    </b-button>
  </div>
</template>

<script>
import BotsService from '@/services/BotsService'

export default {
  props: ['user'],
  name: 'dashboard',

  data () {
    return {}
  },

  mounted () {},

  methods: {
    async joinChannel () {
      try {
        const response = await BotsService.joinChannel()
        console.log(response.data)
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
