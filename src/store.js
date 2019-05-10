import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  //remove this for production
  strict: true,
  state: {
    reservations:[],
    selectedOriginalReservation: {
      checkin: '2015-01-01',
      checkout: '2015-01-02',
      customer: {
        firstName: 'noooo',
        lastName: 'noper'
      }
    },
    selectGroups: {},
    selectedReservation: {
      checkin: '2015-01-01',
      checkout: '2015-01-02',
      customer: {
        firstName: "not loaded",
        lastName: "not loaded"
      },
      people: '0'
    },
    selectedCustomer: {
      id: 0,
      firstName: '',
      lastName: ''
    },
    spaces: {},
    spaceTypes: {}
  },
  getters: {
    getReservations: state => {
      return state.reservations;
    },
    getSelectedCustomer: state => {
      return state.selectedCustomer;
    },
    getSelectedReservation: state => {
      return state.selectedReservation;
    },
     getSelectedOriginalReservation: state => {
      return state.selectedOriginalReservation;
    },
    getSelectGroups: state =>{
      return state.selectGroups;
    },
    getSpaces: state => {
      return state.spaces;
    },
    getSpaceTypes: state => {
      return state.spaceTypes;
    }
  },
  mutations: {
    //reservations
    setReservations(state, reservations){
      state.reservations = reservations;
    },
    setSelectedCustomer( state, customer) {
      state.selectedCustomer = customer;
    },
    setSelectedReservation( state, reservation){
      state.selectedReservation = reservation;
    },
    setSelectedOriginalReservation( state, reservation){
      state.selectedOriginalReservation = reservation;
    },
    setSelectGroups( state, selectGroups ){
      state.selectGroups = selectGroups;
    },
    setSpaces( state, spaces ){
      state.spaces = spaces;
    },
    setSpaceTypes( state, spaceTypes ){
      state.spaceTypes = spaceTypes;
    }
  },
  actions: {
    getReservations(context){
      //context.commit('showLoader');
      api.getReservations().
        then(  function(response){
          //context.commit('hideLoader');
          console.log("response.data @ store action", response.data);
          context.commit('setReservations', response.data);
        });
    },
    
    loadSelectedReservation(context, resId){
      //context.commit('showLoader');
      api.getReservation( resId ).then( response => {
        console.log("response",response);
        //context.commit('hideLoader');
        context.commit('setSelectedReservation', response.data);
        //set store
        //customer
        context.commit('setSelectedCustomer', response.data.customer);
        
      });      
    }
  }
})
