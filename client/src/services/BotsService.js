import Api from '@/services/Api'

export default {
  // Have the bot join the authenticated user's channel
  joinChannel () {
    return Api().post('bot/join')
  },

  partChannel () {
    return Api().post('bot/part')
  }
}
