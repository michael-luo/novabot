import Api from '@/services/Api'

export default {
  // Fetch the user for the authenticated user, or 401 if unauthenticated
  fetchSelf () {
    return Api().get('api/self')
  }
}
