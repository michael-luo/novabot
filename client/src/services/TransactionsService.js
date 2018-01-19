import Api from '@/services/Api'

export default {
  fetchTransactions () {
    return Api().get('transactions')
  }
}
