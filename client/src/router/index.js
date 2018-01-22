import Vue from 'vue'
import Router from 'vue-router'

import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'

import auth from '../auth'

Vue.use(Router)

const routes = [
  {
    path: '/', redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: auth.requireAuth
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    beforeEnter (to, from, next) {
      auth.logout()
    }
  }
]

export default new Router({
  mode: 'history',
  routes
})
