import util from './util'
import UsersService from '@/services/UsersService'

export default {
  login () {
    window.location = util.LOGIN_URL
  },

  logout () {
    window.location = util.LOGOUT_URL
  },

  requireAuth (to, from, next) {
    UsersService.fetchSelf()
      .then(response => {
        // response fields: { botEnabled, displayName, email, id, provider, username }
        next()
      })
      .catch(error => {
        console.log(error)
        next({
          path: '/login',
          query: {
            redirect: to.fullPath
          }
        })
      })
  }
}
