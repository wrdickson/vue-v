import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

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
      path: '/home/',
      name: 'homeView',
      component: Home
    },
    {
      path: '/createReservation/',
      name: 'createReservation',
      component: () => import(/* webpackChunkName: "CreateReservation" */ './views/CreateReservation.vue')
    },
    {
      path: '/login/',
      name: 'login',
      component: Login
    },
    {
      path: '/logoff',
      name: 'logoff',
      component: () => import(/* webpackChunkName: "Logoff" */ './views/Logoff.vue')
    },
    {
      path: '/reservations/:reservationId',
      name: 'reservations',
      component: () => import(/* webpackChunkname: "ReservationView" */ './views/ReservationView.vue'),
      props: true
    },
    {
      path: '/resTable',
      name: 'resTable',
      component: () => import(/* webpackChunkName: "ResTable1" */ './views/ResTable.vue')
    },
  ]
})
