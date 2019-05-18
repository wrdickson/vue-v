import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'
import Reservations from './views/Reservations.vue'
import Reservation from './views/Reservation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/createReservation/',
      name: 'createReservation',
      component: () => import(/* webpackChunkName: "CreateReservation" */ './views/CreateReservation.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logoff',
      name: 'logoff',
      component: () => import(/* webpackChunkName: "Logoff" */ './views/Logoff.vue')
    },
    {
      path: '/reservation/:reservationid',
      name: 'reservation',
      component: Reservation,
      props: true
    },   
    {
      path: '/reservations',
      name: 'reservations',
      component: Reservations
    }
  ]
})
