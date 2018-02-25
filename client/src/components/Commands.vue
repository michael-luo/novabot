<template>
  <div class="commands">
    <p style="color: white">Commands supported by NovaBot on <a href="https://twitch.tv">Twitch</a></p>
    <b-table dark striped hover :items="commands"></b-table>
  </div>

</template>

<script>
const commands = [
  { command: 'Check your balance', description: 'See your current withdrawable balance of cryptocurrencies.', example: '!balance' },
  { command: 'Donate to streamer', description: 'Donate a specified amount of cryptocurrency to the streamer.', example: '!tip 5' }
]

export default {
  name: 'commands',
  data () {
    return {
      commands
    }
  }
}
</script>
