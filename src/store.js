import Vue from 'vue'
import Vuex from 'vuex'
import api from './api/api.js'
import moment from 'moment'
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
    createReservationAvailableSpaces: [],
    reservations:[],
    resViewStart: moment().format('YYYY-MM-DD'),
    resViewEnd: moment().add(1,'month').format('YYYY-MM-DD'),
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
      id: '0',
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
    shift: {
      id: '0',
      user: '0',
      is_open: false,
      start_date: '0000-00-00 00:00:00',
      end_date: '0000-00-00 00:00:00'
    },
    showLoader: false,
    spaces: {},
    spaceTypes: {},
    testVal: {a:'test'},
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
    getCreateReservationAvailableSpaces: state => {
      return state.createReservationAvailableSpaces;
    },
    getLoaderShown: state => {
      return state.showLoader;
    },
    getReservations: state => {
      return state.reservations;
    },
    getResViewEnd: state => {
      return state.resViewEnd;
    },
    getResViewStart: state => {
      return state.resViewStart;
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
    getShift: state => {
      return state.shift;
    },
    getSpaces: state => {
      return state.spaces;
    },
    getSpaceTypes: state => {
      return state.spaceTypes;
    },
    getTestVal: state => {
      return state.testVal;
    },
    getUser: state => {
      return state.user
    }
  },
  mutations: {
    //loader
    hideLoader: state => state.showLoader = false,
    showLoader: state => state.showLoader = true,    
    
    //reservations view
    resViewMinusDay( state ){
      state.resViewStart = moment(state.resViewStart).subtract(1,'day').format('YYYY-MM-DD');
      state.resViewEnd = moment(state.resViewEnd).subtract(1,'day').format('YYYY-MM-DD');
    },
    resViewPlusDay( state ){
      state.resViewStart = moment(state.resViewStart).add(1,'day').format('YYYY-MM-DD');
      state.resViewEnd = moment(state.resViewEnd).add(1,'day').format('YYYY-MM-DD');
    },
    resViewMinusMonth( state ){
      state.resViewStart = moment(state.resViewStart).subtract(1,'month').format('YYYY-MM-DD');
      state.resViewEnd = moment(state.resViewEnd).subtract(1,'month').format('YYYY-MM-DD');
    },
    resViewMinusWeek( state ){
      state.resViewStart = moment(state.resViewStart).subtract(1,'week').format('YYYY-MM-DD');
      state.resViewEnd = moment(state.resViewEnd).subtract(1,'week').format('YYYY-MM-DD');
    },
    resViewPlusMonth( state ){
      state.resViewStart = moment(state.resViewStart).add(1,'month').format('YYYY-MM-DD');
      state.resViewEnd = moment(state.resViewEnd).add(1,'month').format('YYYY-MM-DD');
    },
    resViewPlusWeek( state ){
      state.resViewStart = moment(state.resViewStart).add(1,'week').format('YYYY-MM-DD');
      state.resViewEnd = moment(state.resViewEnd).add(1,'week').format('YYYY-MM-DD');
    },
    resViewSetStart( state, val){
      console.log("val @ set", val);
      state.resViewStart = val;
      state.resViewEnd= moment(val).add(1,'month').format('YYYY-MM-DD');
    },
    
    
    setCreateReservation( state, createReservation ){
      state.createReservation = createReservation;
    },
    setCreateReservationAvailableSpaces( state, spaceArr ){
      state.createReservationAvailableSpaces = spaceArr;
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
    setShift( state, shift ){
      state.shift = shift;
    },
    setShiftClosed( state ){
      let closedShift = {
        id: '0',
        user: '0',
        is_open: false,
        start_date: '0000-00-00 00:00:00',
        end_date: '0000-00-00 00:00:00'
      };
      state.shift = closedShift;
    },
    toggleSpaceShowSubspaces( state, spaceId ){
      //IMPORTANT!  note how the boolean is stored in the database
      //as '0' or '1'.  when we fetch the value, we cast the value
      //to boolean, using (bool)$obj->show_subspaces in PDO query.
      //When it came across as '0' or '1', the behavior here was erratic
      console.log("toggling store, spaceId: ", spaceId);
      state.spaces[spaceId].show_subspaces = !state.spaces[spaceId].show_subspaces;
    },
    setSpaces( state, spaces ){
      state.spaces = spaces;
    },
    setSpaceTypes( state, spaceTypes ){
      state.spaceTypes = spaceTypes;
    },
    setUser (state, user){
      let self = this;
      state.user = user;
      //at this point, we also need to see if the user
      //has an open shift and set it if so . . .
      if(user.userId > 0){
        api.getUserShift( state.user.userId ).then( function (response) {
          console.log("uos response:", response);
          if(response.data.openShift.length == 1){
            console.log("no open shifts");
            self.commit('setShift', response.data.openShift[0]);
          }
          if(response.data.openShift.length == 0){
            console.log("user has open shift");
            self.commit('setShiftClosed');
          }
        });
      } else {

      }
    },
    setUserToGuest(state){
      state.user = {
        userId: 0,
        username: 'Guest',
        permission: 0,
        key: '0'
      }
      //also set the shift to default
      state.shift = {
        id: '0',
        user: '0',
        is_open: false,
        start_date: '0',
        end_date: '0'
      }
    }
  },
  actions: {
    getReservations(context){
      api.getReservations().
        then(  function(response){
          context.commit('setReservations', response.data);
        });
    },
    getSpaces(context){
      api.getSpaces().
        then(  function(response){
          context.commit('setSpaces', response.data.spaces);
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
