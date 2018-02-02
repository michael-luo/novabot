import Api from '@/services/Api'

export default {
  // Fetch the settings for the authenticated user, or 401 if unauthenticated
  getSettings () {
    return Api().get('settings')
  }
}
