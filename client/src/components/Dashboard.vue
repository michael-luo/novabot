<template>
  <div class="dashboard">
    <toggle-button id="bot-toggle"
                   :value="botEnabled"
                   color="#82C7EB"
                   :sync="true"
                   :labels="{checked: 'Bot Enabled', unchecked: 'Bot Disabled'}"
                   :width="140"
                   :height="40"
                   :speed="120"
                   @change="onToggleEventHandler"/>
  </div>
</template>

<script>
import BotsService from '@/services/BotsService'
import UsersService from '@/services/UsersService'

export default {
  props: ['user'],
  name: 'dashboard',

  data () {
    return {
      botEnabled: false
    }
  },

  mounted () {
    this.getBotEnabled()
  },

  methods: {
    async joinChannel () {
      try {
        await BotsService.joinChannel()
      } catch (err) {
        console.log(err)
      }
    },

    async partChannel () {
      try {
        await BotsService.partChannel()
      } catch (err) {
        console.log(err)
      }
    },

    async getBotEnabled () {
      try {
        const resp = await UsersService.fetchSelf({ refresh: true })
        console.log(resp)
        this.botEnabled = resp.data.botEnabled
      } catch (err) {
        console.log(err)
      }
    },

    onToggleEventHandler (event) {
      event.value ? this.joinChannel() : this.partChannel()
    }
  }
}
</script>

<style>
.vue-js-switch#bot-toggle {
  font-size: 14px;
}
</style>
