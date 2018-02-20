import Api from '@/services/Api'

export default {
  getBalance () {
    return Api().get('balance')
  }
}
