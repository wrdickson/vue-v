import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/api.js'

Vue.use(Vuex)

export default new Vuex.Store({
  //remove this for production
  strict: true,
  state: {
    createReservation: {
      checkin: '0001-01-01',
      checkout: '0001-01-02',
      customer: {
        firstName: "not loaded",
        lastName: "not loaded",
        id: '0'
      },
      people: '0',
      beds: '0',
      folio: '0',
      history: [],
      notes: [],
      space_code: '0',
      space_id: '0',
      space_type: '0',
      status: '0'
    }, 
    reservations:[],
    selectedOriginalReservation: {
      beds: '1',
      checkin: '2015-01-01',
      checkout: '2015-01-02',
      customer: {
        firstName: 'not loaded',
        lastName: 'not loaded',
        id: '0'
      }
    },
    selectGroups: {},
    selectedReservation: {
      checkin: '2015-01-01',
      checkout: '2015-01-02',
      customer: {
        firstName: "not loaded",
        lastName: "not loaded",
        id: '0'
      },
      people: '0',
      beds: '0',
      folio: '0',
      history: [],
      notes: [],
      space_code: '0',
      space_id: '0',
      space_type: '0',
      status: '0'
    },
    selectedCustomer: {
      id: 0,
      firstName: '',
      lastName: ''
    },
    showLoader: false,
    spaces: {},
    spaceTypes: {},
    user: {
      userId: 0,
      username: "Guest",
      permission: 0,
      key: 1
    }
  },
  getters: {
    getCreateReservation: state=> {
      return state.createReservation;
    },
    getLoaderShown: state => {
      return state.showLoader;
    },
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
    },
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    //loader
    hideLoader: state => state.showLoader = false,
    showLoader: state => state.showLoader = true,    
    
    //reservations
    setCreateReservation( state, createReservation ){
      state.createReservation = createReservation;
    },
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
    },
    setUser (state, user){
      state.user = user
    },
    setUserToGuest(state){
      state.user = {
        userId: 0,
        username: 'Guest',
        permission: 0,
        key: '0'
      }
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
