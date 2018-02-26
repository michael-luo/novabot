<template>
  <div class="dashboard">
    <!-- TODO: move to separate component -->
    <p style="color: white"></p>
    <toggle-button id="bot-toggle"
      :value="botEnabled"
      color="green"
      :sync="true"
      :labels="{checked: 'Bot Enabled', unchecked: 'Bot Disabled'}"
      :width="140"
      :height="40"
      :speed="120"
      @change="onToggleEventHandler"
      v-b-tooltip.hover title="Enable NovaBot on your Twitch channel to help facilitate donations through your chat.">
    </toggle-button>

    <depositcard :user="user"></depositcard>
  </div>
</template>

<script>
import BotsService from '@/services/BotsService'
import UsersService from '@/services/UsersService'
import DepositCard from '@/components/DepositCard'

export default {
  props: ['user'],
  name: 'dashboard',
  components: {
    'depositcard': DepositCard
  },

  data () {
    return {
      botEnabled: false
    }
  },

  mounted () {
    this.setBotEnabled()
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

    async setBotEnabled () {
      try {
        const resp = await UsersService.fetchSelf({ refresh: true })
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

.depositcard {
  padding: 25px 50px 0px 50px;
}
</style>
