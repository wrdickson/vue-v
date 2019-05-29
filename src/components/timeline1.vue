<template>
  <div class="tline grey lighten-5">
    <Timeline ref="timeline"
      id="resTimeline"
      :items="items"
      :groups="groups"
      :options="options"
      :events="['click', 'select','changed']"
      @click="timelineClick" 
      @select="timelineSelect"
      @changed="timelineChanged"
    >
    </Timeline>
  </div>
</template>

<script>
import { Timeline } from 'vue2vis'
import moment from 'moment'
import 'vue2vis/dist/vue2vis.css'
import axios from 'axios'
import api from './../api/api.js'
export default{
  components: {
    Timeline
  },
  methods:{
    //this is necessary to fix the rendering when a group is opened
    //strangely . . . vue2vis seems to trigger @changed frequently
    //all by itself . . .  maybe to check for reactivity changes??
    //does this negatively impact performance?????????
    timelineChanged: function(){
      this.$refs.timeline.redraw();
    },
    timelineClick: function( obj ){
      console.log("obj",obj);
      //test to see if the user clicked on a reservation (item)
      //or if they clicked on an empty date
      if(obj.item == null && obj.what == 'background'){
        //obj.group is the space_id of the selected item (room,house, whatever)
        //obj.time is the time string emitted by the timeline @ click
        //get space code from store
        let spaceObj = this.$store.getters.getSpaces[obj.group];
        //create a parms object
        var params = {
          space_id: obj.group.toString(),
          //store has space_code for each space_id from initial db load . . .
          space_code: spaceObj.space_code,
          space_type: spaceObj.space_type,
          checkin: moment(obj.time).format('YYYY-MM-DD'),
          checkout: moment(obj.time).add( 1,'days' ).format('YYYY-MM-DD'),
          customer: {
            id: '0',
            firstName: '',
            lastName: '',
            address1: '',
            address2: '',
            city: '',
            region: '',
            country: '',
            postalCode: '',
            email: '',
            phone: ''
          },
          beds: '1',
          people: '1',
          folio: '0',
          history: [],
          status: '0',
          notes: []
        }
        //get available spaces based on these dates
        this.$store.commit('showLoader');
        let self = this;
        api.checkAvailabilityByDates( params.checkin, params.checkout ).then( 
          function( response ){
            self.$store.commit('hideLoader');
            //note the db returns an associative array . . we want a simple array
            //ergo Object.values(etc
            self.$store.commit( 'setCreateReservationAvailableSpaces', Object.values(response.data.available_space_ids) );
            console.log("available spaces", response);
            //commit this to store
            self.$store.commit('setCreateReservation', params);
            //fire the route
            self.$router.push('createReservation');
          });
          
      }
      
    },
    //this fires when the user clicks on an item ie. a reservation
    timelineSelect: function( obj ){
      console.log("select",obj);
      //don't do anything if it's a 'dummy' block
      if(obj.items[0].substring(0,5) != 'dummy'){
        let self = this;
        this.$store.commit('showLoader');
        return axios.get('/api/reservations/' + obj.items[0])
          .then( function(response){
            self.$store.commit('hideLoader');
            self.$store.commit('setSelectedReservation', response.data);
            self.$store.commit('setSelectedOriginalReservation', response.data);
            //emit an event back to Reservations.vue which will handle it
            self.$emit('reservationSelected', obj.items[0]);         
          }); 
      }
    }
  },
  props: {
    items: Array,
    groups: Array,
    options: Object
  }
}
</script>

<style>
.dummy{
  background-color: #121212 !important;
  margin-right: 2px solid #121212 !important;
  margin-left: 2px solid #121212 !important;
}

.tline{
  font-size: .85em;
}



</style>