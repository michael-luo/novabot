<template>
  <div class="dashboard">
    <toggle-button id="bot-toggle"
                   :value="false"
                   color="#82C7EB"
                   :sync="true"
                   :labels="{checked: 'Bot Enabled', unchecked: 'Bot Disabled'}"
                   :width="140"
                   :height="40"
                   :speed="500"
                   @change="onToggleEventHandler"/>
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
        await BotsService.joinChannel()
      } catch (e) {
        console.log(e)
      }
    },

    async partChannel () {
      try {
        await BotsService.partChannel()
      } catch (e) {
        console.log(e)
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
