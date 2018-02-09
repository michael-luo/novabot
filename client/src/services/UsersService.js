import Api from '@/services/Api'

export default {
  // Fetch the user for the authenticated user, or 401 if unauthenticated
  fetchSelf (options = {}) {
    let queryParams = '?'
    if (options.refresh) {
      queryParams += 'refresh=true'
    }
    return Api().get(`self${queryParams}`)
  }
}
