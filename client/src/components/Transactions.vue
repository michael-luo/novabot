<template>
  <div class="transactions">
    <h1>Transactions</h1>
    <div v-for="(t, index) in transactions" :key="index">
      <p>
        <span><b>ID: {{ t.id }}</b></span><br />
        <span>Type: {{ t.type }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import TransactionsService from '@/services/TransactionsService'
export default {
  name: 'transactions',
  data () {
    return {
      transactions: []
    }
  },
  mounted () {
    this.getTransactions()
  },
  methods: {
    async getTransactions () {
      const response = await TransactionsService.fetchTransactions()
      this.transactions = response.data
    }
  }
}
</script>
