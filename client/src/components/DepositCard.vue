<template>
  <div class="depositcard">
    <b-card bg-variant="dark" text-variant="white" title="">
      <p class="card-text"><strong>Current Balance:</strong> {{ balance }} <a href="https://coinmarketcap.com/currencies/stellar/">{{ currency }}</a> </p>

      <p>Deposit some Stellar and use NovaBot <router-link to="commands">commands</router-link> to donate crypto to other streamers.</p>
      <p class="card-text"><strong>Stellar Deposit Address:</strong> GBTFU5DBANNJII73SF2S5ZOCLYJK73Y3774CYAE36W4SVMRJ6NR5ZEUT</p>
      <p class="card-text"><strong>Your Stellar Memo:</strong> {{user ? user.id : ''}}</p>
    </b-card>
  </div>
</template>

<script>
import BalancesService from '@/services/BalancesService'

export default {
  props: ['user'],
  name: 'depositcard',

  data () {
    return {
      balance: 0,
      currency: ''
    }
  },

  mounted () {
    this.setBalance()
  },

  methods: {
    async setBalance () {
      try {
        const resp = await BalancesService.getBalance()
        this.balance = resp.data.amount
        this.currency = resp.data.currency
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
