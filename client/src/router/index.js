import Vue from 'vue'
import Router from 'vue-router'

import Landing from '@/components/Landing'
import Dashboard from '@/components/Dashboard'
import Commands from '@/components/Commands'
import Login from '@/components/Login'
import NotFound from '@/components/NotFound'

import auth from '../auth'

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'Landing',
    component: Landing
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: auth.requireAuth
  },
  {
    path: '/commands',
    name: 'Commands',
    component: Commands
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
  },
  {
    path: '*',
    component: NotFound
  }
]

export default new Router({
  mode: 'history',
  routes
})
